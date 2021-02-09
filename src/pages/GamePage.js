import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import { SetPosition } from 'state/actions';
import { InitialLevelContext, LevelContext } from "state/context";
import { Level1Context } from "data/level1";
import { Level2Context } from "data/level2";
import Map from "components/MapComponent";  
import Hud from "components/HudComponent";

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
  const isGameOver = useSelector((state) => state.game.gameOver);
  const [levelContext, setLevelContext] = useState(InitialLevelContext);

  const onDisable = (id) => {
    const arr = levelContext.mapObjects;
    const item = arr.filter(o => o.id === id);
    if (!item) return;

    const firstItem = item[0];
    if (!firstItem) return;
    
    firstItem.enabled = false;

    const updatedContext = {
      ...levelContext,
      mapObjects: [...arr]
    }

    // TODO: Fix flashing of complete game area
    setLevelContext(updatedContext);
  };

  const onLevelChange = (level) => {
    let context = null;
    
    switch(level) {
      case 1: context = Level1Context;
              break;
      case 2: context = Level2Context;
              break;
    }

    setLevelContext(context);
    dispatch(SetPosition(context.characterOptions.x, context.characterOptions.y));
  };

  useEffect(() => {
    onLevelChange(1);
  }, []);

  return (
    <LevelContext.Provider value={levelContext}>
      <GameArea>
        {
          isGameOver &&
          <GameOver>GAME OVER!</GameOver>
        }
        <Hud {...props} />
        <Map {...props} map={levelContext.map} disable={onDisable} changeLevel={onLevelChange}/>
      </GameArea>
    </LevelContext.Provider>
  );
};