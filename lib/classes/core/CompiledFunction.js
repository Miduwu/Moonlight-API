"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompiledFunction = exports.CompiledField = void 0;
class CompiledField {
    value = '';
    index = Infinity;
    constructor(value, index) {
        this.value = value;
        this.index = index;
    }
}
exports.CompiledField = CompiledField;
class CompiledFunction {
    name = '';
    over = '';
    fields = [];
    setName(name) {
        this.name = name.toLowerCase().trim();
        this.update();
        return this;
    }
    attachParameter(value) {
        this.fields.push(new CompiledField(value, this.fields.length));
        this.update();
        return this;
    }
    resetFunction() {
        this.name = '';
        this.over = '';
        this.fields = [];
    }
    update() {
        this.name = this.name.trim().toLowerCase();
        this.over = this.fields.length > 0 ? '{' + this.name + ' => ' + this.fields.map(field => field.value).join(':') + '}' : '{' + this.name + '}';
        return this;
    }
}
exports.CompiledFunction = CompiledFunction;
