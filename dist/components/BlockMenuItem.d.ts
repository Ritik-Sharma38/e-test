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
    level: any;
};
declare const _default: React.ForwardRefExoticComponent<Pick<Props, "title" | "onClick" | "disabled" | "selected" | "icon" | "shortcut" | "itemName" | "level" | "containerId"> & {
    theme?: any;
}>;
export default _default;
//# sourceMappingURL=BlockMenuItem.d.ts.map