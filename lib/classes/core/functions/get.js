"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
exports.default = new index_js_2.NativeFunction({
    name: 'get',
    description: 'Retrieves a environment variable.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [name] = d.function.compiled.fields.map(f => f.value);
        if (name === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing variable name', d.function.compiled));
        if (!(name in d.cache))
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Invalid variable name', d.function.compiled));
        return d.cache[name];
    }
})
    .setExample(`
{let => width:{canvasWidth}}
{get => width}
`);
