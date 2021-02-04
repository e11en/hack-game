import React from "react";
import styled from "styled-components";

import Map from "components/MapComponent";  
import Player from "components/PlayerComponent";  
import Console from "components/ConsoleComponent";

const GameArea = styled.div`
  width: calc(var(--pixel-size) * 350px);
  height: calc(var(--pixel-size) * 300px);
  overflow: hidden;
  background: #61ddf7;
  position: relative;
`;

export default () => {
    return (
        <GameArea>
          <Map>
            <Console x={96} y={96}/>
            <Player />
          </Map>
        </GameArea>
    );
};