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
Object.defineProperty(exports, "__esModule", { value: true });
const icons_1 = require("@chakra-ui/icons");
const react_1 = require("@chakra-ui/react");
const react_2 = __importStar(require("react"));
const EInput = (_a) => {
    var { type, inputMode, name = type, label = name, value, onChange, placeholder = label, leftIcon, rightIcon, isFullWidth, error, isInvalid, isDisabled, isReadOnly, isRequired, autoComplete, maxCharacters, isAutoFocus } = _a, rest = __rest(_a, ["type", "inputMode", "name", "label", "value", "onChange", "placeholder", "leftIcon", "rightIcon", "isFullWidth", "error", "isInvalid", "isDisabled", "isReadOnly", "isRequired", "autoComplete", "maxCharacters", "isAutoFocus"]);
    const borderColor = react_1.useColorModeValue("#f0f0f0", "#2E2E2E");
    const errorBorderColor = react_1.useColorModeValue("red.e200", "red.e200");
    const focusBorderColor = react_1.useColorModeValue("#733D47", "#BF9B9B");
    const hoverBorderColor = react_1.useColorModeValue("#733D47", "#BF9B9B");
    const placeHolderColor = react_1.useColorModeValue("#D1D1D1", "#414141");
    const textColor = react_1.useColorModeValue("#111111", "#FFFFFF");
    const labelColor = react_1.useColorModeValue("#717171", "#C1C1C1");
    const labelBGColor = react_1.useColorModeValue("#FFFFFF", "#000000");
    const iconLeftColor = react_1.useColorModeValue("#D1D1D1", "#414141");
    const iconRightColor = react_1.useColorModeValue("#D1D1D1", "#B1B1B1");
    const [passwordVisible, setPasswordVisible] = react_2.useState(false);
    let handleToggle = e => {
        e.preventDefault();
    };
    switch (type) {
        case "text":
            inputMode = inputMode || "text";
            break;
        case "password":
            handleToggle = e => {
                e.preventDefault();
                setPasswordVisible(visibility => !visibility);
            };
            rightIcon = passwordVisible ? react_2.default.createElement(icons_1.ViewOffIcon, null) : react_2.default.createElement(icons_1.ViewIcon, null);
            break;
        case "email":
            inputMode = inputMode || "email";
            break;
        case "tel":
            inputMode = inputMode || "tel";
            break;
        case "url":
            inputMode = inputMode || "url";
            break;
        case "textarea":
            break;
        default:
            inputMode = "text";
            break;
    }
    return (react_2.default.createElement(react_1.Box, { position: "relative", mt: 2 },
        label && (react_2.default.createElement(react_1.FormLabel, { position: "absolute", top: "-1px", left: "12px", h: "20px", display: "block", fontSize: "14px", fontWeight: 500, color: labelColor, borderRadius: "5px", mr: "auto", px: "7px", bg: labelBGColor, zIndex: 2 }, label)),
        type === "textarea" && maxCharacters && (react_2.default.createElement(react_1.FormLabel, { position: "absolute", top: "-8px", right: "12px", display: "block", fontSize: "12px", fontWeight: 500, color: labelColor, borderRadius: "5px", mr: "auto", px: "7px", bg: labelBGColor, zIndex: 2 }, maxCharacters)),
        react_2.default.createElement(react_1.InputGroup, { w: isFullWidth ? "full" : "302px", maxW: "full" },
            leftIcon && (react_2.default.createElement(react_1.InputLeftElement, { pointerEvents: "none", color: iconLeftColor, h: "52px", mt: "2px", ml: 1 }, leftIcon)),
            type === "textarea" ? (react_2.default.createElement(react_1.Textarea, Object.assign({ resize: "none", name: name, w: isFullWidth ? "full" : "302px", maxW: "full", _focus: { borderColor: focusBorderColor, borderWidth: "2px" }, _hover: { borderColor: hoverBorderColor }, _invalid: { borderColor: errorBorderColor, borderWidth: "1.5px" }, _placeholder: {
                    color: placeHolderColor,
                    fontSize: "inherit",
                    fontWeight: "inherit",
                }, _disabled: { borderColor: borderColor }, autoComplete: autoComplete, border: "1.5px solid", borderColor: focusBorderColor, borderRadius: "10px", bg: "transparent", color: textColor, fontSize: "16px", fontWeight: 400, inputMode: inputMode, isDisabled: isDisabled, isInvalid: isInvalid || error, isRequired: isRequired, placeholder: placeholder, value: value, onChange: onChange }, rest))) : (react_2.default.createElement(react_1.Input, Object.assign({ name: name, type: type !== "password" ? type : passwordVisible ? "text" : "password", w: isFullWidth ? "full" : "302px", maxW: "full", h: "52px", _focus: { borderColor: focusBorderColor, borderWidth: "2px" }, _hover: { borderColor: hoverBorderColor }, _invalid: { borderColor: errorBorderColor, borderWidth: "1.5px" }, _placeholder: {
                    color: placeHolderColor,
                    fontSize: "inherit",
                    fontWeight: "inherit",
                }, _disabled: { borderColor: borderColor }, autoComplete: autoComplete, border: "1.5px solid", borderColor: focusBorderColor, borderRadius: "10px", bg: "transparent", color: textColor, fontSize: "16px", autoFocus: isAutoFocus, fontWeight: 400, inputMode: inputMode, isDisabled: isDisabled, isInvalid: isInvalid || error, isRequired: isRequired, placeholder: placeholder, value: value, onChange: onChange, paddingLeft: "12px" }, rest))),
            rightIcon && (react_2.default.createElement(react_1.InputRightElement, { h: "52px", color: iconRightColor, onClick: handleToggle }, rightIcon))),
        error && (react_2.default.createElement(react_1.Text, { mt: "10px", fontSize: "14px", lineHeight: "17px", fontWeight: "300", color: errorBorderColor }, error))));
};
exports.default = EInput;
//# sourceMappingURL=EInputField.js.map