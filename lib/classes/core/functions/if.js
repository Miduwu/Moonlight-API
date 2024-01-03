"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
exports.default = new index_js_2.NativeFunction({
    name: 'if',
    description: 'Evaluates a condition.',
    parameters: [
        {
            name: 'Condition',
            description: 'Condition to be solved.',
            defo: 'none'
        },
        {
            name: 'Then',
            description: 'Code to be executed if the condition is met.',
            defo: 'none',
            parse: false
        },
        {
            name: 'Else',
            description: 'Code to be executed if the condition is met.',
            defo: 'none',
            parse: false
        }
    ],
    async code(d) {
        const [condition, then, _else] = d.function.compiled.fields.map(f => f.value);
        if (condition === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing condition', d.function.compiled));
        if (then === undefined)
            return new index_js_1.FunctionError(d, (0, index_js_1.getFunctionError)('Missing then code', d.function.compiled));
        const solved = new d.condition().solve(condition);
        if (solved) {
            return (await d.interpreter.parse(then, d)).code;
        }
        else if (!solved && _else) {
            return (await d.interpreter.parse(_else, d)).code;
        }
    }
})
    .setExample(`
{let => width:{canvasWidth}}
{let => height:{canvasHeight}}

{if => {get => width} == 200 && {get => height} == 200:
    {drawText => Hello:0:0:200:200}
:
    {drawText => Hello:0:0:400:400}
}
`);
