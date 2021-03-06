import * as React from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import styled, { withTheme } from "styled-components";
import theme from "../styles/theme";

export type Props = {
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  theme: typeof theme;
  icon?: typeof React.Component | React.FC<any>;
  title: React.ReactNode;
  shortcut?: string;
  containerId?: string;
  itemName: string;
  level: any;
};

const Icons = {
  strong: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.6 10.79C16.57 10.12 17.25 9.02 17.25 8C17.25 5.74 15.5 4 13.25 4H7V18H14.04C16.13 18 17.75 16.3 17.75 14.21C17.75 12.69 16.89 11.39 15.6 10.79ZM10 6.5H13C13.83 6.5 14.5 7.17 14.5 8C14.5 8.83 13.83 9.5 13 9.5H10V6.5ZM13.5 15.5H10V12.5H13.5C14.33 12.5 15 13.17 15 14C15 14.83 14.33 15.5 13.5 15.5Z" />
    </svg>
  ),
  em: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4V7H12.21L8.79 15H6V18H14V15H11.79L15.21 7H18V4H10Z" />
    </svg>
  ),
  strikethrough: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.24 9.75C6.98 9.27 6.85 8.72 6.85 8.08C6.85 7.47 6.98 6.92 7.25 6.41C7.51 5.91 7.88 5.48 8.36 5.12C8.84 4.77 9.41 4.49 10.06 4.29C10.72 4.1 11.45 4 12.24 4C13.05 4 13.78 4.11 14.45 4.34C15.11 4.56 15.68 4.88 16.14 5.28C16.61 5.68 16.97 6.16 17.22 6.71C17.47 7.26 17.6 7.86 17.6 8.52H14.59C14.59 8.21 14.54 7.93 14.44 7.67C14.35 7.4 14.2 7.18 14 6.99C13.8 6.8 13.55 6.66 13.25 6.55C12.95 6.45 12.59 6.39 12.19 6.39C11.8 6.39 11.45 6.43 11.16 6.52C10.87 6.61 10.63 6.73 10.44 6.88C10.25 7.04 10.1 7.22 10 7.43C9.9 7.64 9.85 7.86 9.85 8.09C9.85 8.57 10.1 8.97 10.59 9.3C10.97 9.55 11.36 9.78 12 10H7.39C7.34 9.92 7.28 9.83 7.24 9.75ZM21 13V11H3V13H12.62C12.8 13.07 13.02 13.14 13.17 13.2C13.54 13.37 13.83 13.54 14.04 13.71C14.25 13.88 14.39 14.07 14.47 14.28C14.54 14.48 14.58 14.71 14.58 14.97C14.58 15.2 14.53 15.42 14.44 15.63C14.35 15.83 14.21 16.01 14.02 16.16C13.83 16.31 13.6 16.42 13.31 16.51C13.02 16.59 12.68 16.64 12.3 16.64C11.87 16.64 11.47 16.6 11.12 16.51C10.77 16.42 10.46 16.28 10.21 16.09C9.96 15.9 9.76 15.65 9.62 15.34C9.48 15.03 9.37 14.58 9.37 14.13H6.4C6.4 14.68 6.48 15.26 6.64 15.71C6.8 16.16 7.01 16.56 7.29 16.92C7.57 17.27 7.89 17.58 8.27 17.84C8.64 18.1 9.05 18.32 9.49 18.49C9.93 18.66 10.39 18.79 10.87 18.88C11.35 18.96 11.83 19.01 12.31 19.01C13.11 19.01 13.84 18.92 14.49 18.73C15.14 18.54 15.7 18.28 16.16 17.94C16.62 17.6 16.98 17.17 17.23 16.67C17.48 16.17 17.61 15.6 17.61 14.96C17.61 14.36 17.51 13.82 17.3 13.35C17.25 13.24 17.19 13.12 17.13 13.02H21V13Z" />
    </svg>
  ),
  image: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 6V8.99C19 8.99 17.01 9 17 8.99V6H14C14 6 14.01 4.01 14 4H17V1H19V4H22V6H19ZM16 10V7H13V4H5C3.9 4 3 4.9 3 6V18C3 19.1 3.9 20 5 20H17C18.1 20 19 19.1 19 18V10H16ZM5 18L8 14L10 17L13 13L17 18H5Z" />
    </svg>
  ),
  link: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z" />
    </svg>
  ),
  ordered_list: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 17H4V17.5H3V18.5H4V19H2V20H5V16H2V17ZM3 8H4C4.11539 6.44017 4.05894 5.56051 4 4H2V5H3V8ZM2 11H3.8L2 13.1V14H5V13H3.2L5 10.9V10H2V11ZM7 5V7H21V5H7ZM7 19H21V17H7V19ZM7 13H21V11H7V13Z" />
    </svg>
  ),
  bullet_list: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 10.5C3.17 10.5 2.5 11.17 2.5 12C2.5 12.83 3.17 13.5 4 13.5C4.83 13.5 5.5 12.83 5.5 12C5.5 11.17 4.83 10.5 4 10.5ZM4 4.5C3.17 4.5 2.5 5.17 2.5 6C2.5 6.83 3.17 7.5 4 7.5C4.83 7.5 5.5 6.83 5.5 6C5.5 5.17 4.83 4.5 4 4.5ZM4 16.5C3.17 16.5 2.5 17.18 2.5 18C2.5 18.82 3.18 19.5 4 19.5C4.82 19.5 5.5 18.82 5.5 18C5.5 17.18 4.83 16.5 4 16.5ZM7 19H21V17H7V19ZM7 13H21V11H7V13ZM7 5V7H21V5H7Z" />
    </svg>
  ),
  checkbox_list: (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" />
      <path d="M9.92259 14.4241L6.99644 11.498L6 12.4874L9.92259 16.41L18.3432 7.98942L17.3538 7L9.92259 14.4241Z" />
    </svg>
  ),
  code_block: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.8926 15.8467L19.668 12.0631L15.8926 8.27948L17.0549 7.11719L22.0008 12.0631L17.0549 17.009L15.8926 15.8467Z" />
      <path d="M8.10742 8.28023L4.33204 12.0639L8.10742 15.8475L6.94513 17.0098L1.99922 12.0639L6.94513 7.11794L8.10742 8.28023Z" />
      <line
        x1="13.7869"
        y1="5.0885"
        x2="9.94663"
        y2="19.4206"
        stroke="#929292"
        strokeWidth="1.48377"
      />
    </svg>
  ),
  blockquote: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z" />
    </svg>
  ),
  text: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z" />
    </svg>
  ),
  alignLeft: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z" />
    </svg>
  ),
  alignCenter: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z" />
    </svg>
  ),
  alignRight: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z" />
    </svg>
  ),
  downloadImage: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z" />
    </svg>
  ),
  replaceImage: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z" />
    </svg>
  ),
  deleteImage: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z" />
    </svg>
  ),
  heading1: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 7H13V17H11V13H7V17H5V7H7V11H11V7ZM17.57 7C16.9763 7.94914 16.0659 8.65761 15 9V10H17V17H19V7H17.57Z" />
    </svg>
  ),
  heading2: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 6.99999H11V17H9V13H5V17H3V6.99999H5V11H9V6.99999ZM17 15C17.51 14.59 17.6 14.38 18.06 13.95C18.497 13.55 18.908 13.122 19.29 12.67C19.6237 12.279 19.9091 11.8492 20.14 11.39C20.339 11 20.445 10.568 20.45 10.13C20.455 9.68867 20.3628 9.25167 20.18 8.84999C20.0027 8.46517 19.7433 8.12384 19.42 7.84999C19.074 7.56689 18.6768 7.353 18.25 7.21999C17.7649 7.06709 17.2585 6.99282 16.75 6.99999C16.391 6.99999 16.033 7.03299 15.68 7.09999C15.3373 7.16083 15.0021 7.25804 14.68 7.38999C14.3759 7.52069 14.0875 7.68505 13.82 7.87999C13.533 8.08999 13.259 8.31699 13 8.55999L14.24 9.77999C14.5479 9.5123 14.8831 9.27768 15.24 9.07999C15.59 8.87899 15.987 8.77599 16.39 8.77999C16.8451 8.75097 17.2956 8.88576 17.66 9.15999C17.971 9.43799 18.137 9.84399 18.11 10.26C18.0958 10.6563 17.9711 11.0408 17.75 11.37C17.4647 11.8229 17.1292 12.2422 16.75 12.62C16.31 13.05 15.77 13.54 15.16 14.05C14.55 14.56 13.75 15.11 13 15.7V17H21V15H17Z" />
    </svg>
  ),
  heading3: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.11 14.218C14.465 14.505 14.859 14.741 15.28 14.918C15.714 15.099 16.18 15.191 16.65 15.188C17.134 15.205 17.615 15.102 18.05 14.888C18.2132 14.8163 18.3521 14.6988 18.4497 14.5497C18.5473 14.4005 18.5996 14.2263 18.6 14.048C18.6028 13.8447 18.551 13.6444 18.45 13.468C18.3268 13.2769 18.1492 13.1271 17.94 13.038C17.6212 12.9009 17.2845 12.81 16.94 12.768C16.4367 12.6952 15.9285 12.6618 15.42 12.668V11.098C16.1616 11.1502 16.905 11.0269 17.59 10.738C17.7716 10.6576 17.9269 10.5278 18.0383 10.3633C18.1497 10.1989 18.2127 10.0065 18.22 9.80802C18.2328 9.65159 18.2044 9.49454 18.1378 9.35245C18.0711 9.21037 17.9685 9.08818 17.84 8.99802C17.4994 8.79481 17.1061 8.69736 16.71 8.71802C16.3146 8.73083 15.9263 8.8262 15.57 8.99802C15.1949 9.16497 14.8394 9.3729 14.51 9.61802L13.29 8.22802C13.7908 7.8511 14.3431 7.54801 14.93 7.32802C15.5381 7.10393 16.1819 6.99211 16.83 6.99802C17.355 6.99096 17.8789 7.04805 18.39 7.16802C18.821 7.26902 19.23 7.44502 19.6 7.68802C19.925 7.89902 20.195 8.18302 20.39 8.51802C20.58 8.86002 20.677 9.24702 20.67 9.63802C20.681 10.118 20.493 10.581 20.15 10.918C19.7329 11.3091 19.2343 11.6028 18.69 11.778V11.838C19.299 11.978 19.865 12.263 20.34 12.668C20.777 13.05 21.02 13.608 21 14.188C21.005 14.609 20.887 15.023 20.66 15.378C20.4293 15.7347 20.1218 16.0353 19.76 16.258C19.3524 16.5111 18.9067 16.6968 18.44 16.808C17.9265 16.9361 17.3992 16.9999 16.87 16.998C16.0838 17.0172 15.3008 16.8918 14.56 16.628C13.9698 16.4136 13.4338 16.0722 12.99 15.628L14.11 14.218ZM9 11H5V7.00002H3V17H5V13H9V17H11V7.00002H9V11Z" />
    </svg>
  ),
};

