import React from 'react';
import styled from 'styled-components';

export default function Checkbox(props) {
  const { isChecked, onClick } = props;
  const [state, setState] = React.useState({isChecked: isChecked})
  
  return(
    <label>
      <Input 
        type="checkbox"
        checked={state.isChecked}
        onClick={onClick}
        onChange={() => {setState(!state.checked)}}
      />
      <CheckboxView></CheckboxView>
    </label>
  );
}

const Input = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`

const CheckboxView= styled.input`
  width: 24px;
  height: 24px;
`

