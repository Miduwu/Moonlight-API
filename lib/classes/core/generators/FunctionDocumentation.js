"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateFunctions = exports.FunctionDocumentation = void 0;
const tslib_1 = require("tslib");
const NativeFunction_1 = require("../NativeFunction");
const ascii_table3_1 = require("ascii-table3");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = require("path");
class FunctionDocumentation {
    #data;
    constructor(data) {
        this.#data = data;
    }
    toMD() {
        const base = [
            `# ${this.#data.name}`,
            this.#data.description,
            '',
            '## Usage',
            `> \`${this.usage}\``
        ];
        if (this.#data.parameters?.length) {
            const table = new ascii_table3_1.AsciiTable3()
                .setHeading('Name', 'Description', 'Default value')
                .addRowMatrix(this.#data.parameters.map(p => {
                return [p.name, p.description, p.defo];
            }))
                .setStyle('github-markdown');
            base.push('', '## Parameters', table.toString());
        }
        base.push('', '## Example', '```', this.#data.example, '```');
        return base.join('\n');
    }
    get usage() {
        return `{${this.#data.name + (this.#data.parameters && this.#data.parameters?.length > 0 ? (' => ' + this.#data.parameters.map(p => p.name.toLowerCase()).join(':')) : '')}}`;
    }
}
exports.FunctionDocumentation = FunctionDocumentation;
function GenerateFunctions(dir, output) {
    if (!fs_1.default.existsSync((0, path_1.join)(process.cwd(), output))) {
        fs_1.default.mkdirSync((0, path_1.join)(process.cwd(), output), { recursive: true });
    }
    const files = fs_1.default.readdirSync((0, path_1.join)(process.cwd(), dir)).filter(file => file.endsWith('.js'));
    const functions = ['**FUNCTIONS**'];
    for (const file of files) {
        const native = require((0, path_1.join)(process.cwd(), dir, file))['default'];
        if (native instanceof NativeFunction_1.NativeFunction) {
            const documentation = new FunctionDocumentation(native);
            fs_1.default.writeFileSync((0, path_1.join)(process.cwd(), output, file.replace('.js', '.md')), documentation.toMD());
            functions.push(`- (${native.name})[functions/${native.name}.md]`);
        }
    }
    fs_1.default.writeFileSync((0, path_1.join)(process.cwd(), output, '_sidebar.md'), functions.join('\n'));
    return true;
}
exports.GenerateFunctions = GenerateFunctions;
GenerateFunctions('lib/classes/core/functions', 'autogenerated/functions');