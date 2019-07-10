import React from 'react';
import ToDoCard from './ToDoCard';
import styled from "styled-components";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toDoPayload: [
        {cardName: "Name1", cardTime: "Created at 1", isDone: false},
        {cardName: "Name2", cardTime: "Created at 2", isDone: false}
      ],
    }
  }

  handleCardClick = target => {
    
  }

  render() {
    return (
      <AppWrapper>
        {this.state.toDoPayload.map((item, index) => {
          return(
            <ToDoCard 
              id={`cardId${index}`}
              cardName={item.cardName}
              cardTime={item.cardTime}  
              onClick={this.handleCardClick}
            />
          )
        })}
      </AppWrapper>
    );
  }
}

export default App;

const AppWrapper = styled.div`
  margin: 240px;
`