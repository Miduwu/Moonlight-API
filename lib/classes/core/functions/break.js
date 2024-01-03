"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
exports.default = new index_js_1.NativeFunction({
    name: 'break',
    description: 'Breaks the execution of the remaining code.',
    async code(d) {
        d.break = true;
    }
})
    .setExample(`
{log => This part will be executed.}
{break}
{log => This part will not be executed.}
`);
