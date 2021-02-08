import React, { useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

import { ObjectType } from "../helpers/constants";
import { MapObjectsContext } from "state/contexts";
import Console from "./ConsoleComponent";
import Player from "./PlayerComponent";
import LevelElement from "./LevelElementComponent";
import Laser from "./LaserComponent";
import Flag from "./FlagComponent";
import Door from "./DoorComponent";

const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
const camera_left = pixelSize * 170;
const camera_top = pixelSize * 100;

const Map = styled.div.attrs(props => ({
        style: {
            transform: `translate3d(${-props.x * pixelSize + camera_left}px, ${-props.y * pixelSize + camera_top}px, 0)`
        },
    }))
`
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
            const objectProps = {
                ...props,
                ...mapObject,
                key: mapObject.id ? mapObject.id : "object-" + mapObject.x + "-" + mapObject.y,
                showOutline: showOutline,
            };

            switch(mapObject.type)
            {
                case ObjectType.CONSOLE:
                    mapObjects.push(<Console {...objectProps}/>);
                    break;
                case ObjectType.LASER:
                    mapObjects.push(<Laser {...objectProps}/>);
                    break;
                case ObjectType.FLAG:
                    mapObjects.push(<Flag {...objectProps}/>);
                    break;
                case ObjectType.DOOR:
                    mapObjects.push(<Door {...objectProps}/>);
                    break;
                default:
                    mapObjects.push(<LevelElement {...objectProps}/>);
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
