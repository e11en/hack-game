import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { PersistGate } from 'redux-persist/integration/react';

import { SetMap, SetPosition, ReplaceObjects, SetLevel, GameOver, ResetHealth } from 'state/actions';
import { Level1Map, Level1CharacterOptions, Level1MapObjects } from "data/levels/level1";
import { Level2Map, Level2CharacterOptions, Level2MapObjects } from "data/levels/level2";
import Map from "components/MapComponent";  
import Hud from "components/HudComponent";
import { getGameOver, getGameLevel } from "state/selectors";
import { persistor } from "state/store";

const GameArea = styled.div`
  width: calc(var(--pixel-size) * 350px);
  height: calc(var(--pixel-size) * 300px);
  overflow: hidden;
  background: #53dbf7;
  position: relative;
`;

const GameOverDialog = styled.div`
  width: calc(var(--pixel-size) * 287px);
  height: calc(var(--pixel-size) * 155px);
  background: #35312b;
  position: absolute;
  z-index: 9;
  top: calc(var(--pixel-size) * 70px);
  left: calc(var(--pixel-size) * 25px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 5px solid black;
  font-size: calc(var(--pixel-size) * 65px);
  color: #3b9e1c;
`;
const Button = styled.button`
    position: absolute;
    bottom: 20px;
    border: 3px solid #3b9e1c;
    color: #3b9e1c;
    background-color: transparent;

    &:hover {
        background-color: #3b9e1c;
        color: #35312b;
    }

    &:active {
        background-color: #225d0f;
        color: #3b9e1c;
    }

    &:focus {
        outline: none;
    }
`;

export default (props) => {
  const dispatch = useDispatch();
  const isGameOver = useSelector(getGameOver);
  const persistStateRehydrated = useSelector(state => state._persist.rehydrated);
  const levelState = useSelector(getGameLevel);

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

  const onLevelRetry = () => {
    onLevelChange(levelState);
    dispatch(ResetHealth());
    dispatch(GameOver(false));
  };

  useEffect(() => {
    if (persistStateRehydrated)
      onInit(levelState);
  }, [persistStateRehydrated]);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <GameArea>
        {
          isGameOver &&
          <GameOverDialog>
            GAME OVER!
            <Button onClick={onLevelRetry}>RETRY</Button>
          </GameOverDialog>
        }
        <Hud {...props} />
        <Map {...props} changeLevel={onLevelChange}/>
      </GameArea>
    </PersistGate>
  );
};