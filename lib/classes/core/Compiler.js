"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const CompiledFunction_1 = require("./CompiledFunction");
const CompiledString_1 = require("./CompiledString");
const testWord = (s) => /\w/.test(s);
class Compiler {
    static compile(code) {
        const functions = [], result = [];
        let func = new CompiledFunction_1.CompiledFunction, str = new CompiledString_1.CompiledString, depth = 0, type = 'text';
        for (let i = 0; i < code.length; i++) {
            const c = code[i], n = code[i + 1];
            if ('{' === c)
                depth++;
            else if ('}' === c)
                depth--;
            if ('text' === type) {
                if ('{' === c) {
                    type = 'function_name';
                    if (str.value !== '') {
                        result.push(str), str = new CompiledString_1.CompiledString;
                    }
                }
                else
                    str.write(c);
            }
            else if (type.startsWith('function')) {
                const mode = type.split('_')[1].trim();
                if ('name' === mode) {
                    if ('=' === c && '>' === n) {
                        func.update();
                        str = new CompiledString_1.CompiledString;
                        type = 'function_param', i += 2;
                    }
                    else if (depth <= 1 && '}' === c) {
                        const over = new CompiledString_1.CompiledString;
                        over.overwrite(`$FUNCTION_` + functions.length);
                        if (str.value !== '') {
                            func.attachParameter(str.value);
                            str = new CompiledString_1.CompiledString;
                        }
                        if (func.name !== '') {
                            func.update();
                            functions.push(func);
                            result.push(over);
                            func = new CompiledFunction_1.CompiledFunction;
                        }
                        type = 'text';
                    }
                    else
                        func.name += c;
                }
                else if ('param' === mode) {
                    if (depth <= 0 && '}' === c) {
                        const over = new CompiledString_1.CompiledString;
                        over.overwrite(`$FUNCTION_` + functions.length);
                        if (str.value !== '') {
                            func.attachParameter(str.value);
                            str = new CompiledString_1.CompiledString;
                        }
                        if (func.name !== '') {
                            func.update();
                            functions.push(func);
                            result.push(over);
                            func = new CompiledFunction_1.CompiledFunction;
                        }
                        type = 'text';
                    }
                    else if (depth <= 1 && ':' === c) {
                        func.attachParameter(str.value);
                        str = new CompiledString_1.CompiledString;
                    }
                    else
                        str.write(c);
                }
            }
        }
        if (str.value !== '')
            result.push(str);
        if (func.name !== '') {
            func.update();
            functions.push(func);
        }
        return { result, functions };
    }
}
exports.Compiler = Compiler;
