import React from 'react';
import styled from 'styled-components';

export default function Checkbox(props) {
  const { isChecked, isDisabled } = props;
  const [state, setState] = React.useState({isChecked: isChecked})
  
  return(
    <label>
      <input 
        type="checkbox"
        isChecked={state.checked}
        isDisabled={isDisabled}
        onChange={() => {setState(!state.checked)}}
      />
      </label>
  );
}

