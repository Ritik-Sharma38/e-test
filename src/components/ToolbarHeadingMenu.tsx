import styled from "styled-components";

type Props = { active?: boolean; disabled?: boolean };

export default styled.button<Props>`
  display: flex;
  width: 120px;
  height: 40px;
  margin-right: 15px;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  border: none;
  border-radius: 3px;
  background: none;
  transition: opacity 100ms ease-in-out;
  padding: 0;
  opacity: 0.7;
  outline: none;
  pointer-events: all;
  position: relative;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }

  ${props => props.active && "opacity: 1;"};
`;
