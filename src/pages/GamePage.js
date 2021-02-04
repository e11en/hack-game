import React from "react";
import styled from "styled-components";

import { MapObjectsContext, IntialMapObjectsContext } from "contexts";
import Map from "components/MapComponent";  

const GameArea = styled.div`
  width: calc(var(--pixel-size) * 350px);
  height: calc(var(--pixel-size) * 300px);
  overflow: hidden;
  background: #53dbf7;
  position: relative;
`;

export default () => {
    return (
      <MapObjectsContext.Provider value={IntialMapObjectsContext}>
        <GameArea>
          <Map/>
        </GameArea>
      </MapObjectsContext.Provider>
    );
};