function BlockMenuItem({
  selected,
  disabled,
  onClick,
  title,
  shortcut,
  itemName,
  icon,
  level,
  containerId = "block-menu-container",
}: Props) {
  const Icon = icon;

  const ref = React.useCallback(
    node => {
      if (selected && node) {
        scrollIntoView(node, {
          scrollMode: "if-needed",
          block: "center",
          boundary: parent => {
            // All the parent elements of your target are checked until they
            // reach the #block-menu-container. Prevents body and other parent
            // elements from being scrolled
            return parent.id !== containerId;
          },
        });
      }
    },
    [selected, containerId]
  );

  return (
    <MenuItem
      selected={selected}
      onClick={disabled ? undefined : onClick}
      ref={ref}
    >
      {Icon && (
        <>
          {Icons[itemName] ? (
            <IconDiv>{Icons[itemName]}</IconDiv>
          ) : (
            <IconDiv>{Icons[itemName + level]}</IconDiv>
          )}
          &nbsp;&nbsp;
        </>
      )}
      {title}
      {shortcut && <Shortcut>{shortcut}</Shortcut>}
    </MenuItem>
  );
}

const IconDiv = styled.div`
  fill: ${props => props.theme.blockToolbarIcon};
`;

const MenuItem = styled.button<{
  selected: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  width: 100%;
  height: 36px;
  cursor: pointer;
  border: none;
  opacity: ${props => (props.disabled ? ".5" : "1")};
  color: ${props =>
    props.selected
      ? props.theme.blockToolbarTextSelected
      : props.theme.blockToolbarText};
  background: ${props =>
    props.selected
      ? props.theme.blockToolbarSelectedBackground ||
        props.theme.blockToolbarTrigger
      : "none"};
  padding: 0 16px;
  outline: none;

  &:hover,
  &:active {
    color: ${props => props.theme.blockToolbarTextSelected};
    background: ${props =>
      props.selected
        ? props.theme.blockToolbarSelectedBackground ||
          props.theme.blockToolbarTrigger
        : props.theme.blockToolbarHoverBackground};
  }
`;

const Shortcut = styled.span`
  color: ${props => props.theme.blockTextSecondary};
  flex-grow: 1;
  text-align: right;
`;

export default withTheme(BlockMenuItem);
