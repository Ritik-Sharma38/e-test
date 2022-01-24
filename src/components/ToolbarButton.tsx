import styled from "styled-components";

type Props = { active?: boolean; disabled?: boolean };

export default styled.button<Props>`
  display: inline-block;
  flex: 0;
  width: 28px;
  height: 28px;
  cursor: pointer;
  margin-left: 30px;
  border: ${props =>
    props.active ? "2px solid #BF9B9B" : "2px solid transparent"};
  border-radius: 3px;
  background: none;
  transition: opacity 100ms ease-in-out;
  padding: 0;
  opacity: 1;
  outline: none;
  pointer-events: all;
  position: relative;
  padding-right: 24px;

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
