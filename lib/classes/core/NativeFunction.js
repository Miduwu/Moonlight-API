"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeFunction = void 0;
class NativeFunction {
    name;
    description;
    parameters;
    example;
    code;
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.parameters = options.parameters;
        this.code = options.code;
    }
    setExample(example) {
        this.example = example.trim().split('\n').map(t => t.trim()).join('\n');
        return this;
    }
}
exports.NativeFunction = NativeFunction;
