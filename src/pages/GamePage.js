import React from "react";
import styled from "styled-components";

import { MapObjectsContext, IntialMapObjectsContext } from "state/contexts";
import Map from "components/MapComponent";  

const GameArea = styled.div`
  width: calc(var(--pixel-size) * 350px);
  height: calc(var(--pixel-size) * 300px);
  overflow: hidden;
  background: #53dbf7;
  position: relative;
`;

export default (props) => {
    return (
      <MapObjectsContext.Provider value={IntialMapObjectsContext}>
        <GameArea>
          <Map {...props}/>
        </GameArea>
      </MapObjectsContext.Provider>
    );
};