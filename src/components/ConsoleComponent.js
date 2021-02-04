import React from "react";
import LevelElementComponent from "./LevelElementComponent";

export default ({x = 0, y = 0, width = 64, height = 49, ...props}) => {
    return (
        <LevelElementComponent 
            x={x} 
            y={y} 
            imageSource="resources/level-elements/console.png"
            width={width}
            height={height}
            {...props}
        />
    );
};
