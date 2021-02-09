import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import { SetPosition } from 'state/actions';
import { InitialMapContext, MapContext } from "state/context";
import { InitialMapObjectsContext, MapObjectsContext } from "state/context";
import { Level1lMapContext, Level1CharacterOptionsContext, Level1MapObjectsContext } from "data/level1";
import { Level2lMapContext, Level2CharacterOptionsContext, Level2MapObjectsContext } from "data/level2";
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
  const [mapContext, setMapContext] = useState(InitialMapContext);
  const [mapObjectsContext, setMapObjectsContext] = useState(InitialMapObjectsContext);

  const onDisable = (id) => {
    const arr = mapObjectsContext;
    const item = arr.filter(o => o.id === id);
    if (!item) return;

    const firstItem = item[0];
    if (!firstItem) return;
    
    firstItem.enabled = false;

    // TODO: Fix flashing of complete game area
    setMapObjectsContext([...arr]);
  };

  const onLevelChange = (level) => {
    let levelMapContext = null;
    let levelCharacterOptionsContext = null;
    let levelMapObjectsContext = null;
    
    switch(level) {
      case 1: levelMapContext = Level1lMapContext;
              levelCharacterOptionsContext = Level1CharacterOptionsContext;
              levelMapObjectsContext = Level1MapObjectsContext;
              break;
      case 2: levelMapContext = Level2lMapContext;
              levelCharacterOptionsContext = Level2CharacterOptionsContext;
              levelMapObjectsContext = Level2MapObjectsContext;
              break;
      default: break;
    }

    if(levelMapContext)
      setMapContext(levelMapContext);

    if(levelMapObjectsContext)
      setMapObjectsContext(levelMapObjectsContext);

    if(levelCharacterOptionsContext) {
      dispatch(SetPosition(levelCharacterOptionsContext.x, levelCharacterOptionsContext.y));
    }
  };

  useEffect(() => {
    onLevelChange(1);
  }, []);

  return (
    <MapObjectsContext.Provider value={mapObjectsContext}>
      <GameArea>
        {
          isGameOver &&
          <GameOver>GAME OVER!</GameOver>
        }
        <Hud {...props} />
        <MapContext.Provider value={mapContext}>
          <Map {...props} disable={onDisable} changeLevel={onLevelChange}/>
        </MapContext.Provider>
      </GameArea>
    </MapObjectsContext.Provider>
  );
};