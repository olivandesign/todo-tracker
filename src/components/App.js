import React from 'react';
import ToDoCard from './ToDoCard';
import styled from 'styled-components';
import todoLogo from "../todoLogo.svg";

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
      day: 'numeric',
      month: 'long',
      year: 'numeric'
      // hour: 'numeric',
      // minute: 'numeric',
    };
    toDoList = [
      ...toDoList, 
      {
        cardName: inputValue, 
        cardDate: `Updated on ${currentDate.toLocaleString("en", dateOptions)}`,
        image: '',
        isDone: false, 
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
        cardDate={item.cardDate}
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
      <AppWrapper>
        <NavBar>
          <Logo> 
            <LogoIcon logo={todoLogo}/>
            todo list
          </Logo>
          <ViewToggleContainer onClick={this.handleViewToggleClick}>
            <ViewToggle id="all">Все ({toDoList.length})</ViewToggle>
            <ViewToggle id="active">Активные</ViewToggle>
            <ViewToggle id="done">Выполненные</ViewToggle>
          </ViewToggleContainer>
        </NavBar>
        <AppContainer>
          <InputContainer>
            <form onSubmit={this.handleSubmitClick}>
              <input 
                type="text"
                value={inputValue}
                onChange={this.handleInputChange}
              />
              <input type="file" />
              <input 
                type="submit"
                value="Add"
              />
            </form>
          </InputContainer>
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
        </AppContainer>
      </AppWrapper>
    );
  }
}

export default App;

const AppWrapper = styled.div`
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

  :last-child {
    margin-right: 0px;
  }

  :hover {
    cursor: pointer;
    opacity: 1;
  }
`

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0px 24px;
  border-bottom: 1px solid #F2F2F2;
`

const InputContainer = styled.div`
  display: flex;
  margin: 24px auto 48px;
`

const ToDoListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  grid-auto-rows: minmax(100px, auto);
  width: 100%;
  max-width: 960px;
  margin: auto;
`

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;
`

const Logo = styled.span`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 900;
  line-height: 32px;
`

const LogoIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  background-image: url("${props => props.logo}");
`