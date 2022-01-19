import * as React from "react";
import theme from "../styles/theme";
export declare type Props = {
    selected: boolean;
    disabled?: boolean;
    onClick: () => void;
    theme: typeof theme;
    icon?: typeof React.Component | React.FC<any>;
    title: React.ReactNode;
    shortcut?: string;
    containerId?: string;
    itemName: string;
};
declare const _default: React.ForwardRefExoticComponent<{
    title: React.ReactNode;
    onClick: () => void;
    disabled?: boolean | undefined;
    selected: boolean;
    icon?: typeof React.Component | React.FC<any> | undefined;
    shortcut?: string | undefined;
    itemName: string;
    containerId?: string | undefined;
} & {
    theme?: any;
}>;
export default _default;
//# sourceMappingURL=BlockMenuItem.d.ts.map