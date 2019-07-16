import React from 'react';
import Checkbox from '../atoms/Checkbox'
import styled from 'styled-components';

export default function ToDoCard(props) {
  const { 
    cardName, 
    createdAt, 
    isDone,
    index,
    handleCheckboxChange, 
    onDragStart, 
    onDragOver, 
    onDragEnd 
  } = props;
  return(
    <CardWrapper 
      isDone={isDone}
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
      <Checkbox isChecked={isDone} onChange={() => handleCheckboxChange(index)}/>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.12);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  :hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.16), 0 4px 4px rgba(0,0,0,0.16);
  }
`;

const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const CardName = styled.span`
  display: block;
  font-size: 17px;
  font-weight: 700;
  line-height: 28px;
`;

const CardCreationTime = styled.span`
  display: block;
  opacity: 0.4;
`;