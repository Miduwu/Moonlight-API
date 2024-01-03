"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
exports.default = new index_js_2.NativeFunction({
    name: 'lowercase',
    description: 'Converts a text to lowercase.',
    parameters: [
        {
            name: 'Text',
            description: 'Text to be converted.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [inside] = d.function.compiled.fields.map(f => f.value);
        if (inside === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing text', d.function.compiled));
        return inside.toLowerCase();
    }
})
    .setExample(`
{lowercase => HELLO WORLD}
`);
