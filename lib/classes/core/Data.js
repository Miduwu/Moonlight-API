"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const index_js_1 = require("./index.js");
const Condition_js_1 = require("./Condition.js");
class Data {
    compiled;
    interpreter;
    break;
    code;
    functions;
    ctx;
    function;
    start = Date.now();
    condition = Condition_js_1.Condition;
    cache;
    constructor(options) {
        this.break = options.break ?? false;
        this.code = options.code ?? '';
        this.function = options.function;
        this.functions = options.functions ?? new index_js_1.FunctionManager;
        this.interpreter = options.interpreter;
        this.ctx = options.ctx;
        this.cache = options.cache ?? {};
    }
    setCode(code) {
        this.code = code;
        return this;
    }
    extend(options) {
        return new Data(options);
    }
}
exports.Data = Data;
