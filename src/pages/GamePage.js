import React, { useState } from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

import { MapObjectsContext, IntialMapObjectsContext } from "state/contexts";
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
  const isGameOver = useSelector((state) => state.game.gameOver);
  const [mapObjects, setMapObjects] = useState(IntialMapObjectsContext);

  const disable = (id) => {
    const arr = mapObjects;
    const item = arr.filter(o => o.id === id);
    if (!item) return;

    const firstItem = item[0];
    if (!firstItem) return;
    
    firstItem.enabled = false;

    // TODO: Fix flashing of complete game area
    setMapObjects([...arr]);
  };

  return (
    <MapObjectsContext.Provider value={mapObjects}>
      <GameArea>
        {
          isGameOver &&
          <GameOver>GAME OVER!</GameOver>
        }
        <Hud {...props} />
        <Map {...props} disable={disable} />
      </GameArea>
    </MapObjectsContext.Provider>
  );
};