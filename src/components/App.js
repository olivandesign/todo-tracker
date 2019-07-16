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

  handleCheckboxChange = index => {
    const { toDoList } = this.state
    const clickedCard = toDoList[index]
    clickedCard.isDone = !clickedCard.isDone;
    toDoList[index] = clickedCard;
    setTimeout(() => {
      this.setState({ toDoList: toDoList });
    }, 300);
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
    };
    toDoList = [
      ...toDoList, 
      {
        cardName: inputValue, 
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
        handleCheckboxChange={this.handleCheckboxChange}
        onDragStart={() => this.onDragStart(index)}
        onDragOver={() => this.onDragOver(index)}
        onDragEnd={this.onDragEnd}
      />
    );
  }

  render() {
    const { inputValue, toDoList, cardsView } = this.state;
    return (
      <AppContainer>
        <NavBar>
          <ViewToggleContainer onClick={this.handleViewToggleClick}>
            <ViewToggle id="all">Все</ViewToggle>
            <ViewToggle id="active">Активные</ViewToggle>
            <ViewToggle id="done">Выполненные</ViewToggle>
          </ViewToggleContainer>
        </NavBar>
        <AppBody>
          <Description>
            <Header>
              Привет, Иван <br/>
              У тебя еще {toDoList.length} задач.
            </Header>
          </Description>
          <ToDoListContainer>
            {toDoList.map((item, index) => {
              switch (cardsView) {
                case 'all': 
                  return this.renderToDoCard(item, index);
                case 'active': 
                  return !item.isDone ? this.renderToDoCard(item, index) : null;
                case 'done': 
                  return item.isDone ? this.renderToDoCard(item, index) : null;
                default: 
                  return null;
              }
            })}
          </ToDoListContainer>
        </AppBody>
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
      </AppContainer>
    );
  }
}

export default App;

const AppContainer = styled.div`
  margin: auto;
`

const ViewToggleContainer = styled.ul`
  padding: 0px;
  display: flex;
  list-style-type: none;
`

const ViewToggle = styled.li`
  margin-right: 16px;
  opacity: 0.4;

  :hover {
    cursor: pointer;
    opacity: 1;
  }
`

const Header = styled.h1`
  display: block;
  margin-bottom: 32px;
  font-size: 32px;
  line-height: 48px;
`

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0px 32px;
  border-bottom: 1px solid #F2F2F2;
`

const ToDoListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const AppBody = styled.div`
  display: flex;
`

const Description = styled.div`

`