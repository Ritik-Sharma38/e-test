"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const outline_icons_1 = require("outline-icons");
const prosemirror_tables_1 = require("prosemirror-tables");
const isInList_1 = __importDefault(require("../queries/isInList"));
const isMarkActive_1 = __importDefault(require("../queries/isMarkActive"));
const isNodeActive_1 = __importDefault(require("../queries/isNodeActive"));
function formattingMenuItems(state, isTemplate, dictionary) {
    const { schema } = state;
    const isTable = prosemirror_tables_1.isInTable(state);
    const isList = isInList_1.default(state);
    const allowBlocks = !isTable && !isList;
    return [
        {
            name: "heading",
            tooltip: dictionary.heading,
            icon: outline_icons_1.Heading1Icon,
            active: isNodeActive_1.default(schema.nodes.heading, { level: 1 }),
            attrs: { level: 1 },
            visible: allowBlocks,
        },
        {
            name: "heading",
            tooltip: dictionary.subheading,
            icon: outline_icons_1.Heading2Icon,
            active: isNodeActive_1.default(schema.nodes.heading, { level: 2 }),
            attrs: { level: 2 },
            visible: allowBlocks,
        },
        {
            name: "heading",
            tooltip: dictionary.subheading,
            icon: outline_icons_1.Heading3Icon,
            active: isNodeActive_1.default(schema.nodes.heading, { level: 3 }),
            attrs: { level: 3 },
            visible: allowBlocks,
        },
        {
            name: "heading",
            tooltip: dictionary.subheading,
            icon: outline_icons_1.Heading3Icon,
            active: isNodeActive_1.default(schema.nodes.heading, { level: 4 }),
            attrs: { level: 4 },
            visible: allowBlocks,
        },
        {
            name: "heading",
            tooltip: dictionary.subheading,
            icon: outline_icons_1.Heading3Icon,
            active: isNodeActive_1.default(schema.nodes.heading, { level: 5 }),
            attrs: { level: 5 },
            visible: allowBlocks,
        },
        {
            name: "heading",
            tooltip: dictionary.subheading,
            icon: outline_icons_1.Heading3Icon,
            active: isNodeActive_1.default(schema.nodes.heading, { level: 6 }),
            attrs: { level: 6 },
            visible: allowBlocks,
        },
        {
            name: "strong",
            tooltip: dictionary.strong,
            icon: outline_icons_1.BoldIcon,
            active: isMarkActive_1.default(schema.marks.strong),
        },
        {
            name: "em",
            tooltip: dictionary.em,
            icon: outline_icons_1.ItalicIcon,
            active: isMarkActive_1.default(schema.marks.em),
        },
        {
            name: "strikethrough",
            tooltip: dictionary.strikethrough,
            icon: outline_icons_1.StrikethroughIcon,
            active: isMarkActive_1.default(schema.marks.strikethrough),
        },
        {
            name: "link",
            tooltip: dictionary.createLink,
            icon: outline_icons_1.LinkIcon,
            active: isMarkActive_1.default(schema.marks.link),
            attrs: { href: "" },
        },
        {
            name: "ordered_list",
            tooltip: dictionary.orderedList,
            icon: outline_icons_1.OrderedListIcon,
            active: isNodeActive_1.default(schema.nodes.ordered_list),
            visible: allowBlocks || isList,
        },
        {
            name: "bullet_list",
            tooltip: dictionary.bulletList,
            icon: outline_icons_1.BulletedListIcon,
            active: isNodeActive_1.default(schema.nodes.bullet_list),
            visible: allowBlocks || isList,
        },
        {
            name: "checkbox_list",
            tooltip: dictionary.checkboxList,
            icon: outline_icons_1.TodoListIcon,
            keywords: "checklist checkbox task",
            active: isNodeActive_1.default(schema.nodes.checkbox_list),
            visible: allowBlocks || isList,
        },
        {
            name: "code_inline",
            tooltip: dictionary.codeInline,
            icon: outline_icons_1.CodeIcon,
            active: isMarkActive_1.default(schema.marks.code_inline),
        },
        {
            name: "blockquote",
            tooltip: dictionary.quote,
            icon: outline_icons_1.BlockQuoteIcon,
            active: isNodeActive_1.default(schema.nodes.blockquote),
            attrs: { level: 2 },
            visible: allowBlocks,
        },
        {
            name: "text",
            tooltip: dictionary.text,
            icon: outline_icons_1.Heading1Icon,
            active: isNodeActive_1.default(schema.node.text),
        },
    ];
}
exports.default = formattingMenuItems;
//# sourceMappingURL=formatting.js.map