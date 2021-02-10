import React, { useEffect, useState }  from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import LanguagePicker from "components/LanguagePickerComponent";
import { GameOver } from "state/actions";

const Hud = styled.div`
    height: 50px;
    width: 100px;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 10px;
    outline: ${props => props.showOutline ? 3 : 0}px solid cyan;
`;

const Health = styled.div`
    display: flex;
`;

const Heart = styled.img`
    height: 27px;
    width: 30px;
`;

const BarWrapper = styled.div`
    margin-left: 5px;
    height: 10px;
    width: 65px;
    background-color: white;
    align-self: center;
    border: 3px solid black;
    position: relative;
`;

const Bar = styled.div`
    margin-left: 5px;
    height: 10px;
    width: ${props => props.width}px;
    background-color: red;
    align-self: center;
    position: absolute;
    top: 0;
    left: -5px;
`;

export default (props) => {
    const dispatch = useDispatch();
    const health = useSelector((state) => state.character.health);
    const [healthBarWidth, setHealthBarWidth] = useState(health);

    useEffect(() => {
        setHealthBarWidth((61 / 100) * health);

        if (health <= 0)
            dispatch(GameOver());
    }, [health]);

    return (
        <Hud>
            <Health>
                <Heart src={process.env.PUBLIC_URL + "resources/hud/heart.png"} />
                <BarWrapper>
                    <Bar width={healthBarWidth} />
                </BarWrapper>
            </Health>
            <LanguagePicker {...props} />
        </Hud>
    );
};
