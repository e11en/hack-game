import React,{ useState, useEffect, useRef }  from "react";
import { useSelector } from 'react-redux';

import LevelElement from "./LevelElementComponent";
import Dialog from "./DialogComponent";
import { idEquals } from "helpers/collision";

const startText = {
    "EN": "Type 'help' to show all available command. <br/>",
    "NL": "Typ 'help' om alle commando's te zien. <br/>"
};

const startMissionText = {
    "EN": "Starting mission...",
    "NL": "Missie starten..."
};

const helpText = {
    "help": {
        "EN": "Show all commands.",
        "NL": "Toon alle commando's."
    },
    "exit": {
        "EN": "Exit this window.",
        "NL": "Sluit dit venster"
    },
    "start": {
        "EN": "Start the mission.",
        "NL": "Start de missie."
    }
};

export default ({x = 0, y = 0, width = 64, height = 49, ...props}) => {
    const language = useSelector((state) => state.game.language);
    const collidingWith = useSelector((state) => state.character.collidingWith);
    const [showDialog, setShowDialog] = useState(false);
    const dialogRef = useRef();

    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "console", x, y) && !showDialog) {
            setShowDialog(true);
            setText(startText[language]);
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
        setText(startMissionText[language]);

        console.error("Not yet implemented.");
        startTestMission();
    };

    const showHelpText = () => {
        setText(`
            <table>
                <tr>
                    <td>help</td>
                    <td>${helpText.help[language]}</td>
                </tr>
                <tr>
                    <td>exit</td>
                    <td>${helpText.exit[language]}</td>
                </tr>
                <tr>
                    <td>start</td>
                    <td>${helpText.start[language]}</td>
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
