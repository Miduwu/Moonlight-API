"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const main_js_1 = require("../../../main.js");
const index_js_2 = require("../index.js");
exports.default = new index_js_2.NativeFunction({
    name: 'canvasCreate',
    description: 'Creates a new canvas to draw on.',
    parameters: [
        {
            name: 'Width',
            description: 'Canvas width.',
            defo: 'none'
        },
        {
            name: 'Height',
            description: 'Canvas height.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [width, height] = d.function.compiled.fields.map(t => t.value);
        if (width === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing canvas width', d.function.compiled));
        if (height === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing canvas height', d.function.compiled));
        if (d.function.compiled.fields.slice(2).some(field => (0, index_js_1.isNumberParseable)(field.value) === false))
            return new index_js_1.FunctionError(d, `Invalid numbers provided in: "${(0, index_js_1.getFunctionSource)(d.function.compiled)}"`);
        const frame = new main_js_1.Frame(Number(width), Number(height), {
            ctx: d.ctx
        });
        d.cache[index_js_1.FRAME_NAME] = frame;
    }
})
    .setExample(`
{canvasCreate => 400:600}
{drawRect => ...}
{drawText => ...}
`);
