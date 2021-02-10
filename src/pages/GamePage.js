import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import { SetMap, SetPosition, ReplaceObjects } from 'state/actions';
import { Level1Map, Level1CharacterOptions, Level1MapObjects } from "data/levels/level1";
import { Level2Map, Level2CharacterOptions, Level2MapObjects } from "data/levels/level2";
import Map from "components/MapComponent";  
import Hud from "components/HudComponent";
import { getGameOver } from "state/selectors";

const GameArea = styled.div`
  width: calc(var(--pixel-size) * 350px);
  height: calc(var(--pixel-size) * 300px);
  overflow: hidden;
  background: #53dbf7;
  position: relative;
`;

const GameOver = styled.div`
  width: calc(var(--pixel-size) * 287px);
  height: calc(var(--pixel-size) * 155px);
  background: #35312b;
  position: absolute;
  z-index: 9;
  top: calc(var(--pixel-size) * 70px);
  left: calc(var(--pixel-size) * 25px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid black;
  font-size: calc(var(--pixel-size) * 65px);
  color: #3b9e1c;
`;

export default (props) => {
  const dispatch = useDispatch();
  const isGameOver = useSelector(getGameOver);

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
  };

  useEffect(() => {
    onLevelChange(1);
  }, []);

  return (
    <GameArea>
      {
        isGameOver &&
        <GameOver>GAME OVER!</GameOver>
      }
      <Hud {...props} />
      <Map {...props} changeLevel={onLevelChange}/>
    </GameArea>
  );
};