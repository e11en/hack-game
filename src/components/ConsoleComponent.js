import React,{ useState, useEffect }  from "react";
import { useSelector } from 'react-redux';

import LevelElement from "./LevelElementComponent";
import Dialog from "./DialogComponent";
import { idEquals } from "helpers/collision";

export default ({x = 0, y = 0, width = 64, height = 49, ...props}) => {
    const collidingWith = useSelector((state) => state.character.collidingWith);
    const [showDialog, setShowDialog] = useState(false);
    const [text, setText] = useState("Type 'help' to show all available command. <br/>");
    
    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "console", x, y)) {
            setShowDialog(true);
        }
    }, [collidingWith]);

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

    const startMission = (missionId) => {
        const mockMissionIds = ["test"];
        if (!mockMissionIds.includes(missionId)) {
            setText("Mission with id '" + missionId + "' is not found.");
            return;
        }

        console.error("Not yet implemented.");
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
                    <td>Start a mission. (example: start Yt8fiW)</td>
                </tr>
            </table>
        `);
    };

    const onCommand = (command) => {
        if (command === "help") {
            showHelpText();
        }

        if (command.includes("start")) {
            const input = command.split(" ").filter(i => i && i !== "start");
            if (input.length > 1) {
                setText("A mission id can only be one word. (example: start Yt8fiW)");
                return false;
            }
            else if (input.length === 0) {
                setText("No mission id provided. (example: start Yt8fiW)");
                return false;
            }

            startMission(input[0]);
            return true;
        }

        return false;
    };

    const dialogClose = () => {
        setShowDialog(false);
    };

    return (
        <React.Fragment>
            <Dialog show={showDialog} onClose={dialogClose} onCommand={onCommand} text={text}/>
            <LevelElement x={x} 
                        y={y} 
                        imageSource="resources/level-elements/console.png"
                        width={width}
                        height={height}
                        {...props} />
        </React.Fragment>
    );
};
