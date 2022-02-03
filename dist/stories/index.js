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
const theme_1 = require("../styles/theme");
const __1 = __importDefault(require(".."));
const react_1 = require("@chakra-ui/react");
const customTheme_1 = __importDefault(require("../styles/customTheme"));
class YoutubeEmbed extends React.Component {
    render() {
        const { attrs } = this.props;
        const videoId = attrs.matches[1];
        return (React.createElement("iframe", { className: this.props.isSelected ? "ProseMirror-selectednode" : "", src: `https://www.youtube.com/embed/${videoId}?modestbranding=2` }));
    }
}
const embeds = [
    {
        title: "YouTube",
        keywords: "youtube video tube google",
        defaultHidden: true,
        icon: () => (React.createElement("img", { src: "https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg", width: 24, height: 24 })),
        matcher: url => {
            return url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i);
        },
        component: YoutubeEmbed,
    },
];
function Example() {
    const d = false;
    const { body } = document;
    if (body)
        body.style.backgroundColor = d ? theme_1.dark.background : theme_1.light.background;
    return (React.createElement(react_1.ChakraProvider, { theme: customTheme_1.default },
        React.createElement(__1.default, { disableExtensions: ["table", "container_notice", "hr", "highlight"], uploadImage: file => {
                console.log("File upload triggered: ", file);
                return new Promise(resolve => {
                    setTimeout(() => resolve(URL.createObjectURL(file)), 1500);
                });
            }, dark: d, embeds: embeds, onChange: e => console.log(e()), styledEditor: {
                padding: "10px 20px 150px 30px",
                height: "calc(100vh - 140px)",
                overflowWrap: "break-word",
            } })));
}
exports.default = Example;
//# sourceMappingURL=index.js.map