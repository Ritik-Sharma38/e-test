"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const Input = styled_components_1.default.input `
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
exports.default = Input;
//# sourceMappingURL=Input.js.map