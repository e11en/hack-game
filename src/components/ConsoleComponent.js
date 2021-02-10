import React,{ useState, useEffect, useRef }  from "react";
import { useSelector } from 'react-redux';

import LevelElement from "./LevelElementComponent";
import Dialog from "./DialogComponent";
import { idEquals } from "helpers/collision";

export default ({x = 0, y = 0, width = 64, height = 49, ...props}) => {
    const collidingWith = useSelector((state) => state.character.collidingWith);
    const [showDialog, setShowDialog] = useState(false);
    const dialogRef = useRef();

    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "console", x, y) && !showDialog) {
            setShowDialog(true);
            setText("Type 'help' to show all available command. <br/>");
        }
    }, [collidingWith]);

    const setText = (text) => {
        dialogRef.current.setText(text);
    };

    const startTestMission = () => {
        setTimeout(() => {
            setText("This is a test mission, so you can sit back and relax!");
            setTimeout(() => {
                setText("Disabling the laser...");

                setTimeout(() => {
                    props.disable("laser-269-95");
                    setText("Laser is disabled.");
                }, 1000);
            }, 1000);
        }, 600);
    };

    const startMission = () => {
        setText("Starting mission...");

        startTestMission();
    };

    const showHelpText = () => {
        setText(`
            <table>
                <tr>
                    <td>help</td>
                    <td>Show all commands.</td>
                </tr>
                <tr>
                    <td>exit</td>
                    <td>Exit this window.</td>
                </tr>
                <tr>
                    <td>start</td>
                    <td>Start the mission.</td>
                </tr>
            </table>
        `);
    };

    const onCommand = (command) => {
        if (command === "help") {
            showHelpText();
            return true;
        }

        if (command === "start") {
            startMission();
            return true;
        }

        return false;
    };

    return (
        <React.Fragment>
            <Dialog show={showDialog} onClose={() => setShowDialog(false)} onCommand={onCommand} ref={dialogRef}/>
            <LevelElement x={x} 
                        y={y} 
                        imageSource="resources/level-elements/console.png"
                        width={width}
                        height={height}
                        {...props} />
        </React.Fragment>
    );
};
