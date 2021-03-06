"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
exports.default = styled_components_1.default.button `
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
//# sourceMappingURL=ToolbarHeadingMenu.js.map