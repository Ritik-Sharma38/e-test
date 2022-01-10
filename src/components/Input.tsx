import styled from "styled-components";

const Input = styled.input`
  font-size: 15px;
  background: ${props => props.theme.toolbarInput};
  color: ${props => props.theme.toolbarItem};
  border-radius: 5px;
  border: 1px solid ${props => props.theme.inputBorder};
  margin: 0;
  outline: none;
  flex-grow: 1;
  min-height: 32px;
  padding: 7px 12px;

  @media (hover: none) and (pointer: coarse) {
    font-size: 16px;
  }
`;

export default Input;
