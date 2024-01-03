"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
exports.default = new index_js_2.NativeFunction({
    name: 'ignore',
    description: 'The inside of this function won\'t be executed.',
    parameters: [
        {
            name: 'inside',
            description: 'Function content.',
            parse: false,
            defo: 'none'
        }
    ],
    async code(d) {
        const [inside] = d.function.compiled.fields.map(f => f.value);
        if (inside === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing function inside', d.function.compiled));
    }
})
    .setExample(`
{ignore =>
    Code inside "ignore" will not be executed.
    {let => height:{canvasHeight}}
}
`);
