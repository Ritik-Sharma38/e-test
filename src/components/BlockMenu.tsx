/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { findParentNode } from "prosemirror-utils";
import CommandMenu, { Props } from "./CommandMenu";
import BlockMenuItem from "./BlockMenuItem";
import getMenuItems from "../menus/block";

type BlockMenuProps = Omit<
  Props,
  "renderMenuItem" | "items" | "onClearSearch"
> &
  Required<Pick<Props, "onLinkToolbarOpen" | "embeds">>;

class BlockMenu extends React.Component<BlockMenuProps> {
  get items() {
    return getMenuItems(this.props.dictionary);
  }

  clearSearch = (type: string) => {
    const { state, dispatch } = this.props.view;
    const parent = findParentNode(node => !!node)(state.selection);
    if (parent) {
      dispatch(
        state.tr.insertText(
          "",
          type === "middle" ? state.selection.from : parent.pos,
          state.selection.to
        )
      );
    }
  };

  render() {
    const { passRef, view, dictionary, toolbarMenuRef } = this.props;
    return (
      <CommandMenu
        {...this.props}
        ref={passRef}
        view={view}
        filterable={true}
        onClearSearch={this.clearSearch}
        dictionary={dictionary}
        toolbarMenuRef={toolbarMenuRef}
        renderMenuItem={(item, _index, options) => {
          return (
            <BlockMenuItem
              onClick={options.onClick}
              selected={options.selected}
              icon={item.icon}
              title={item.title}
              itemName={item?.name ? item.name : ""}
              shortcut={item.shortcut}
            />
          );
        }}
        items={this.items}
      />
    );
  }
}

export default BlockMenu;
