import * as React from "react";
import { EditorView } from "prosemirror-view";
import theme from "../styles/theme";
import { MenuItem } from "../types";
declare type Props = {
    tooltip: typeof React.Component | React.FC<any>;
    commands: Record<string, any>;
    commandRef: any;
    view: EditorView;
    theme: typeof theme;
    items: MenuItem[];
    isImageSelection: any;
};
declare class ToolbarMenu extends React.Component<Props> {
    pickImage: (action: string, type: string) => void;
    call: (item: any) => void;
    render(): JSX.Element;
}
declare const _default: React.ForwardRefExoticComponent<{
    view: EditorView<any>;
    ref?: React.Ref<ToolbarMenu> | undefined;
    key?: React.Key | null | undefined;
    tooltip: typeof React.Component | React.FC<any>;
    commands: Record<string, any>;
    commandRef: any;
    items: MenuItem[];
    isImageSelection: any;
} & {
    theme?: any;
}>;
export default _default;
//# sourceMappingURL=ToolbarMenu.d.ts.map