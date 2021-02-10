import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Typist from 'react-typist';
import { useSelector } from 'react-redux';

import { getPixelSize } from "../helpers/constants";

const Dialog = styled.div.attrs(props => ({
    style: {
        transform: `translate3d(${(props.x * getPixelSize()) - 340}px, ${(props.y * getPixelSize()) + 275}px, 0)`
    },
}))`
    position: absolute;
    width: calc((100%) - 285px);
    height: 100px;
    background-color: #FFF;
    border: 3px solid #000;
    margin: 5px;
    padding: 5px;
    overflow-y: auto;
    display: ${props => props.show ? "block" : "none"};
`;

const Close = styled.div`
    position: absolute;
    top: 0px;
    right: 7px;

    &:hover {
        color: #7d7d7d;
        cursor: pointer;
    }
`;

export default ({show, text, onClose}) => {
    const textRef = useRef();
    const language = useSelector((state) => state.game.language);
    const characterX = useSelector((state) => state.character.x);
    const characterY = useSelector((state) => state.character.y);
    const [textState, setTextState] = useState([]);
    const [speechIsDone, setSpeechIsDone] = useState(false);

    const scrollDown = () => {
        if (textRef && textRef.current)
            textRef.current.scrollTop = textRef.current.scrollHeight;
    };

    useEffect(() => {
        if (!show) return;

        setTextState(<Typist startDelay={200} cursor={{show: false}} onCharacterTyped={scrollDown} onTypingDone={() => setSpeechIsDone(true)}>
            {
                text[language].map(text => <div key={text}>{text}<Typist.Delay ms={500} /></div>)
            }
        </Typist>);
    }, [show]);

    useEffect(() => {
        if (!show || !speechIsDone) return;

        close();
    }, [characterX, characterY]);

    const close = () => {
        onClose();
        setSpeechIsDone(false);
        setTextState("");
    }

    return (
        <Dialog ref={textRef} show={show} x={characterX} y={characterY}>
            <Close onClick={close}>x</Close>
            {textState}
        </Dialog>
    );
};
