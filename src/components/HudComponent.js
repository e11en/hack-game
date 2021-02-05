import React, { useEffect }  from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

const Hud = styled.div`
    height: 50px;
    width: 100px;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 10px;
    outline: 3px solid cyan;
`;

const Health = styled.div`
    display: flex;
`;

const Heart = styled.img`
    height: 27px;
    width: 30px;
`;

const Bar = styled.div`
    margin-left: 5px;
    height: 10px;
    width: 65px;
    background-color: red;
    align-self: center;
`;

export default (props) => {
    const dispatch = useDispatch();
    const health = useSelector((state) => state.character.health);

    useEffect(() => {
        // if (health <= 0)
        //     dispatch(Die());
    }, [health]);

    return (
        <Hud>
            <Health>
                <Heart src={process.env.PUBLIC_URL + "resources/hud/heart.png"} />
                <Bar />
            </Health>
        </Hud>
    );
};
