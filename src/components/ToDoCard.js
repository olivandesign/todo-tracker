import React from 'react';
import Checkbox from '../atoms/Checkbox'
import styled from 'styled-components';

export default function ToDoCard(props) {
  const { 
    cardName, 
    createdAt, 
    isDone,
    index,
    onClick, 
    onDragStart, 
    onDragOver, 
    onDragEnd 
  } = props;
  return(
    <CardWrapper 
      draggable 
      onDragStart={onDragStart} 
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <CardInfoContainer>
        <CardName>
          {cardName}
        </CardName>
        <CardCreationTime>
          {createdAt}
        </CardCreationTime>
      </CardInfoContainer>
      <Checkbox isChecked={isDone} onClick={() => onClick(index)}/>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  margin: 4px 0 4px 0;
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