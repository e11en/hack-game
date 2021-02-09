import React, { useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

import { ObjectType } from "../helpers/constants";
import { MapContext, MapObjectsContext } from "state/context";
import Console from "./ConsoleComponent";
import Player from "./PlayerComponent";
import LevelElement from "./LevelElementComponent";
import Laser from "./LaserComponent";
import Flag from "./FlagComponent";
import Door from "./DoorComponent";
import Character from "./CharacterComponent";

const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
const camera_left = pixelSize * 170;
const camera_top = pixelSize * 100;

const Map = styled.div.attrs(props => ({
        style: {
            transform: `translate3d(${-props.x * pixelSize + camera_left}px, ${-props.y * pixelSize + camera_top}px, 0)`
        },
    }))
`
    background-image: url("${process.env.PUBLIC_URL}/resources/maps/${props => props.map}");
    background-size: 100%;
    width: calc(15px * var(--grid-cell));
    height: calc(15px * var(--grid-cell));
    position: relative;
    background-repeat: no-repeat;
`;

export default (props) => {
    const x = useSelector((state) => state.character.x);
    const y = useSelector((state) => state.character.y);

    const mapContext = useContext(MapContext);
    const mapObjectsContext = useContext(MapObjectsContext);

    const [mapObjects, setMapObjects] = useState([]);
    const showOutline = props.location?.search?.includes("outline");

    useEffect(() => {
        const mappedObjects = [];

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
                    mappedObjects.push(<Console {...objectProps}/>);
                    break;
                case ObjectType.LASER:
                    mappedObjects.push(<Laser {...objectProps}/>);
                    break;
                case ObjectType.FLAG:
                    mappedObjects.push(<Flag {...objectProps}/>);
                    break;
                case ObjectType.DOOR:
                    mappedObjects.push(<Door {...objectProps}/>);
                    break;
                case ObjectType.CHARACTER:
                    mappedObjects.push(<Character {...objectProps}/>);
                    break;
                default:
                    mappedObjects.push(<LevelElement {...objectProps}/>);
                    break;
            }
        });

        mappedObjects.push(<Player key="player" showOutline={showOutline}/>);

        setMapObjects(mappedObjects);
    }, [mapObjectsContext]);

    return (
        <Map x={x} y={y} map={mapContext.image}>
            { mapObjects.map(o => o) }
        </Map>
    );
};
