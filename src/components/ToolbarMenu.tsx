import * as React from "react";
import { EditorView } from "prosemirror-view";
import styled, { withTheme } from "styled-components";
import ToolbarButton from "./ToolbarButton";
import ToolbarSeparator from "./ToolbarSeparator";
import theme from "../styles/theme";
import { MenuItem } from "../types";
import ToolbarHeadingMenu from "./ToolbarHeadingMenu";
import Select from "react-select";
import getHeadings from "../lib/getHeadings";

type Props = {
  tooltip: typeof React.Component | React.FC<any>;
  commands: Record<string, any>;
  commandRef: any;
  view: EditorView;
  theme: typeof theme;
  items: MenuItem[];
  isImageSelection: any;
  linkEditorRef: any;
  linkToolBarRef: any;
  onCloseLink: () => void;
  rootState: any;
};

const FlexibleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Icons = {
  strong: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.6 10.79C16.57 10.12 17.25 9.02 17.25 8C17.25 5.74 15.5 4 13.25 4H7V18H14.04C16.13 18 17.75 16.3 17.75 14.21C17.75 12.69 16.89 11.39 15.6 10.79ZM10 6.5H13C13.83 6.5 14.5 7.17 14.5 8C14.5 8.83 13.83 9.5 13 9.5H10V6.5ZM13.5 15.5H10V12.5H13.5C14.33 12.5 15 13.17 15 14C15 14.83 14.33 15.5 13.5 15.5Z"
        fill="#929292"
      />
    </svg>
  ),
  em: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4V7H12.21L8.79 15H6V18H14V15H11.79L15.21 7H18V4H10Z"
        fill="#929292"
      />
    </svg>
  ),
  strikethrough: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.24 9.75C6.98 9.27 6.85 8.72 6.85 8.08C6.85 7.47 6.98 6.92 7.25 6.41C7.51 5.91 7.88 5.48 8.36 5.12C8.84 4.77 9.41 4.49 10.06 4.29C10.72 4.1 11.45 4 12.24 4C13.05 4 13.78 4.11 14.45 4.34C15.11 4.56 15.68 4.88 16.14 5.28C16.61 5.68 16.97 6.16 17.22 6.71C17.47 7.26 17.6 7.86 17.6 8.52H14.59C14.59 8.21 14.54 7.93 14.44 7.67C14.35 7.4 14.2 7.18 14 6.99C13.8 6.8 13.55 6.66 13.25 6.55C12.95 6.45 12.59 6.39 12.19 6.39C11.8 6.39 11.45 6.43 11.16 6.52C10.87 6.61 10.63 6.73 10.44 6.88C10.25 7.04 10.1 7.22 10 7.43C9.9 7.64 9.85 7.86 9.85 8.09C9.85 8.57 10.1 8.97 10.59 9.3C10.97 9.55 11.36 9.78 12 10H7.39C7.34 9.92 7.28 9.83 7.24 9.75ZM21 13V11H3V13H12.62C12.8 13.07 13.02 13.14 13.17 13.2C13.54 13.37 13.83 13.54 14.04 13.71C14.25 13.88 14.39 14.07 14.47 14.28C14.54 14.48 14.58 14.71 14.58 14.97C14.58 15.2 14.53 15.42 14.44 15.63C14.35 15.83 14.21 16.01 14.02 16.16C13.83 16.31 13.6 16.42 13.31 16.51C13.02 16.59 12.68 16.64 12.3 16.64C11.87 16.64 11.47 16.6 11.12 16.51C10.77 16.42 10.46 16.28 10.21 16.09C9.96 15.9 9.76 15.65 9.62 15.34C9.48 15.03 9.37 14.58 9.37 14.13H6.4C6.4 14.68 6.48 15.26 6.64 15.71C6.8 16.16 7.01 16.56 7.29 16.92C7.57 17.27 7.89 17.58 8.27 17.84C8.64 18.1 9.05 18.32 9.49 18.49C9.93 18.66 10.39 18.79 10.87 18.88C11.35 18.96 11.83 19.01 12.31 19.01C13.11 19.01 13.84 18.92 14.49 18.73C15.14 18.54 15.7 18.28 16.16 17.94C16.62 17.6 16.98 17.17 17.23 16.67C17.48 16.17 17.61 15.6 17.61 14.96C17.61 14.36 17.51 13.82 17.3 13.35C17.25 13.24 17.19 13.12 17.13 13.02H21V13Z"
        fill="#929292"
      />
    </svg>
  ),
  image: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 6V8.99C19 8.99 17.01 9 17 8.99V6H14C14 6 14.01 4.01 14 4H17V1H19V4H22V6H19ZM16 10V7H13V4H5C3.9 4 3 4.9 3 6V18C3 19.1 3.9 20 5 20H17C18.1 20 19 19.1 19 18V10H16ZM5 18L8 14L10 17L13 13L17 18H5Z"
        fill="#929292"
      />
    </svg>
  ),
  link: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z"
        fill="#929292"
      />
    </svg>
  ),
  ordered_list: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 17H4V17.5H3V18.5H4V19H2V20H5V16H2V17ZM3 8H4C4.11539 6.44017 4.05894 5.56051 4 4H2V5H3V8ZM2 11H3.8L2 13.1V14H5V13H3.2L5 10.9V10H2V11ZM7 5V7H21V5H7ZM7 19H21V17H7V19ZM7 13H21V11H7V13Z"
        fill="#929292"
      />
    </svg>
  ),
  bullet_list: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10.5C3.17 10.5 2.5 11.17 2.5 12C2.5 12.83 3.17 13.5 4 13.5C4.83 13.5 5.5 12.83 5.5 12C5.5 11.17 4.83 10.5 4 10.5ZM4 4.5C3.17 4.5 2.5 5.17 2.5 6C2.5 6.83 3.17 7.5 4 7.5C4.83 7.5 5.5 6.83 5.5 6C5.5 5.17 4.83 4.5 4 4.5ZM4 16.5C3.17 16.5 2.5 17.18 2.5 18C2.5 18.82 3.18 19.5 4 19.5C4.82 19.5 5.5 18.82 5.5 18C5.5 17.18 4.83 16.5 4 16.5ZM7 19H21V17H7V19ZM7 13H21V11H7V13ZM7 5V7H21V5H7Z"
        fill="#929292"
      />
    </svg>
  ),
  checkbox_list: (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
        fill="#929292"
      />
      <path
        d="M9.92259 14.4241L6.99644 11.498L6 12.4874L9.92259 16.41L18.3432 7.98942L17.3538 7L9.92259 14.4241Z"
        fill="#929292"
      />
    </svg>
  ),
  code_inline: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8926 15.8467L19.668 12.0631L15.8926 8.27948L17.0549 7.11719L22.0008 12.0631L17.0549 17.009L15.8926 15.8467Z"
        fill="#929292"
      />
      <path
        d="M8.10742 8.28023L4.33204 12.0639L8.10742 15.8475L6.94513 17.0098L1.99922 12.0639L6.94513 7.11794L8.10742 8.28023Z"
        fill="#929292"
      />
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
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z"
        fill="#929292"
      />
    </svg>
  ),
  text: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z"
        fill="#929292"
      />
    </svg>
  ),
  alignLeft: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z"
        fill="#929292"
      />
    </svg>
  ),
  alignCenter: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z"
        fill="#929292"
      />
    </svg>
  ),
  alignRight: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z"
        fill="#929292"
      />
    </svg>
  ),
  downloadImage: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12V19H5V12H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V12H19ZM13 12.67L15.59 10.09L17 11.5L12 16.5L7 11.5L8.41 10.09L11 12.67V3H13V12.67Z"
        fill="#929292"
      />
    </svg>
  ),
  replaceImage: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6V9L16 5L12 1V4C7.58 4 4 7.58 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13.01 6 12C6 8.69 8.69 6 12 6ZM18.76 7.74L17.3 9.2C17.74 10.04 18 10.99 18 12C18 15.31 15.31 18 12 18V15L8 19L12 23V20C16.42 20 20 16.42 20 12C20 10.43 19.54 8.97 18.76 7.74Z"
        fill="#929292"
      />
    </svg>
  ),
  deleteImage: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
        fill="#929292"
      />
    </svg>
  ),
  removeFormat: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.27 5L2 6.27L8.97 13.24L6.5 19H9.5L11.07 15.34L16.73 21L18 19.73L3.55 5.27L3.27 5ZM6 5V5.18L8.82 8H11.22L10.5 9.68L12.6 11.78L14.21 8H20V5H6Z"
        fill="#929292"
      />
    </svg>
  ),
};

