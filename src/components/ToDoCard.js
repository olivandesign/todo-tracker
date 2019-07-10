import React from 'react';
import Checkbox from '../atoms/Checkbox'
import styled from 'styled-components';

export default function ToDoCard(props) {
  return(
    <CardWrapper onClick={props.onClick}>
      <CardInfoContainer>
        <CardName>
          {props.cardName}
        </CardName>
        <CardCreationTime>
          {props.cardTime}
        </CardCreationTime>
      </CardInfoContainer>
      <Checkbox isDisabled={false} isChecked={false} />
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  padding: 16px;
  border: 1px solid red;
  border-radius: 4px;
  background-color: white;
`;

const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const CardName = styled.span`
  display: block;
`;

const CardCreationTime = styled.span`
  display: block;
`;