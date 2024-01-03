"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
const main_js_1 = require("../../../main.js");
const Parser_js_1 = require("../../Parser.js");
exports.default = new index_js_2.NativeFunction({
    name: 'canvasStrokeStyle',
    description: 'Set the stroke style for the canvas.',
    parameters: [
        {
            name: 'Hex',
            description: 'Hex color.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [hex] = d.function.compiled.fields.map(t => t.value);
        if (hex === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing hexadecimal color', d.function.compiled));
        if (!(0, Parser_js_1.isHex)(hex))
            return new index_js_1.FunctionError(d, `Invalid hexadecimal code provided in: "${(0, index_js_1.getFunctionSource)(d.function.compiled)}"`);
        if (!(d.cache[index_js_1.FRAME_NAME] instanceof main_js_1.Frame))
            return new index_js_1.FunctionError(d, 'Unable to find a canvas to draw on');
        const frame = d.cache[index_js_1.FRAME_NAME];
        frame.setStrokeStyle('#' + hex.replaceAll('#', '').trim());
    }
})
    .setExample(`
{canvasStrokeStyle => #FF0000}
`);
