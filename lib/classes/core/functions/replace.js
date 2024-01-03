"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
exports.default = new index_js_2.NativeFunction({
    name: 'replace',
    description: 'Replaces the first matched word in a text.',
    parameters: [
        {
            name: 'Text',
            description: 'Text to work on.',
            defo: 'none'
        },
        {
            name: 'Match',
            description: 'Word to be replaced.',
            defo: 'none'
        },
        {
            name: 'replacement',
            description: 'Word to be replaced with.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [text, match, replacement = ''] = d.function.compiled.fields.map(f => f.value);
        if (text === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing text', d.function.compiled));
        if (match === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing text', d.function.compiled));
        return text.replace(match, replacement);
    }
})
    .setExample(`
{replace => HELLO WORLD:HELLO:BYE}
`);
