"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionError = exports.FRAME_NAME = exports.ERROR_NAME = exports.getFunctionError = exports.getFunctionSource = exports.isNumberParseable = exports.Data = void 0;
const tslib_1 = require("tslib");
const Data_js_1 = require("./Data.js");
Object.defineProperty(exports, "Data", { enumerable: true, get: function () { return Data_js_1.Data; } });
tslib_1.__exportStar(require("./FunctionManager.js"), exports);
tslib_1.__exportStar(require("./NativeFunction.js"), exports);
tslib_1.__exportStar(require("./Interpreter.js"), exports);
tslib_1.__exportStar(require("./Compiler.js"), exports);
const isNumberParseable = (num) => !isNaN(Number(num));
exports.isNumberParseable = isNumberParseable;
const getFunctionSource = (func) => `{${func.name} => ${func.fields.map(x => x.value).join(':')}}`;
exports.getFunctionSource = getFunctionSource;
const getFunctionError = (message, func) => `${message} in: "${func.name}"`;
exports.getFunctionError = getFunctionError;
exports.ERROR_NAME = "$$__core__error__$$";
exports.FRAME_NAME = "$$__core__canva__$$";
class FunctionError {
    constructor(data, message) {
        data.break = true;
        data.ctx.send({ message }, { status: 400, success: false });
    }
}
exports.FunctionError = FunctionError;
