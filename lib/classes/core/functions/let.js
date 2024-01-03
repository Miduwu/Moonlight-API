"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
exports.default = new index_js_2.NativeFunction({
    name: 'let',
    description: 'Creates a environment variable.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            defo: 'none'
        },
        {
            name: 'Value',
            description: 'Variable value.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [name, value] = d.function.compiled.fields.map(f => f.value);
        if (name === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing variable name', d.function.compiled));
        if (value === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing variable value', d.function.compiled));
        d.cache[name] = value;
    }
})
    .setExample(`
{let => width:{canvasWidth}}
`);
