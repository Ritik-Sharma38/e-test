import * as React from "react";
import { EditorView } from "prosemirror-view";
import { Mark } from "prosemirror-model";
import theme from "../styles/theme";
import baseDictionary from "../dictionary";
export declare type SearchResult = {
    title: string;
    subtitle?: string;
    url: string;
};
declare type Props = {
    mark?: Mark;
    from: number;
    to: number;
    tooltip: typeof React.Component | React.FC<any>;
    dictionary: typeof baseDictionary;
    onRemoveLink?: () => void;
    onCreateLink?: (title: string) => Promise<void>;
    onSearchLink?: (term: string) => Promise<SearchResult[]>;
    onSelectLink: (options: {
        href: string;
        title?: string;
        from: number;
        to: number;
    }) => void;
    onClickLink: (href: string, event: MouseEvent) => void;
    onShowToast?: (message: string, code: string) => void;
    view: EditorView;
    theme: typeof theme;
    fromCommandMenu: boolean;
};
declare type State = {
    results: {
        [keyword: string]: SearchResult[];
    };
    value: string;
    title: string;
    previousValue: string;
    selectedIndex: number;
};
declare class LinkEditor extends React.Component<Props, State> {
    discardInputValue: boolean;
    initialValue: string;
    initialSelectionLength: number;
    wrapperRef: any;
    setWrapperRef: any;
    inputSubmit: any;
    from: number;
    to: number;
    constructor(props: any);
    state: State;
    get href(): string;
    get suggestedLinkTitle(): string;
    componentDidMount(): void;
    componentWillUnmount: () => void;
    handleClickOutside: (event: any) => void;
    save: (href: string, title?: string | undefined) => void;
    handleKeyDown: (event: React.KeyboardEvent) => void;
    handleEnterKey: () => void;
    handleFocusLink: (selectedIndex: number) => void;
    handleChange: (event: any) => Promise<void>;
    handlePaste: () => void;
    handleOpenLink: (event: any) => void;
    handleCreateLink: (value: string) => Promise<void> | undefined;
    handleRemoveLink: () => void;
    handleSelectLink: (url: string, title: string) => (event: any) => void;
    moveSelectionToEnd: () => void;
    handleRemoveLinkViaProp: () => void;
    render(): JSX.Element;
}
declare const _default: React.ForwardRefExoticComponent<Pick<Pick<any, string | number | symbol> & React.RefAttributes<LinkEditor>, string | number | symbol> & {
    theme?: any;
}>;
export default _default;
//# sourceMappingURL=LinkEditor.d.ts.map