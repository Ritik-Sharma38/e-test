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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const LinkEditor_1 = __importDefault(require("./LinkEditor"));
const createAndInsertLink_1 = __importDefault(require("../commands/createAndInsertLink"));
const FloatingToolbarTemp_1 = __importDefault(require("./FloatingToolbarTemp"));
function isActive(props) {
    const { view } = props;
    const { selection } = view.state;
    try {
        const paragraph = view.domAtPos(selection.from);
        return props.isActive && !!paragraph.node;
    }
    catch (err) {
        return false;
    }
}
class LinkToolbar extends React.Component {
    constructor() {
        super(...arguments);
        this.menuRef = React.createRef();
        this.state = {
            left: -1000,
            top: undefined,
        };
        this.handleClickOutside = ev => {
            var _a, _b;
            if (ev.target &&
                this.menuRef.current &&
                ((_b = (_a = this.menuRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.contains(ev.target))) {
                return;
            }
        };
        this.handleOnCreateLink = async (title) => {
            const { dictionary, onCreateLink, view, onClose, onShowToast } = this.props;
            onClose();
            this.props.view.focus();
            if (!onCreateLink) {
                return;
            }
            const { dispatch, state } = view;
            const { from, to } = state.selection;
            if (from !== to) {
                return;
            }
            const href = `creating#${title}…`;
            dispatch(view.state.tr
                .insertText(title, from, to)
                .addMark(from, to + title.length, state.schema.marks.link.create({ href })));
            (0, createAndInsertLink_1.default)(view, title, href, {
                onCreateLink,
                onShowToast,
                dictionary,
            });
        };
        this.handleOnSelectLink = ({ href, title, from, to, }) => {
            const { view, onClose } = this.props;
            onClose();
            this.props.view.focus();
            const { dispatch, state } = view;
            if (from !== to) {
                return;
            }
            dispatch(view.state.tr
                .insertText(title, from, to)
                .addMark(from, to + title.length, state.schema.marks.link.create({ href })));
        };
    }
    componentDidMount() {
        window.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        window.removeEventListener("mousedown", this.handleClickOutside);
    }
    render() {
        const _a = this.props, { onCreateLink, onClose, view } = _a, rest = __rest(_a, ["onCreateLink", "onClose", "view"]);
        const { selection } = this.props.view.state;
        const active = isActive(this.props);
        return (React.createElement(FloatingToolbarTemp_1.default, Object.assign({ view: view, ref: this.menuRef, active: active }, rest, { fromCommandMenu: active }), active && (React.createElement(LinkEditor_1.default, Object.assign({ view: view, from: selection.from, to: selection.to, onCreateLink: onCreateLink ? this.handleOnCreateLink : undefined, onSelectLink: this.handleOnSelectLink, onRemoveLink: onClose, fromCommandMenu: true }, rest)))));
    }
}
exports.default = LinkToolbar;
//# sourceMappingURL=LinkToolbar.js.map