class ToolbarMenu extends React.Component<Props> {
  pickImage = (action: string, type: string) => {
    const { commandRef } = this.props;
    commandRef.current.insertItem({ name: action }, type);
  };

  call = (item: any, active_heading: any) => {
    if (item?.name) {
      if (item?.name === "link") {
        const { view, rootState, onCloseLink, linkToolBarRef } = this.props;
        const { state } = view;

        if (rootState.linkMenuOpen) {
          onCloseLink();
          if (linkToolBarRef?.current) {
            linkToolBarRef.current?.handleRemoveLinkViaProp();
          }
          return;
        }

        const selectionText = state.doc.cut(
          state.selection.from,
          state.selection.to
        ).textContent;

        if (!selectionText) {
          this.pickImage("link", "middle");
        }
      }
      this.props.commands[item.name](item.attrs);
    } else if (item === "Text" && active_heading?.name) {
      this.props.commands[active_heading.name](active_heading.attrs);
    }
  };

  handleRemoveAllMark = (item: any) => {
    if (item) this.call(item, "");
    const { view } = this.props;
    const { state, dispatch } = view;
    dispatch(state.tr.removeMark(state.selection.from, state.selection.to));
  };

  render() {
    const { view, items, isImageSelection, theme, rootState } = this.props;
    const { state } = view;
    const Tooltip = this.props.tooltip;
    const customStyles = {
      menu: provided => ({
        ...provided,
        width: "120px",
        background: theme.background,
        boxShadow: theme.ModalBoxShadow,
      }),

      control: () => ({
        width: "120px",
        display: "flex",
      }),

      option: (provided, { isSelected }) => ({
        ...provided,
        color: theme.color,
        height: "30px",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          background: isSelected ? theme.e200 : theme.hover20,
        },
        backgroundColor: isSelected ? theme.e200 : "transparent",
      }),

      menuPortal: provided => ({
        ...provided,
        margintTop: 0,
      }),

      menuList: provided => ({
        ...provided,
        margintTop: 0,
      }),

      singleValue: provided => ({
        ...provided,
        overflow: "unset",
        color: theme.color,
      }),
    };
    const IndicatorSeparator = () => null;

