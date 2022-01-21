"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const prosemirror_utils_1 = require("prosemirror-utils");
const outline_icons_1 = require("outline-icons");
const styled_components_1 = __importStar(require("styled-components"));
const isUrl_1 = __importDefault(require("../lib/isUrl"));
const Flex_1 = __importDefault(require("./Flex"));
const ToolbarButton_1 = __importDefault(require("./ToolbarButton"));
const LinkSearchResult_1 = __importDefault(require("./LinkSearchResult"));
const EInputField_1 = __importDefault(require("./EInputField"));
class LinkEditor extends React.Component {
    constructor(props) {
        super(props);
        this.discardInputValue = false;
        this.initialValue = this.href;
        this.initialSelectionLength = this.props.to - this.props.from;
        this.state = {
            selectedIndex: -1,
            value: this.href,
            previousValue: "",
            results: {},
            title: "",
        };
        this.componentWillUnmount = () => {
            if (this.discardInputValue) {
                return;
            }
            if (this.state.value === this.initialValue) {
                return;
            }
            const href = (this.state.value || "").trim();
            if (!href) {
                return this.handleRemoveLink();
            }
            this.save(href, href);
            document.removeEventListener("mousedown", this.handleClickOutside);
        };
        this.handleClickOutside = event => {
            var _a, _b;
            if (this.wrapperRef && !((_b = (_a = this.wrapperRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.contains(event.target))) {
                const { value } = this.state;
                if (!value.trim()) {
                    this.handleRemoveLink();
                }
            }
        };
        this.save = (href, title) => {
            href = href.trim();
            if (href.length === 0)
                return;
            this.discardInputValue = true;
            const { from, to } = this.props;
            if (!isUrl_1.default(href) &&
                !href.startsWith("/") &&
                !href.startsWith("#") &&
                !href.startsWith("mailto:")) {
                href = `https://${href}`;
            }
            this.props.onSelectLink({
                href,
                title,
                from: from ? from : this.from,
                to: to ? to : this.to,
            });
        };
        this.handleKeyDown = (event) => {
            switch (event.key) {
                case "Enter": {
                    event.preventDefault();
                    this.handleEnterKey();
                }
                case "Escape": {
                    event.preventDefault();
                    if (this.initialValue) {
                        this.setState({ value: this.initialValue }, this.moveSelectionToEnd);
                    }
                    else {
                        this.handleRemoveLink();
                    }
                    return;
                }
                case "ArrowUp": {
                    if (event.shiftKey)
                        return;
                    event.preventDefault();
                    event.stopPropagation();
                    const prevIndex = this.state.selectedIndex - 1;
                    this.setState({
                        selectedIndex: Math.max(-1, prevIndex),
                    });
                    return;
                }
                case "ArrowDown":
                    if (event.shiftKey)
                        return;
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
        this.handleEnterKey = () => {
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
                }
                else if (onCreateLink && selectedIndex === results.length) {
                    this.handleCreateLink(this.suggestedLinkTitle);
                }
            }
            else {
                if (title)
                    this.save(value, title);
                else
                    this.save(value, title);
            }
            if (this.initialSelectionLength) {
                this.moveSelectionToEnd();
            }
            return;
        };
        this.handleFocusLink = (selectedIndex) => {
            this.setState({ selectedIndex });
        };
        this.handleChange = async (event) => {
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
                        results: Object.assign(Object.assign({}, state.results), { [trimmedValue]: results }),
                        previousValue: trimmedValue,
                    }));
                }
                catch (error) {
                    console.error(error);
                }
            }
        };
        this.handlePaste = () => {
            setTimeout(() => this.save(this.state.value, this.state.value), 0);
        };
        this.handleOpenLink = (event) => {
            event.preventDefault();
            this.props.onClickLink(this.href, event);
        };
        this.handleCreateLink = (value) => {
            this.discardInputValue = true;
            const { onCreateLink } = this.props;
            value = value.trim();
            if (value.length === 0)
                return;
            if (onCreateLink)
                return onCreateLink(value);
        };
        this.handleRemoveLink = () => {
            this.discardInputValue = true;
            const { from, to, mark, view, onRemoveLink } = this.props;
            const { state, dispatch } = this.props.view;
            if (mark) {
                dispatch(state.tr.removeMark(from, to, mark));
            }
            if (onRemoveLink) {
            }
            view.focus();
        };
        this.handleSelectLink = (url, title) => event => {
            event.preventDefault();
            this.save(url, title);
            if (this.initialSelectionLength) {
                this.moveSelectionToEnd();
            }
        };
        this.moveSelectionToEnd = () => {
            const { to, view } = this.props;
            const { state, dispatch } = view;
            dispatch(prosemirror_utils_1.setTextSelection(to)(state.tr));
            view.focus();
        };
        this.handleRemoveLinkViaProp = () => {
            const { onRemoveLink } = this.props;
            if (onRemoveLink) {
                onRemoveLink();
                this.handleRemoveLink();
            }
        };
        this.wrapperRef = React.createRef();
        this.inputSubmit = React.createRef();
        this.from = 0;
        this.to = 0;
    }
    get href() {
        return this.props.mark ? this.props.mark.attrs.href : "";
    }
    get suggestedLinkTitle() {
        const { state } = this.props.view;
        const { value } = this.state;
        const selectionText = state.doc.cut(state.selection.from, state.selection.to).textContent;
        return value.trim() || selectionText.trim();
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    render() {
        const { dictionary, theme, fromCommandMenu, from, to } = this.props;
        const { value, selectedIndex, title } = this.state;
        const results = this.state.results[value.trim()] ||
            this.state.results[this.state.previousValue] ||
            [];
        const Tooltip = this.props.tooltip;
        const looksLikeUrl = value.match(/^https?:\/\//i);
        const suggestedLinkTitle = this.suggestedLinkTitle;
        const showCreateLink = !!this.props.onCreateLink &&
            !(suggestedLinkTitle === this.initialValue) &&
            suggestedLinkTitle.length > 0 &&
            !looksLikeUrl;
        const showResults = !!suggestedLinkTitle && (showCreateLink || results.length > 0);
        if (from > 0 && to > 0) {
            this.from = from;
            this.to = to;
        }
        return (React.createElement(Wrapper, { style: fromCommandMenu
                ? {
                    padding: "29px 20px",
                    borderRadius: "20px",
                }
                : {} }, fromCommandMenu ? (React.createElement("div", { ref: this.wrapperRef, style: {
                display: "flex",
                flexDirection: "column",
                width: "100%",
            } },
            React.createElement(EInputField_1.default, { type: "text", label: "Title", inputMode: "text", isDisabled: false, placeholder: "Title", autoComplete: undefined, name: "Title", leftIcon: undefined, value: title, onChange: e => this.setState({ title: e.target.value }), rightIcon: undefined, error: undefined, isInvalid: undefined, isReadOnly: undefined, isRequired: undefined, maxCharacters: "100", isFullWidth: undefined, isAutoFocus: true }),
            React.createElement("div", { style: { marginTop: "20px" } }),
            React.createElement(EInputField_1.default, { ref: this.inputSubmit, type: "url", label: "URL", inputMode: "url", isDisabled: false, placeholder: showCreateLink
                    ? dictionary.findOrCreateDoc
                    : dictionary.searchOrPasteLink, autoComplete: undefined, name: "Url", leftIcon: undefined, value: value, onChange: this.handleChange, onKeyDown: this.handleKeyDown, onPaste: this.handlePaste, rightIcon: undefined, error: undefined, isInvalid: undefined, isReadOnly: undefined, isRequired: undefined, maxCharacters: "100", isFullWidth: undefined, isAutoFocus: false }),
            React.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "21px",
                } },
                React.createElement("button", { style: {
                        padding: "5px 10px",
                        backgroundColor: "transparent",
                        borderRadius: "5px",
                        outline: "none",
                        border: "none",
                        height: "30px",
                    }, onClick: () => this.props.onRemoveLink && this.props.onRemoveLink() }, "Cancel"),
                React.createElement("button", { onClick: () => {
                        this.handleEnterKey();
                    }, style: {
                        padding: "5px 10px",
                        backgroundColor: "transparent",
                        borderRadius: "5px",
                        outline: "none",
                        border: "none",
                        height: "30px",
                    } }, "Save")))) : (React.createElement("div", { style: { display: "flex", alignItems: "center" }, ref: this.wrapperRef },
            React.createElement(EInputField_1.default, { ref: this.inputSubmit, type: "url", label: "URL", inputMode: "url", isDisabled: false, placeholder: showCreateLink
                    ? dictionary.findOrCreateDoc
                    : dictionary.searchOrPasteLink, autoComplete: undefined, name: "Url", leftIcon: undefined, value: value, onChange: this.handleChange, onKeyDown: this.handleKeyDown, onPaste: this.handlePaste, rightIcon: undefined, error: undefined, isInvalid: undefined, isReadOnly: undefined, isRequired: undefined, maxCharacters: "100", isFullWidth: undefined, isAutoFocus: true }),
            React.createElement(ToolbarButton_1.default, { onClick: this.handleEnterKey, disabled: !value },
                React.createElement(Tooltip, { tooltip: dictionary.openLink, placement: "top" },
                    React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { d: "M5 7V11H18.17L14.59 7.41L16 6L22 12L16 18L14.59 16.59L18.17 13H3V7H5Z", fill: `${theme.iconDefault}` })))),
            React.createElement(ToolbarButton_1.default, { onClick: this.handleOpenLink, disabled: !value },
                React.createElement(Tooltip, { tooltip: dictionary.openLink, placement: "top" },
                    React.createElement(outline_icons_1.OpenIcon, { color: theme.iconDefault }))),
            React.createElement(ToolbarButton_1.default, { onClick: this.handleRemoveLink },
                React.createElement(Tooltip, { tooltip: dictionary.removeLink, placement: "top" }, this.initialValue ? (React.createElement(outline_icons_1.TrashIcon, { color: theme.iconDefault })) : (React.createElement(outline_icons_1.CloseIcon, { color: theme.iconDefault })))),
            showResults && false && (React.createElement(SearchResults, { id: "link-search-results" },
                results.map((result, index) => (React.createElement(LinkSearchResult_1.default, { key: result.url, title: result.title, subtitle: result.subtitle, icon: React.createElement(outline_icons_1.DocumentIcon, { color: theme.toolbarItem }), onMouseOver: () => this.handleFocusLink(index), onClick: this.handleSelectLink(result.url, result.title), selected: index === selectedIndex }))),
                showCreateLink && (React.createElement(LinkSearchResult_1.default, { key: "create", title: suggestedLinkTitle, subtitle: dictionary.createNewDoc, icon: React.createElement(outline_icons_1.PlusIcon, { color: theme.toolbarItem }), onMouseOver: () => this.handleFocusLink(results.length), onClick: () => {
                        this.handleCreateLink(suggestedLinkTitle);
                        if (this.initialSelectionLength) {
                            this.moveSelectionToEnd();
                        }
                    }, selected: results.length === selectedIndex }))))))));
    }
}
const Wrapper = styled_components_1.default(Flex_1.default) `
  margin-left: -8px;
  margin-right: -8px;
  min-width: 336px;
  pointer-events: all;
  background: ${props => props.theme.toolbarBackground};
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: ${props => props.theme.ModalBoxShadow};
`;
const SearchResults = styled_components_1.default.ol `
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
exports.default = styled_components_1.withTheme(LinkEditor);
//# sourceMappingURL=LinkEditor.js.map