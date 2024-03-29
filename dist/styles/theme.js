"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dark = exports.light = exports.base = void 0;
const colors = {
    almostBlack: "#181A1B",
    lightBlack: "#2F3336",
    almostWhite: "#E6E6E6",
    white: "#FFF",
    white10: "rgba(255, 255, 255, 0.1)",
    white20: "rgba(255, 255, 255, 0.2)",
    black: "#000",
    black10: "rgba(0, 0, 0, 0.1)",
    black20: "rgba(0, 0, 0, 0.2)",
    primary: "#1AB6FF",
    greyLight: "#F4F7FA",
    grey: "#E8EBED",
    greyMid: "#C5CCD3",
    greyDark: "#DAE1E9",
    f0f0f0: "#F0F0F0",
    iconDefault: "#733D47",
    iconDefaultDark: "#BF9B9B",
    el200: "#F2D8D5",
    el100: "#733D47",
    ed200: "#BF9B9B",
    eae3e3: "#EAE3E3",
    hel200: "rgba(242, 216, 213, 0.4)",
    hed200: "rgba(191, 155, 155, 0.3)",
    textLight: "#111",
};
exports.base = Object.assign(Object.assign({}, colors), { fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen, Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif", fontFamilyMono: "'SFMono-Regular',Consolas,'Liberation Mono', Menlo, Courier,monospace", fontWeight: 400, zIndex: 100, link: colors.primary, placeholder: "#B1BECC", textSecondary: "#4E5C6E", textLight: colors.white, textHighlight: "#b3e7ff", textHighlightForeground: colors.black, selected: colors.primary, codeComment: "#6a737d", codePunctuation: "#5e6687", codeNumber: "#d73a49", codeProperty: "#c08b30", codeTag: "#3d8fd1", codeString: "#032f62", codeSelector: "#6679cc", codeAttr: "#c76b29", codeEntity: "#22a2c9", codeKeyword: "#d73a49", codeFunction: "#6f42c1", codeStatement: "#22a2c9", codePlaceholder: "#3d8fd1", codeInserted: "#202746", codeImportant: "#c94922", noticeInfoBackground: "#F5BE31", noticeInfoText: colors.almostBlack, noticeTipBackground: "#9E5CF7", noticeTipText: colors.white, noticeWarningBackground: "#FF5C80", noticeWarningText: colors.white });
exports.light = Object.assign(Object.assign({}, exports.base), { background: colors.white, text: colors.almostBlack, code: colors.lightBlack, cursor: colors.black, divider: colors.greyMid, color: colors.black, hover: colors.white10, hover20: colors.hel200, e200: colors.el200, toolbarBackground: colors.white, toolbarBackgroundT: colors.white10, linkToolbarBackground: colors.black, toolbarHoverBackground: colors.black, toolbarInput: colors.white10, toolbarItem: colors.black, linkEditorBoarderColor: colors.el100, linkEditorTextColor: colors.textLight, tableDivider: colors.greyMid, tableSelected: colors.primary, tableSelectedBackground: "#E5F7FF", quote: colors.greyDark, codeBackground: colors.greyLight, codeBorder: colors.grey, horizontalRule: colors.greyMid, imageErrorBackground: colors.greyLight, scrollbarBackground: colors.greyLight, scrollbarThumb: colors.greyMid, inputBorder: colors.f0f0f0, iconDefault: colors.iconDefault, ModalBoxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", blockToolbarBackground: colors.white, blockToolbarTrigger: colors.greyMid, blockToolbarTriggerIcon: colors.white, blockToolbarItem: colors.almostBlack, blockToolbarIcon: colors.black, blockToolbarIconSelected: colors.black, blockToolbarText: colors.almostBlack, blockToolbarTextSelected: colors.black, blockToolbarSelectedBackground: colors.el200, blockToolbarHoverBackground: colors.hel200, blockToolbarDivider: colors.greyMid, blockTextSecondary: colors.black });
exports.dark = Object.assign(Object.assign({}, exports.base), { background: colors.black, text: colors.white, code: colors.almostWhite, cursor: colors.white, divider: "#4E5C6E", placeholder: "#52657A", color: colors.white, hover: colors.black10, hover20: colors.hed200, e200: colors.ed200, toolbarBackground: colors.black, toolbarBackgroundT: colors.greyMid, linkToolbarBackground: colors.white, toolbarHoverBackground: colors.greyMid, toolbarInput: colors.black10, toolbarItem: colors.lightBlack, linkEditorBoarderColor: colors.ed200, linkEditorTextColor: colors.white, tableDivider: colors.lightBlack, tableSelected: colors.primary, tableSelectedBackground: "#002333", quote: colors.greyDark, codeBackground: colors.black, codeBorder: colors.lightBlack, codeString: "#3d8fd1", horizontalRule: colors.lightBlack, imageErrorBackground: "rgba(0, 0, 0, 0.5)", scrollbarBackground: colors.black, scrollbarThumb: colors.lightBlack, inputBorder: colors.f0f0f0, iconDefault: colors.iconDefaultDark, ModalBoxShadow: "0px 0px 10px rgba(255, 255, 255, 0.2)", blockToolbarBackground: colors.black, blockToolbarTrigger: colors.greyMid, blockToolbarTriggerIcon: colors.black, blockToolbarItem: colors.almostWhite, blockToolbarIcon: colors.white, blockToolbarIconSelected: colors.white, blockToolbarText: colors.almostWhite, blockToolbarTextSelected: colors.white, blockToolbarSelectedBackground: colors.ed200, blockToolbarHoverBackground: colors.hed200, blockToolbarDivider: colors.greyMid, blockTextSecondary: colors.white });
exports.default = exports.light;
//# sourceMappingURL=theme.js.map