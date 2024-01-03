"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
const main_js_1 = require("../../../main.js");
exports.default = new index_js_2.NativeFunction({
    name: 'drawRect',
    description: 'Draws a rectangle over the canvas.',
    parameters: [
        {
            name: 'X',
            description: 'X coordinate.',
            defo: 'none'
        },
        {
            name: 'Y',
            description: 'Y coordinate.',
            defo: 'none'
        },
        {
            name: 'Width',
            description: 'Rectangle width.',
            defo: 'none'
        },
        {
            name: 'Height',
            description: 'Rectangle height.',
            defo: 'none'
        },
        {
            name: 'Radius',
            description: 'Rectangle corner radius.',
            defo: '0'
        }
    ],
    async code(d) {
        const [x, y, width, height, radius = '0'] = d.function.compiled.fields.map(t => t.value);
        if (x === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing X coordinate', d.function.compiled));
        if (y === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing Y coordinate', d.function.compiled));
        if (width === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing image width', d.function.compiled));
        if (height === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing image height', d.function.compiled));
        if (d.function.compiled.fields.slice(0, 5).some(field => (0, index_js_1.isNumberParseable)(field.value) === false))
            return new index_js_1.FunctionError(d, `Invalid numbers provided in: "${(0, index_js_1.getFunctionSource)(d.function.compiled)}"`);
        if (!(d.cache[index_js_1.FRAME_NAME] instanceof main_js_1.Frame))
            return new index_js_1.FunctionError(d, 'Unable to find a canvas to draw on');
        const frame = d.cache[index_js_1.FRAME_NAME];
        frame.drawRectangle(Number(x), Number(y), Number(width), Number(height), { radius: Number(radius) });
    }
})
    .setExample(`
{drawRect => 0:0:1024:1024:60}
`);
