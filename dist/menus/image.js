"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outline_icons_1 = require("outline-icons");
function imageMenuItems(state, dictionary) {
    return [
        {
            name: "downloadImage",
            tooltip: dictionary.downloadImage,
            icon: outline_icons_1.DownloadIcon,
            visible: !!fetch,
            active: () => false,
        },
        {
            name: "replaceImage",
            tooltip: dictionary.replaceImage,
            icon: outline_icons_1.ReplaceIcon,
            visible: true,
            active: () => false,
        },
        {
            name: "deleteImage",
            tooltip: dictionary.deleteImage,
            icon: outline_icons_1.TrashIcon,
            visible: true,
            active: () => false,
        },
    ];
}
exports.default = imageMenuItems;
//# sourceMappingURL=image.js.map