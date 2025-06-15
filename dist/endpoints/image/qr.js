"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qr = qr;
const LoopyAPI_1 = require("../../LoopyAPI");
function qr(data, opts, init) {
    if (typeof data !== "string") {
        throw new TypeError(`"data" must be a string, got ${typeof data}`);
    }
    if (!data.trim()) {
        throw new RangeError(`"data" cannot be empty`);
    }
    return LoopyAPI_1.LoopyAPI.GET(`/qr?data=${encodeURIComponent(data)}`, opts, init, true);
}
//# sourceMappingURL=qr.js.map