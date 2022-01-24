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
    linkEditorRef: any;
    linkToolBarRef: any;
    onCloseLink: () => void;
    rootState: any;
};
declare class ToolbarMenu extends React.Component<Props> {
    pickImage: (action: string, type: string) => void;
    call: (item: any, active_heading: any) => void;
    handleRemoveAllMark: (item: any) => void;
    render(): JSX.Element;
}
declare const _default: React.ForwardRefExoticComponent<Pick<Props & React.RefAttributes<ToolbarMenu>, "view" | "ref" | "key" | "tooltip" | "commands" | "commandRef" | "items" | "isImageSelection" | "linkEditorRef" | "linkToolBarRef" | "onCloseLink" | "rootState"> & {
    theme?: any;
}>;
export default _default;
//# sourceMappingURL=ToolbarMenu.d.ts.map