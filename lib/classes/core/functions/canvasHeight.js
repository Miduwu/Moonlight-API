"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
const main_js_1 = require("../../../main.js");
exports.default = new index_js_2.NativeFunction({
    name: 'canvasHeight',
    description: 'Retrieves the canvas height.',
    async code(d) {
        if (!(d.cache[index_js_1.FRAME_NAME] instanceof main_js_1.Frame))
            return new index_js_1.FunctionError(d, 'Unable to find a canvas');
        return d.cache[index_js_1.FRAME_NAME].canvas.height;
    }
})
    .setExample(`
{let => height:{canvasHeight}}
`);
