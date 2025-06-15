"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openaiText = openaiText;
const LoopyAPI_1 = require("../../LoopyAPI");
function openaiText(body, opts, init) {
    if (typeof body?.prompt !== "string" || !body.prompt.trim()) {
        throw new TypeError(`"prompt" must be a non-empty string`);
    }
    if (body.speed !== undefined &&
        !["fast", "large", "balanced"].includes(body.speed)) {
        throw new TypeError(`"speed" must be one of "fast", "large", or "balance" (received "${body.speed}")`);
    }
    return LoopyAPI_1.LoopyAPI.POST("/openai/text", opts, {
        ...init,
        body: JSON.stringify({
            prompt: body.prompt,
            speed: body.speed || "balanced",
        }),
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        },
    }, true);
}
//# sourceMappingURL=text.js.map