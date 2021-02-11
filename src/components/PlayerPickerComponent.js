import React from "react";
import { useDispatch} from 'react-redux';
import styled from "styled-components";

import { SetCharacterImage } from 'state/actions';
import Dialog from "components/DialogComponent";

const StyledDialog = styled(Dialog)`
  top: calc(50% - 310px);
  left: calc(50% - 435px);
  width: 500px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PlayerImage = styled.img`
  height: 90px;

  &:hover {
    height: 100px;
    cursor: pointer;
    outline: 3px solid #3b9e1c;
  }
`;

export default ({onClose = () => {}, show = false}) => {
    const dispatch = useDispatch();

    const onClick = (image) => {
        dispatch(SetCharacterImage("resources/characters/player/player-" + image + ".png"));
        onClose();
    };

    return (
        <StyledDialog show={show} showCloseButton={false}>
          <Title>Choose your player:</Title>
          <Wrapper>
            {
              [1,2,3,4,5].map(image => 
                <PlayerImage key={image} onClick={() => onClick(image)} src={process.env.PUBLIC_URL + "resources/characters/player/preview/player-" + image + ".png"}/>
              )
            }
          </Wrapper>
        </StyledDialog>
    );
};
