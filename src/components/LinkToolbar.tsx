/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from "react";
import { EditorView } from "prosemirror-view";
import LinkEditor, { SearchResult } from "./LinkEditor";
import createAndInsertLink from "../commands/createAndInsertLink";
import baseDictionary from "../dictionary";
import FloatingToolbarTemp from "./FloatingToolbarTemp";
import { EditorState, Selection, Plugin } from "prosemirror-state";

type Props = {
  isActive: boolean;
  view: EditorView;
  tooltip: typeof React.Component | React.FC<any>;
  dictionary: typeof baseDictionary;
  onCreateLink?: (title: string) => Promise<string>;
  onSearchLink?: (term: string) => Promise<SearchResult[]>;
  onClickLink: (href: string, event: MouseEvent) => void;
  onShowToast?: (msg: string, code: string) => void;
  onClose: () => void;
};

function isActive(props: Props) {
  const { view } = props;
  const { selection } = view.state;

  try {
    const paragraph = view.domAtPos(selection.from);
    return props.isActive && !!paragraph.node;
  } catch (err) {
    return false;
  }
}

export default class LinkToolbar extends React.Component<Props> {
  menuRef = React.createRef<HTMLDivElement>();

  state = {
    left: -1000,
    top: undefined,
  };

  componentDidMount() {
    window.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = ev => {
    if (
      ev.target &&
      this.menuRef.current &&
      this.menuRef?.current?.contains(ev.target)
    ) {
      return;
    }

    this.props.onClose();
  };

  handleOnCreateLink = async (title: string) => {
    const { dictionary, onCreateLink, view, onClose, onShowToast } = this.props;

    onClose();
    this.props.view.focus();

    if (!onCreateLink) {
      return;
    }

    const { dispatch, state } = view;
    const { from, to } = state.selection;
    if (from !== to) {
      // selection must be collapsed
      return;
    }

    const href = `creating#${title}…`;

    // Insert a placeholder link
    dispatch(
      view.state.tr
        .insertText(title, from, to)
        .addMark(
          from,
          to + title.length,
          state.schema.marks.link.create({ href })
        )
    );

    createAndInsertLink(view, title, href, {
      onCreateLink,
      onShowToast,
      dictionary,
    });
  };

  handleOnSelectLink = ({
    href,
    title,
    from,
    to,
  }: {
    href: string;
    title: string;
    from: number;
    to: number;
  }) => {
    const { view, onClose } = this.props;

    onClose();
    this.props.view.focus();

    const { dispatch, state } = view;
    if (from !== to) {
      // selection must be collapsed
      return;
    }

    dispatch(
      view.state.tr
        .insertText(title, from, to)
        .addMark(
          from,
          to + title.length,
          state.schema.marks.link.create({ href })
        )
    );

    /* setTimeout(
      props => {
        const selection = Selection.atEnd(props.view.state.doc);
        const anchor = selection.$anchor;
        anchor.pos = from + title.length;
        const head = selection.$head;
        head.pos = from + title.length;
       
        const modifiedSelection = new Selection(anchor, head);

        console.log(selection, modifiedSelection.content())
        console.log(modifiedSelection.from);

        const transaction = props.view.state.tr?.setSelection(
          modifiedSelection
        );
        console.log(modifiedSelection.to, transaction);
        props.view.dispatch(transaction);
        props.view.focus();
      },
      1000,
      this.props
    ); */
  };

  render() {
    const { onCreateLink, onClose, view, ...rest } = this.props;
    const { selection } = this.props.view.state;
    const active = isActive(this.props);

    return (
      <FloatingToolbarTemp
        view={view}
        ref={this.menuRef}
        active={active}
        {...rest}
        fromCommandMenu={active}
      >
        {active && (
          <LinkEditor
            view={view}
            from={selection.from}
            to={selection.to}
            onCreateLink={onCreateLink ? this.handleOnCreateLink : undefined}
            onSelectLink={this.handleOnSelectLink}
            onRemoveLink={onClose}
            fromCommandMenu={true}
            {...rest}
          />
        )}
      </FloatingToolbarTemp>
    );
  }
}
