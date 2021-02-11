import React from "react";
import styled from "styled-components";

const Button = styled.button`
    border: 3px solid #3b9e1c;
    color: #3b9e1c;
    background-color: transparent;

    &:hover {
        cursor: pointer;
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

export default (props) => (<Button onClick={props.onClick} {...props}>{props.children}</Button>);