    const active_heading = [
      items[0],
      items[1],
      items[2],
      items[3],
      items[4],
      items[5],
    ].find(item => {
      if (item?.active ? item?.active(state) : false) {
        return item;
      } else return false;
    });

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {isImageSelection ? (
          <FlexibleWrapper>
            {items.map((item, index) => {
              if (!item) return;
              if (item?.name === "separator" && item.visible !== false) {
                return <ToolbarSeparator key={index} />;
              }
              if (item?.visible === false || !item?.icon) {
                return null;
              }

              const isActive = item?.active ? item.active(state) : false;
              return (
                <ToolbarButton
                  key={index}
                  onClick={() => this.call(item, "")}
                  active={isActive}
                >
                  <Tooltip tooltip={item.tooltip} placement="top">
                    {Icons[item?.name ? item.name : "none"]}
                  </Tooltip>
                </ToolbarButton>
              );
            })}
          </FlexibleWrapper>
        ) : (
          <>
            <ToolbarHeadingMenu>
              <Select
                options={[
                  { value: "Text", label: "Text" },
                  { value: items[0], label: "Heading 1" },
                  { value: items[1], label: "Heading 2" },
                  { value: items[2], label: "Heading 3" },
                  { value: items[3], label: "Heading 4" },
                  { value: items[4], label: "Heading 5" },
                  { value: items[5], label: "Heading 6" },
                ]}
                styles={customStyles}
                isSearchable={false}
                components={{ IndicatorSeparator }}
                value={
                  active_heading
                    ? {
                        value: active_heading,
                        label: `Heading ${active_heading?.attrs?.level}`,
                      }
                    : { value: "Text", label: "Text" }
                }
                onChange={v => this.call(v?.value, active_heading)}
              />
            </ToolbarHeadingMenu>
            <FlexibleWrapper>
              {[items[6], items[7], items[8]].map((item, index) => {
                if (!item) return;
                if (item?.name === "separator" && item.visible !== false) {
                  return <ToolbarSeparator key={index} />;
                }
                if (item?.visible === false || !item?.icon) {
                  return null;
                }

                const isActive = item?.active ? item.active(state) : false;

                return (
                  <ToolbarButton
                    key={index}
                    onClick={() => this.call(item, "")}
                    active={isActive}
                    style={{ paddingTop: "1px" }}
                  >
                    <Tooltip tooltip={item.tooltip} placement="top">
                      {Icons[item?.name ? item.name : "none"]}
                    </Tooltip>
                  </ToolbarButton>
                );
              })}
              <ToolbarButton onClick={() => this.pickImage("image", "")}>
                <Tooltip tooltip={"Add a image"} placement="top">
                  {Icons["image"]}
                </Tooltip>
              </ToolbarButton>
              {[
                items[9],
                items[10],
                items[11],
                items[12],
                items[13],
                items[14],
              ].map((item, index) => {
                if (!item) return;
                if (item?.name === "separator" && item?.visible !== false) {
                  return <ToolbarSeparator key={index} />;
                }
                if (item?.visible === false || !item?.icon) {
                  return null;
                }

                let isActive = item?.active ? item.active(state) : false;
                if (item.name === "link") {
                  if (rootState.linkMenuOpen) isActive = true;
                  else isActive = false;
                }

                let isDisabled = false;
                if (
                  (item?.name === "checkbox_list" ||
                    item?.name === "bullet_list" ||
                    item?.name === "ordered_list") &&
                  active_heading?.name === "heading"
                ) {
                  isDisabled = true;
                }

                return (
                  <ToolbarButton
                    key={index}
                    onClick={() => this.call(item, "")}
                    active={isActive}
                    disabled={isDisabled}
                  >
                    <Tooltip tooltip={item.tooltip} placement="top">
                      {Icons[item?.name ? item?.name : "none"]}
                    </Tooltip>
                  </ToolbarButton>
                );
              })}
              <ToolbarButton
                onClick={() => this.handleRemoveAllMark(active_heading)}
              >
                <Tooltip tooltip={"Remove formatting"} placement="top">
                  {Icons["removeFormat"]}
                </Tooltip>
              </ToolbarButton>
            </FlexibleWrapper>
          </>
        )}
      </div>
    );
  }
}

export default withTheme(ToolbarMenu);
