import React, { useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

import { ObjectType } from "../helpers/constants";
import { MapObjectsContext } from "state/contexts";
import Console from "./ConsoleComponent";
import Player from "./PlayerComponent";
import LevelElement from "./LevelElementComponent";

const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
const camera_left = pixelSize * 170;
const camera_top = pixelSize * 100;

const Map = styled.div.attrs(props => ({
        style: {
            transform: `translate3d(${-props.x * pixelSize + camera_left}px, ${-props.y * pixelSize + camera_top}px, 0)`
        },
    }))
`
    image-rendering: pixelated;
    background-image: url("${process.env.PUBLIC_URL}/resources/maps/empty.png");
    background-size: 100%;
    width: calc(15px * var(--grid-cell));
    height: calc(15px * var(--grid-cell));
    position: relative;
    background-repeat: no-repeat;
`;

export default (props) => {
    const x = useSelector((state) => state.character.x);
    const y = useSelector((state) => state.character.y);
    const mapObjectsContext = useContext(MapObjectsContext);
    const [mapObjects, setMapObjects] = useState([]);
    const showOutline = props.location?.search?.includes("outline");

    useEffect(() => {
        const mapObjects = [];

        mapObjectsContext.forEach(mapObject => {
            switch(mapObject.type)
            {
                case ObjectType.CONSOLE:
                    mapObjects.push(<Console key={"console-" + mapObject.x + "-" + mapObject.y} 
                                                x={mapObject.x} 
                                                y={mapObject.y} 
                                                showOutline={showOutline}/>);
                    break;
                default:
                    mapObjects.push(<LevelElement key={"console-" + mapObject.x + "-" + mapObject.y} 
                                                    x={mapObject.x} 
                                                    y={mapObject.y} 
                                                    width={mapObject.width} 
                                                    height={mapObject.height} 
                                                    showOutline={showOutline}/>);
                    break;
            }
        });

        mapObjects.push(<Player key="player" showOutline={showOutline}/>);

        setMapObjects(mapObjects);
    }, [mapObjectsContext]);

    return (
        <Map x={x} y={y}>
            { mapObjects.map(o => o) }
        </Map>
    );
};
