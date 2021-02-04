import React,{ useState, useEffect }  from "react";
import { useSelector } from 'react-redux';

import LevelElement from "./LevelElementComponent";
import Dialog from "./DialogComponent";
import { idEquals } from "helpers/collision";

export default ({x = 0, y = 0, width = 64, height = 49, ...props}) => {
    const canInteract = useSelector((state) => state.character.canInteract);
    const collidingWith = useSelector((state) => state.character.collidingWith);

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (canInteract && collidingWith && idEquals(collidingWith.id, "console", x, y))
            setShowDialog(canInteract);

    }, [canInteract, collidingWith]);

    return (
        <React.Fragment>
            <Dialog show={showDialog} variant="console">
                Hallo, dit is een test 123
            </Dialog>
            <LevelElement  x={x} 
                            y={y} 
                            imageSource="resources/level-elements/console.png"
                            width={width}
                            height={height}
                            {...props} />
        </React.Fragment>
    );
};
