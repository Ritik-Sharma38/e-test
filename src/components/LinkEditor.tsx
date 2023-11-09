import * as React from "react";
import { setTextSelection } from "prosemirror-utils";
import { EditorView } from "prosemirror-view";
import { Mark } from "prosemirror-model";
import {
  DocumentIcon,
  CloseIcon,
  PlusIcon,
  TrashIcon,
  OpenIcon,
} from "outline-icons";
import styled, { withTheme } from "styled-components";
import isUrl from "../lib/isUrl";
import theme from "../styles/theme";
import Flex from "./Flex";
import ToolbarButton from "./ToolbarButton";
import LinkSearchResult from "./LinkSearchResult";
import baseDictionary from "../dictionary";
import EInput from "./EInputField";

export type SearchResult = {
  title: string;
  subtitle?: string;
  url: string;
};

type Props = {
  mark?: Mark;
  from: number;
  to: number;
  tooltip: typeof React.Component | React.FC<any>;
  dictionary: typeof baseDictionary;
  onRemoveLink?: () => void;
  onCreateLink?: (title: string) => Promise<void>;
  onSearchLink?: (term: string) => Promise<SearchResult[]>;
  onSelectLink: (options: {
    href: string;
    title?: string;
    from: number;
    to: number;
  }) => void;
  onClickLink: (href: string, event: MouseEvent) => void;
  onShowToast?: (message: string, code: string) => void;
  view: EditorView;
  theme: typeof theme;
  fromCommandMenu: boolean;
  mobile: any;
  isios: boolean;
};

type State = {
  results: {
    [keyword: string]: SearchResult[];
  };
  value: string;
  title: string;
  previousValue: string;
  selectedIndex: number;
};

