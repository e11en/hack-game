import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { PersistGate } from 'redux-persist/integration/react';

import { SetMap, SetPosition, ReplaceObjects, SetLevel } from 'state/actions';
import { Level1Map, Level1CharacterOptions, Level1MapObjects } from "data/levels/level1";
import { Level2Map, Level2CharacterOptions, Level2MapObjects } from "data/levels/level2";
import Map from "components/MapComponent";  
import Hud from "components/HudComponent";
import { getGameOver, getGameLevel } from "state/selectors";
import { persistor } from "state/store";
import StartGameDialog from "components/StartGameDialogComponent";
import GameOverDialog from "components/GameOverDialogComponent";

const GameArea = styled.div`
  width: calc(var(--pixel-size) * 350px);
  height: calc(var(--pixel-size) * 300px);
  overflow: hidden;
  background: #53dbf7;
  position: relative;
`;

export default (props) => {
  const dispatch = useDispatch();
  const isGameOver = useSelector(getGameOver);
  const persistStateRehydrated = useSelector(state => state._persist.rehydrated);
  const levelState = useSelector(getGameLevel);
  const [showStartDialog, setShowStartDialog] = useState(true);

  const onLevelChange = (level) => {
    let levelMap = null;
    let levelCharacterOptions = null;
    let levelMapObjects = null;
    
    switch(level) {
      case 1: levelMap = Level1Map;
              levelCharacterOptions = Level1CharacterOptions;
              levelMapObjects = Level1MapObjects;
              break;
      case 2: levelMap = Level2Map;
              levelCharacterOptions = Level2CharacterOptions;
              levelMapObjects = Level2MapObjects;
              break;
      default: break;
    }

    if(levelMap)
      dispatch(SetMap(levelMap));

    if(levelMapObjects)
      dispatch(ReplaceObjects(levelMapObjects));

    if(levelCharacterOptions)
      dispatch(SetPosition(levelCharacterOptions.x, levelCharacterOptions.y));

    dispatch(SetLevel(level));
  };

  const onInit = (level) => {
    let levelMapObjects = null;
    
    switch(level) {
      case 1: levelMapObjects = Level1MapObjects;
              break;
      case 2: levelMapObjects = Level2MapObjects;
              break;
      default: break;
    }

    if(levelMapObjects)
      dispatch(ReplaceObjects(levelMapObjects));
  };

  useEffect(() => {
    if (persistStateRehydrated)
      onInit(levelState);
  }, [persistStateRehydrated]);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <GameArea>
        <GameOverDialog show={isGameOver} onReset={() => onLevelChange(levelState)} />
        <StartGameDialog show={showStartDialog} onClose={() => setShowStartDialog(false)} setLevel={onLevelChange} />
        <Hud {...props} />
        <Map {...props} changeLevel={onLevelChange}/>
      </GameArea>
    </PersistGate>
  );
};