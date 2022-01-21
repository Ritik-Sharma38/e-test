"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const theme_tools_1 = require("@chakra-ui/theme-tools");
const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};
const breakpoints = theme_tools_1.createBreakpoints({
    sm: "360px",
    sxm: "480px",
    md: "640px",
    mxd: "800px",
    xl: "1024px",
    xxl: "1280px",
    xxxl: "1440px",
    lg: "1920px",
});
const chakraTheme = react_1.extendTheme({
    config,
    breakpoints,
    colors: {
        primary: {
            light: {
                200: "#733D47",
                100: "#F2D8D5",
                _000: "#FFFFFF",
            },
            dark: {
                200: "#BF9B9B",
                100: "#F2D8D5",
                _000: "#000000",
            },
        },
        text: {
            light: {
                h1_body: "#111111",
                h2: "#414141",
                h3_captions: "#717171",
                subtext: "#909090",
                disabled: "#D1D1D1",
                outline: "#414141",
            },
            dark: {
                h1_body: "#FFFFFF",
                h2: "#E1E1E1",
                h3_captions: "#C1C1C1",
                subtext: "#B1B1B1",
                disabled: "#414141",
                outline: "#E1E1E1",
            },
        },
        backgrounds: {
            light: {
                e000: "#FFFFFF",
                e100: "#F4F4F4",
                e200: "#F7F7F7",
            },
            dark: {
                e000: "#000000",
                e100: "#101010",
                e200: "#202020",
            },
        },
        red: {
            e000: "#E63535",
            e100: "#FF3B3B",
            e200: "#FF5C5C",
            e300: "#FF8080",
            e400: "#FFE6E6",
            outline: "#FF3B3B",
        },
        green: {
            e000: "#05A660",
            e100: "#06c270",
            e200: "#39D98A",
            e300: "#57EBA1",
            e400: "#E3FFF1",
            outline: "#06C270",
        },
        blue: {
            e000: "#004FC4",
            e100: "#0063F7",
            e200: "#5B8DEF",
            e300: "#9DBFF9",
            e400: "#E5F0FF",
            outline: "#0063F7",
        },
        yellow: {
            e000: "#E6B800",
            e100: "#FFCC00",
            e200: "#FDDD48",
            e300: "#FDED72",
            e400: "#FFFEE6",
            outline: "#FFCC00",
        },
        orange: {
            e000: "#E67A00",
            e100: "#EF8800",
            e200: "#FDAC42",
            e300: "#FCCC75",
            e400: "#FFF8E6",
            outline: "#FF8800",
        },
        teal: {
            e000: "#00B7C4",
            e100: "#00CFDE",
            e200: "#73DFE7",
            e300: "#A9EFF2",
            e400: "#E6FFFF",
            outline: "#00CFDE",
        },
        purple: {
            e000: "#4D0099",
            e100: "#6600CC",
            e200: "#AC5DD9",
            e300: "#DDA5E9",
            e400: "#FFE6FF",
            outline: "#6600CC",
        },
    },
    components: {
        Text: {
            baseStyle: {},
            variants: {
                subtext: props => ({
                    color: theme_tools_1.mode("text.light.subtext", "text.dark.subtext")(props),
                    fontSize: "12px",
                }),
                h3: props => ({
                    color: theme_tools_1.mode("text.light.h3_captions", "text.dark.h3_captions")(props),
                }),
                h2: props => ({
                    color: theme_tools_1.mode("text.light.h2", "text.dark.h2")(props),
                    fontSize: "14px",
                    fontWeight: "bold",
                }),
                h1: props => ({
                    color: theme_tools_1.mode("text.light.h1", "text.dark.h1")(props),
                    fontSize: "14px",
                }),
            },
        },
        Textarea: {
            baseStyle: props => ({}),
        },
        Divider: {
            sizes: {
                drawer_mini: {
                    borderLeftWidth: "1px",
                    borderColor: "text.light.disabled",
                },
                note_bar: {
                    borderLeftWidth: "5px",
                    borderColor: "text.light.disabled",
                },
                underline: {
                    borderBottomWidth: "2px",
                    borderColor: "text.light.disabled",
                },
                primary: {
                    borderLeftWidth: "2px",
                    borderColor: "text.light.disabled",
                },
            },
        },
        Button: {
            baseStyle: props => ({
                bg: theme_tools_1.mode("primary.light.200", "primary.dark.200")(props),
                color: theme_tools_1.mode("primary.light._000", "primary.dark._000")(props),
                fontSize: "18px",
                h: "32px",
                p: "5px 10px",
                borderRadius: "5px",
                _hover: {
                    bg: theme_tools_1.mode(theme_tools_1.darken("primary.light.200", 10), theme_tools_1.whiten("primary.dark.200", 10))(props),
                },
            }),
            sizes: {
                sm: {
                    h: "43px",
                },
                sxm: {
                    minWidth: "72px",
                    fontSize: "14px",
                    fontWeight: "normal",
                },
                md: {
                    fontSize: "16px",
                    fontWeight: "500",
                    fontStyle: "normal",
                },
            },
            variants: {
                primary: props => ({
                    fill: theme_tools_1.mode("primary.light._000", "primary.dark._000")(props),
                }),
                secondary: props => ({
                    bg: "transparent",
                    border: "1px solid",
                    borderColor: theme_tools_1.mode("primary.light.200", "primary.dark.200")(props),
                    color: theme_tools_1.mode("primary.light.200", "primary.dark.200")(props),
                    _hover: {
                        bg: theme_tools_1.mode(theme_tools_1.whiten("primary.light.100", 70), theme_tools_1.whiten("backgrounds.dark.100", 20))(props),
                    },
                }),
                sidebar_button: props => ({
                    bg: "transparent",
                    borderRadius: "10px",
                    fill: theme_tools_1.mode("primary.dark.100", "text.light.h3_captions")(props),
                    _hover: {
                        bg: theme_tools_1.mode(theme_tools_1.darken("primary.dark.200", 10), theme_tools_1.whiten("backgrounds.dark.e000", 20))(props),
                        fill: "white",
                    },
                }),
                active_sidebar_button: props => ({
                    borderRadius: "10px",
                    fill: "white",
                    bg: theme_tools_1.mode("primary.light.200", "text.dark.disabled")(props),
                }),
                transparent: props => ({
                    bg: "transparent",
                    _hover: {
                        bg: theme_tools_1.mode(theme_tools_1.darken("primary.light._000", 20), theme_tools_1.whiten("primary.dark._000", 20))(props),
                    },
                }),
                transparent_nav_a: props => ({
                    bg: "transparent",
                    color: theme_tools_1.mode("primary.light.200", "primary.dark.200")(props),
                    borderRadius: 0,
                    h: "full",
                    fill: theme_tools_1.mode("primary.light.200", "primary.dark.200")(props),
                    stroke: theme_tools_1.mode("primary.light.200", "primary.dark.200")(props),
                    _hover: {
                        bg: theme_tools_1.mode(theme_tools_1.darken("primary.light._000", 10), theme_tools_1.whiten("backgrounds.dark._000", 20))(props),
                    },
                }),
                transparent_nav: props => ({
                    bg: "transparent",
                    color: theme_tools_1.mode("text.light.subtext", "text.dark.subtext")(props),
                    borderRadius: 0,
                    h: "full",
                    fill: theme_tools_1.mode("text.light.subtext", "text.dark.subtext")(props),
                    stroke: theme_tools_1.mode("text.light.subtext", "text.dark.subtext")(props),
                    _hover: {
                        bg: theme_tools_1.mode(theme_tools_1.darken("primary.light._000", 10), theme_tools_1.whiten("backgrounds.dark._000", 20))(props),
                    },
                }),
                drawer_mini: props => ({
                    bg: "primary.dark.200",
                    w: "33px",
                    h: "33px",
                    pos: "absolute",
                    bottom: "66px",
                    left: "1",
                    _hover: {
                        bg: theme_tools_1.whiten("primary.dark.200", 20),
                        fill: "white",
                        opacity: 1,
                    },
                }),
            },
            defaultProps: {
                size: "",
                variant: "",
            },
        },
        Input: {
            variants: {
                filled_a: props => ({
                    bg: theme_tools_1.mode("primary.dark.200", "primary.light.200")(props),
                }),
            },
        },
        Radio: {},
    },
    styles: {
        global: props => ({
            body: {
                bg: theme_tools_1.mode("backgrounds.light.e200", "backgrounds.dark.e200")(props),
            },
        }),
    },
});
exports.default = chakraTheme;
//# sourceMappingURL=customTheme.js.map