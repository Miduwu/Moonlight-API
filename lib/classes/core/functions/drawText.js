"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
const main_js_1 = require("../../../main.js");
exports.default = new index_js_2.NativeFunction({
    name: 'drawText',
    description: 'Draws a text over the canvas.',
    parameters: [
        {
            name: 'Text',
            description: 'Text to be draw.',
            defo: 'none'
        },
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
            description: 'Text box width.',
            defo: 'none'
        },
        {
            name: 'Height',
            description: 'Text box height.',
            defo: 'none'
        },
        {
            name: 'Align',
            description: 'Text align.',
            defo: 'left'
        },
        {
            name: 'Vertical align',
            description: 'Text vertical align.',
            defo: 'middle'
        }
    ],
    async code(d) {
        const [text, x, y, width, height, align = 'left', vAlign = 'middle'] = d.function.compiled.fields.map(t => t.value);
        if (text === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing text', d.function.compiled));
        if (x === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing X coordinate', d.function.compiled));
        if (y === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing Y coordinate', d.function.compiled));
        if (width === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing text box width', d.function.compiled));
        if (height === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing text box height', d.function.compiled));
        if (!['left', 'center', 'right'].includes(align.toLowerCase()))
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Invalid text align', d.function.compiled));
        if (!['top', 'bottom', 'middle'].includes(vAlign.toLowerCase()))
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Invalid text vertical align', d.function.compiled));
        if (d.function.compiled.fields.slice(1, 5).some(field => (0, index_js_1.isNumberParseable)(field.value) === false))
            return new index_js_1.FunctionError(d, `Invalid numbers provided in: "${(0, index_js_1.getFunctionSource)(d.function.compiled)}"`);
        if (!(d.cache[index_js_1.FRAME_NAME] instanceof main_js_1.Frame))
            return new index_js_1.FunctionError(d, 'Unable to find a canvas to draw on');
        const frame = d.cache[index_js_1.FRAME_NAME];
        frame.drawText(text, Number(x), Number(y), Number(width), Number(height), {
            box: true,
            align: align,
            vAlign: vAlign
        });
    }
})
    .setExample(`
{drawImage => Hello world!:0:0:1024:1024:center:middle}
`);
