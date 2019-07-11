import React from 'react';
import ToDoCard from './ToDoCard';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toDoList: localStorage.toDoList ? JSON.parse(localStorage.getItem('toDoList')) : [],
      inputValue: '',
      draggedItem: null,
      cardsView: 'active',
    }
  }

  handleCardClick = index => {
    const { toDoList } = this.state
    const clickedCard = toDoList[index]
    clickedCard.isDone = !clickedCard.isDone;
    toDoList[index] = clickedCard;

    this.setState({ toDoList: toDoList });
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
  }

  handleInputChange = e => {
    const inputValue = e.target.value;

    this.setState({ inputValue: inputValue })
  }

  handleSubmitClick = e => {
    e.preventDefault();
    let { inputValue, toDoList } = this.state;
    const currentDate = new Date();
    const dateOptions = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    toDoList = [
      ...toDoList, 
      {
        cardName: inputValue, 
        cardTime: "Created at", 
        isDone: false, 
        createdAt: `Добавлено ${currentDate.toLocaleString("ru", dateOptions)}`,
      }
    ];

    if (inputValue === '') return;
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
    
    this.setState({
      toDoList: toDoList,
      inputValue: '',
    });
  }

  handleViewToggleClick = e => {
    const view = e.target.id;
    console.log(e.target.id)
    this.setState({ cardsView: view })
  }

  onDragStart = index => {
    const draggedItem = this.state.toDoList[index];

    this.setState({ draggedItem: draggedItem });
  }

  onDragOver = index => {
    const { draggedItem } = this.state;
    const draggedOverItem = this.state.toDoList[index];
    if (draggedItem === draggedOverItem) return;
    let toDoList = this.state.toDoList.filter(item => item !== draggedItem);
    toDoList.splice(index, 0, draggedItem);

    this.setState({ toDoList: toDoList });
  }

  onDragEnd = () => {
    this.setState({ draggedItem: null });
  }

  renderToDoCard = (item, index) => {
    return (
      <ToDoCard 
        key={index}
        index={index}
        cardName={item.cardName}
        createdAt={item.createdAt}
        isDone={item.isDone}
        onClick={this.handleCardClick}
        onDragStart={() => this.onDragStart(index)}
        onDragOver={() => this.onDragOver(index)}
        onDragEnd={this.onDragEnd}
      />
    );
  }

  render() {
    const { inputValue, toDoList, cardsView } = this.state;
    return (
      <AppWrapper>
        <form onSubmit={this.handleSubmitClick}>
          <input 
            type="text"
            value={inputValue}
            onChange={this.handleInputChange}
          />
          <input 
            type="submit"
            value="Add"
          />
        </form>
        <ViewToggleContainer onClick={this.handleViewToggleClick}>
          <ViewToggle id="all">Все</ViewToggle>
          <ViewToggle id="active">Активные</ViewToggle>
          <ViewToggle id="done">Выполненные</ViewToggle>
        </ViewToggleContainer>
        {toDoList.map((item, index) => {
          switch (cardsView) {
            case 'all': 
              return this.renderToDoCard(item, index);
            case 'active': 
              return !item.isDone ? this.renderToDoCard(item, index) : null;
            case 'done': 
              return item.isDone ? this.renderToDoCard(item, index) : null;
            default:
              return <MessageContainer>Что-то пошло не так</MessageContainer>
          }
        })}
      </AppWrapper>
    );
  }
}

export default App;

const AppWrapper = styled.div`
  margin: auto;
  width: 480px;
`

const ViewToggleContainer = styled.ul`

`

const ViewToggle = styled.li`

`

const MessageContainer = styled.div`

`