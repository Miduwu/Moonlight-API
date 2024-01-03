"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
const main_js_1 = require("../../../main.js");
exports.default = new index_js_2.NativeFunction({
    name: 'canvasOpacity',
    description: 'Set the opacity for the next element to be printed.',
    parameters: [
        {
            name: 'Amount',
            description: 'Opacity amount between 0 and 100.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [amount] = d.function.compiled.fields.map(t => t.value);
        if (amount === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing opacity amount', d.function.compiled));
        if (!(0, index_js_1.isNumberParseable)(amount))
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Invalid opacity amount', d.function.compiled));
        if (!(d.cache[index_js_1.FRAME_NAME] instanceof main_js_1.Frame))
            return new index_js_1.FunctionError(d, 'Unable to find a canvas to draw on');
        const frame = d.cache[index_js_1.FRAME_NAME];
        const parsed = Number(amount);
        if (parsed < 0 || parsed > 100)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Invalid opacity amount', d.function.compiled));
        const resolve = (num) => num / 100;
        frame.setAlpha(resolve(parsed));
    }
})
    .setExample(`
{canvasOpacity => 50}
`);
