"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asciiArt = asciiArt;
const LoopyAPI_1 = require("../../LoopyAPI");
function asciiArt(text, opts, init) {
    if (typeof text !== "string") {
        throw new TypeError(`"text" must be a string, got ${typeof text}`);
    }
    if (!text.trim()) {
        throw new RangeError(`"text" cannot be empty`);
    }
    return LoopyAPI_1.LoopyAPI.GET(`/ascii-art?text=${encodeURIComponent(text)}`, opts, init);
}
//# sourceMappingURL=asciiArt.js.map