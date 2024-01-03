"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompiledString = void 0;
class CompiledString {
    value = '';
    overwrite(value) {
        this.value = value;
        return this;
    }
    reset() {
        this.value = '';
        return this;
    }
    write(char) {
        this.value += char;
        return this;
    }
}
exports.CompiledString = CompiledString;
