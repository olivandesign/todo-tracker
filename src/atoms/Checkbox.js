import React from 'react';
import styled from 'styled-components';

export default function Checkbox(props) {
  const { isChecked, onChange } = props;
  
  return(
    <label>
      <Input 
        checked={isChecked}
        onChange={onChange}
      />
    </label>
  );
}

const Input = styled.input.attrs({ type: 'checkbox' })`
`