class LinkEditor extends React.Component<Props, State> {
  discardInputValue = false;
  initialValue = this.href;
  initialSelectionLength = this.props.to - this.props.from;
  wrapperRef: any;
  setWrapperRef: any;
  inputSubmit: any;
  from: number;
  to: number;

  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.inputSubmit = React.createRef();
    this.from = 0;
    this.to = 0;
  }

  state: State = {
    selectedIndex: -1,
    value: this.href,
    previousValue: "",
    results: {},
    title: "",
  };

  get href(): string {
    return this.props.mark ? this.props.mark.attrs.href : "";
  }

  get suggestedLinkTitle(): string {
    const { state } = this.props.view;
    const { value } = this.state;
    const selectionText = state.doc.cut(
      state.selection.from,
      state.selection.to
    ).textContent;

    return value.trim() || selectionText.trim();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount = () => {
    // If we discarded the changes then nothing to do
    if (this.discardInputValue) {
      return;
    }

    // If the link is the same as it was when the editor opened, nothing to do
    if (this.state.value === this.initialValue) {
      return;
    }

    // If the link is totally empty or only spaces then remove the mark
    const href = (this.state.value || "").trim();
    if (!href) {
      return this.handleRemoveLink();
    }

    this.save(href, href);

    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  componentDidUpdate = (prevProps: any) => {
    if (prevProps?.mark?.attrs?.href !== this.props.mark?.attrs?.href) {
      this.setState({ value: this.props.mark?.attrs?.href });
    }
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef?.current?.contains(event.target)) {
      const { value } = this.state;
      if (!value.trim()) {
        this.tempRemoveLink();
      }
    }
  };

  save = (href: string, title?: string): void => {
    href = href.trim();

    if (href.length === 0) return;

    this.discardInputValue = true;
    const { from, to } = this.props;

    // Make sure a protocol is added to the beginning of the input if it's
    // likely an absolute URL that was entered without one.
    if (
      !isUrl(href) &&
      !href.startsWith("/") &&
      !href.startsWith("#") &&
      !href.startsWith("mailto:")
    ) {
      href = `https://${href}`;
    }

    this.props.onSelectLink({
      href,
      title,
      from: from ? from : this.from,
      to: to ? to : this.to,
    });
  };

  handleKeyDown = (event: React.KeyboardEvent): void => {
    switch (event.key) {
      case "Enter": {
        event.preventDefault();
        this.handleEnterKey();
      }

      case "Escape": {
        event.preventDefault();

        if (this.initialValue) {
          this.setState({ value: this.initialValue }, this.moveSelectionToEnd);
        } else {
          this.handleRemoveLink();
        }
        return;
      }

      case "ArrowUp": {
        if (event.shiftKey) return;
        event.preventDefault();
        event.stopPropagation();
        const prevIndex = this.state.selectedIndex - 1;

        this.setState({
          selectedIndex: Math.max(-1, prevIndex),
        });
        return;
      }

      case "ArrowDown":
        if (event.shiftKey) return;
      case "Tab": {
        event.preventDefault();
        event.stopPropagation();
        const { selectedIndex, value } = this.state;
        const results = this.state.results[value] || [];
        const total = results.length;
        const nextIndex = selectedIndex + 1;

        this.setState({
          selectedIndex: Math.min(nextIndex, total),
        });
        return;
      }
    }
  };

  handleEnterKey = () => {
    const { selectedIndex, value, title } = this.state;
    if (!value.trim()) {
      this.handleRemoveLink();
    }
    const results = this.state.results[value] || [];
    const { onCreateLink } = this.props;

    if (selectedIndex >= 0) {
      const result = results[selectedIndex];
      if (result) {
        this.save(result.url, result.title);
      } else if (onCreateLink && selectedIndex === results.length) {
        this.handleCreateLink(this.suggestedLinkTitle);
      }
    } else {
      // saves the raw input as href
      if (title) this.save(value, title);
      else this.save(value, title);
    }

    if (this.initialSelectionLength) {
      this.moveSelectionToEnd();
    }

    return;
  };

  handleFocusLink = (selectedIndex: number) => {
    this.setState({ selectedIndex });
  };

  handleChange = async (event): Promise<void> => {
    const value = event.target.value;

    const trimmedValue = value.trim();

    this.setState({
      value: trimmedValue,
      selectedIndex: -1,
    });

    if (trimmedValue && this.props.onSearchLink) {
      try {
        const results = await this.props.onSearchLink(trimmedValue);
        this.setState(state => ({
          results: {
            ...state.results,
            [trimmedValue]: results,
          },
          previousValue: trimmedValue,
        }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  handlePaste = (): void => {
    setTimeout(() => this.save(this.state.value, this.state.value), 0);
  };

  handleOpenLink = (event, isios): void => {
    event.preventDefault();
    try {
      if (isios) {
        // window?.webkit?.messageHandlers.onClickLink.postMessage(
        //   this.state.value
        // );
      }
    } catch (e) {
      console.log("Error");
    }
    this.props.onClickLink(this.state.value, event);
  };

  handleCreateLink = (value: string) => {
    this.discardInputValue = true;
    const { onCreateLink } = this.props;

    value = value.trim();
    if (value.length === 0) return;

    if (onCreateLink) return onCreateLink(value);
  };

  handleRemoveLink = (): void => {
    this.discardInputValue = true;

    const { from, to, mark, view } = this.props;
    const { state, dispatch } = this.props.view;

    if (mark && false) {
      dispatch(state.tr.removeMark(from, to, mark));
    }

    /* if (onRemoveLink) {
        onRemoveLink();
    } */

    view.focus();
  };

  tempRemoveLink = (): void => {
    this.discardInputValue = true;

    const { from, to, mark, view } = this.props;
    const { state, dispatch } = this.props.view;

    if (mark) {
      dispatch(state.tr.removeMark(from, to, mark));
    }

    view.focus();
  };

  handleSelectLink = (url: string, title: string) => event => {
    event.preventDefault();
    this.save(url, title);

    if (this.initialSelectionLength) {
      this.moveSelectionToEnd();
    }
  };

  moveSelectionToEnd = () => {
    const { to, view } = this.props;
    const { state, dispatch } = view;
    dispatch(setTextSelection(to)(state.tr));
    view.focus();
  };

  handleRemoveLinkViaProp = () => {
    const { onRemoveLink } = this.props;
    this.tempRemoveLink();
    if (onRemoveLink) {
      onRemoveLink();
    }
  };

  render() {
    const { dictionary, theme, fromCommandMenu, from, to, mobile, isios } = this.props;
    const { value, selectedIndex, title } = this.state;
    const results =
      this.state.results[value.trim()] ||
      this.state.results[this.state.previousValue] ||
      [];

    const Tooltip = this.props.tooltip;
    const looksLikeUrl = value.match(/^https?:\/\//i);

    const suggestedLinkTitle = this.suggestedLinkTitle;

    const showCreateLink =
      !!this.props.onCreateLink &&
      !(suggestedLinkTitle === this.initialValue) &&
      suggestedLinkTitle.length > 0 &&
      !looksLikeUrl;

    const showResults =
      !!suggestedLinkTitle && (showCreateLink || results.length > 0);

    if (from > 0 && to > 0) {
      this.from = from;
      this.to = to;
    }

    return (
      <Wrapper
        style={
          fromCommandMenu
            ? {
                padding: "29px 20px",
                borderRadius: "20px",
            }
            : {}
        }
      >
        {fromCommandMenu ? (
          <div
            ref={this.wrapperRef}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <input
              onChange={e => this.setState({ title: e.target.value })}
              type="text"
              placeholder="Title"
              value={title}
              style={{
                height: "52px",
                border: "1.5px solid",
                borderColor: this.props.theme.linkEditorBoarderColor,
                paddingLeft: "12px",
                fontSize: "16px",
                color: this.props.theme.linkEditorTextColor,
                borderRadius: "10px",
                backgroundColor: "transparent",
                width: "100%",
              }}
            />
            <div style={{ marginTop: "20px" }} />
            <input
              ref={this.inputSubmit}
              type="url"
              placeholder={
                showCreateLink
                  ? dictionary.findOrCreateDoc
                  : dictionary.searchOrPasteLink
              }
              value={value}
              style={{
                height: "52px",
                border: "1.5px solid",
                borderColor: this.props.theme.linkEditorBoarderColor,
                paddingLeft: "12px",
                fontSize: "16px",
                color: this.props.theme.linkEditorTextColor,
                borderRadius: "10px",
                backgroundColor: "transparent",
                width: "100%",
              }}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              onPaste={this.handlePaste}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "21px",
              }}
            >
              <button
                style={{
                  padding: "5px 10px",
                  backgroundColor: "transparent",
                  borderRadius: "5px",
                  outline: "none",
                  border: "none",
                  height: "30px",
                  color: this.props.theme.color,
                }}
                onClick={() => this.handleRemoveLinkViaProp()}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  this.handleEnterKey();
                }}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "transparent",
                  borderRadius: "5px",
                  outline: "none",
                  border: "none",
                  height: "30px",
                  color: this.props.theme.color,
                }}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <DivWrapper
            ref={this.wrapperRef}
            style={mobile ? { flexDirection: "column", width: "100%" } : {}}
          >
            <input
              ref={this.inputSubmit}
              type="url"
              placeholder={
                showCreateLink
                  ? dictionary.findOrCreateDoc
                  : dictionary.searchOrPasteLink
              }
              value={value}
              style={{
                height: "52px",
                border: "1.5px solid",
                borderColor: this.props.theme.linkEditorBoarderColor,
                paddingLeft: "12px",
                fontSize: "16px",
                color: this.props.theme.linkEditorTextColor,
                borderRadius: "10px",
                backgroundColor: "transparent",
                width: "100%",
              }}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              onPaste={this.handlePaste}
            />
            <DivWrapper2>
              <ToolbarButton onClick={this.handleEnterKey} disabled={!value}>
                <Tooltip tooltip={dictionary.openLink} placement="top">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 7V11H18.17L14.59 7.41L16 6L22 12L16 18L14.59 16.59L18.17 13H3V7H5Z"
                      fill={`${theme.iconDefault}`}
                    />
                  </svg>
                </Tooltip>
              </ToolbarButton>
              {this.href && (
                <ToolbarButton
                  onClick={(e: any) => this.handleOpenLink(e, isios)}
                  disabled={!value}
                >
                  <Tooltip tooltip={dictionary.openLink} placement="top">
                    <OpenIcon color={theme.iconDefault} />
                  </Tooltip>
                </ToolbarButton>
              )}
              <ToolbarButton onClick={this.handleRemoveLinkViaProp}>
                <Tooltip tooltip={dictionary.removeLink} placement="top">
                  {this.initialValue ? (
                    <TrashIcon color={theme.iconDefault} />
                  ) : (
                    <CloseIcon color={theme.iconDefault} />
                  )}
                </Tooltip>
              </ToolbarButton>
            </DivWrapper2>

            {showResults && false && (
              <SearchResults id="link-search-results">
                {results.map((result, index) => (
                  <LinkSearchResult
                    key={result.url}
                    title={result.title}
                    subtitle={result.subtitle}
                    icon={<DocumentIcon color={theme.toolbarItem} />}
                    onMouseOver={() => this.handleFocusLink(index)}
                    onClick={this.handleSelectLink(result.url, result.title)}
                    selected={index === selectedIndex}
                  />
                ))}

                {showCreateLink && (
                  <LinkSearchResult
                    key="create"
                    title={suggestedLinkTitle}
                    subtitle={dictionary.createNewDoc}
                    icon={<PlusIcon color={theme.toolbarItem} />}
                    onMouseOver={() => this.handleFocusLink(results.length)}
                    onClick={() => {
                      this.handleCreateLink(suggestedLinkTitle);

                      if (this.initialSelectionLength) {
                        this.moveSelectionToEnd();
                      }
                    }}
                    selected={results.length === selectedIndex}
                  />
                )}
              </SearchResults>
            )}
          </DivWrapper>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled(Flex)`
  margin-left: -8px;
  margin-right: -8px;
  min-width: 336px;
  pointer-events: all;
  background: ${props => props.theme.toolbarBackground};
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: ${props => props.theme.ModalBoxShadow};
  @media (hover: none) and (pointer: coarse) {
    &:before {
      display: none;
    }
    min-width: unset;
  }
`;

const DivWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (hover: none) and (pointer: coarse) {
    flex-direction: column;
    width: 100%;
  }
`;

const DivWrapper2 = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  @media (hover: none) and (pointer: coarse) {
    margin-left: 0;
  }
`;

const SearchResults = styled.ol`
  background: ${props => props.theme.linkToolbarBackground};
  position: absolute;
  top: 100%;
  width: 100%;
  height: auto;
  left: 0;
  padding: 4px 8px 8px;
  margin: 0;
  margin-top: -3px;
  margin-bottom: 0;
  border-radius: 0 0 4px 4px;
  overflow-y: auto;
  max-height: 25vh;

  @media (hover: none) and (pointer: coarse) {
    position: fixed;
    top: auto;
    bottom: 40px;
    border-radius: 0;
    max-height: 50vh;
    padding: 8px 8px 4px;
  }
`;

export default withTheme(LinkEditor);
