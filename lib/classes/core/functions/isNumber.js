"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
exports.default = new index_js_2.NativeFunction({
    name: 'isNumber',
    description: 'Check if the function inside is a valid number.',
    parameters: [
        {
            name: 'Number',
            description: 'Number to be tested.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [inside] = d.function.compiled.fields.map(f => f.value);
        if (inside === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing number', d.function.compiled));
        return (0, index_js_1.isNumberParseable)(inside);
    }
})
    .setExample(`
{isNumber => 69}
`);
