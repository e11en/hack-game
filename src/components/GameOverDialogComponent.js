import React from "react";
import { useDispatch} from 'react-redux';
import styled from "styled-components";

import { GameOver, ResetHealth } from 'state/actions';
import Button from "components/ButtonComponent";
import Dialog from "components/DialogComponent";

const Title = styled.h1`
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default ({onReset = () => {}, show = false}) => {
    const dispatch = useDispatch();

    const onLevelRetry = () => {
        onReset();
        dispatch(ResetHealth());
        dispatch(GameOver(false));
      };

    return (
        <Dialog show={show} showCloseButton={false}>
          <Title>GAME OVER!</Title>
          <Wrapper>
            <Button onClick={onLevelRetry}>RETRY</Button>
          </Wrapper>
        </Dialog>
    );
};
