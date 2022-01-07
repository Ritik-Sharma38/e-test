import styled from "styled-components";

type Props = { active?: boolean; disabled?: boolean };

export default styled.button<Props>`
  display: flex;
  width: 120px;
  height: 40px;
  cursor: pointer;
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

  &:before {
    position: absolute;
    content: "";
    top: -4px;
    right: -4px;
    left: -4px;
    bottom: -4px;
  }

  ${props => props.active && "opacity: 1;"};
`;
