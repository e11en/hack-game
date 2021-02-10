import React,{ useState, useEffect, useRef }  from "react";
import { useSelector } from 'react-redux';

import LevelElement from "./LevelElementComponent";
import Dialog from "./DialogComponent";
import { idEquals } from "helpers/collision";
import { ConsoleTexts } from "data/translations";

export default ({x = 0, y = 0, width = 64, height = 49, mission = {}, ...props}) => {
    const language = useSelector((state) => state.game.language);
    const collidingWith = useSelector((state) => state.character.collidingWith);
    const [showDialog, setShowDialog] = useState(false);
    const [missionStarted, setMissionStarted] = useState(false);
    const dialogRef = useRef();

    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "console", x, y) && !showDialog) {
            setShowDialog(true);
            setText(ConsoleTexts.startText[language]);
        }
    }, [collidingWith]);

    const setText = (text) => {
        dialogRef.current.setText(text);
    };

    const startMission = () => {
        setMissionStarted(true);
        setText(ConsoleTexts.startMissionText[language]);
        setText("");

        mission.startText[language].forEach(line => {
            setText(line);
        });
    };

    const showHelpText = () => {
        setText(`
            <table>
                <tr>
                    <td>help</td>
                    <td>${ConsoleTexts.helpText.help[language]}</td>
                </tr>
                <tr>
                    <td>exit</td>
                    <td>${ConsoleTexts.helpText.exit[language]}</td>
                </tr>
                <tr>
                    <td>start</td>
                    <td>${ConsoleTexts.helpText.start[language]}</td>
                </tr>
            </table>
        `);
    };

    const onCommand = (command) => {
        if (missionStarted && command === mission.answer) {
            mission.actionText[language].forEach(line => {
                setText(line);
            });

            mission.action(props);
            setTimeout(() => {
                mission.finishText[language].forEach(line => {
                    setText(line);
                });
            }, 1000);
            
            return true;
        }

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
