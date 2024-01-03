"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = exports.APIError = void 0;
class APIError extends Error {
    constructor(message, options) {
        super(message, options);
    }
}
exports.APIError = APIError;
class Endpoint {
    options = null;
    static Create(options) {
        return function (target, key, descriptor) {
            if (!descriptor.value.options)
                descriptor.value.options = options;
            else {
                descriptor.value.options["method"] = options.method;
                descriptor.value.options["path"] = options.path;
            }
        };
    }
    static Query(name, options) {
        return function (target, key, descriptor) {
            if (!descriptor.value.options)
                descriptor.value.options = {};
            if (!descriptor.value.options.query)
                descriptor.value.options.query = {};
            descriptor.value.options.query[name] = options;
        };
    }
    static Describe(description) {
        return function (target, key, descriptor) {
            if (!descriptor.value.options)
                descriptor.value.options = {};
            if (!descriptor.value.options.schema)
                descriptor.value.options.schema = {};
            descriptor.value.options.schema.description = description;
        };
    }
    static Error(message, options) {
        return new APIError(message, options);
    }
    assign() {
        for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), key);
            if (!descriptor || typeof descriptor.value !== "function" || !descriptor.value.options)
                continue;
            if (descriptor.value.options)
                this.options = descriptor.value.options;
        }
        return this;
    }
}
exports.Endpoint = Endpoint;
