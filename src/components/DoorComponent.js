import React, { useEffect, useState }  from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

import Dialog from "./DialogComponent";
import { idEquals } from "helpers/collision";
import LevelElement from "./LevelElementComponent";

const Door = styled(LevelElement)`
    display: flex;
    
    & img {
        flex: 1;
    }
`;

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    top: 60px;
`;

const Text = styled.p`
    margin: 5px;
`;

const Input = styled.input`
    width: 350px;
    border: 3px solid #3b9e1c;
    background-color: #35312b;
    color: #3b9e1c;

    &:focus {
        outline: none;
    }
`;

const Button = styled.button`
    margin-top: 10px;
    border: 3px solid #3b9e1c;
    color: #3b9e1c;
    background-color: transparent;

    &:hover {
        background-color: #3b9e1c;
        color: #35312b;
    }

    &:active {
        background-color: #225d0f;
        color: #3b9e1c;
    }

    &:focus {
        outline: none;
    }
`;

export default (props) => {
    const collidingWith = useSelector((state) => state.character.collidingWith);
    const [showDialog, setShowDialog] = useState(true);
    const [inputValue, setInputValue] = useState("");
    
    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "door", props.x, props.y) && !showDialog) {
            setShowDialog(true);
        }
    }, [collidingWith]);

    const onClick = () => {
        if (inputValue === "CTF{THIS_IS_A_TEST}")
            console.log("correct!");
        else {
            console.log("incorrect!");
        }
    };

    return (
        <React.Fragment>
            <Dialog show={showDialog} onClose={() => setShowDialog(false)} hasInput={false}>
                <Wrapper>
                    <Text>ENTER TOKEN: <br/></Text>
                    <Input autoFocus={true} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                    <Button onClick={onClick}>UNLOCK</Button>
                </Wrapper>
            </Dialog>
            <Door imageSource="resources/level-elements/door.png" {...props} />
        </React.Fragment>
    );
};
