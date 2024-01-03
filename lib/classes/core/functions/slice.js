"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
exports.default = new index_js_2.NativeFunction({
    name: 'slice',
    description: 'Get a part of a text, from X to Y.',
    parameters: [
        {
            name: 'Text',
            description: 'Text to be converted.',
            defo: 'none'
        },
        {
            name: 'From',
            description: 'Slicing start index.',
            defo: 'none'
        },
        {
            name: 'To',
            description: 'Slicing end index.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [text, from, to] = d.function.compiled.fields.map(f => f.value);
        if (text === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing text', d.function.compiled));
        if (d.function.compiled.fields.slice(1, 3).some(field => (0, index_js_1.isNumberParseable)(field.value) === false))
            return new index_js_1.FunctionError(d, `Invalid numbers provided in: "${(0, index_js_1.getFunctionSource)(d.function.compiled)}"`);
        return to ? text.slice(Number(from), Number(to)) : text.slice(Number(from));
    }
})
    .setExample(`
{slice => HELLO WORLD:0:5}
`);
