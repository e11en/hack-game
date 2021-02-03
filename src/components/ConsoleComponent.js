import React from "react";
import LevelElementComponent from "./LevelElementComponent";

export default ({x = 0, y = 0}) => {
    return (
        <LevelElementComponent 
            x={x} 
            y={y} 
            imageSource="resources/level-elements/console-test.png"
            width={64}
            height={57}
        />
    );
};
