"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
class Context {
    req;
    res;
    param = {};
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    getParam(param, defaultValue = null) {
        let v = this.req.query[param] || defaultValue;
        this.param = { name: param, value: v };
        return v;
    }
    send(payload, options) {
        let type = options?.type || "application/json";
        if (type == "application/json")
            return this.res.type(type).status(options?.status || 200).send({ statusCode: options?.status || 200, data: payload, success: options?.success ?? true });
        else
            return this.res.type(type).status(options?.status || 200).send(payload);
    }
    redirect(url, status = 200) {
        return this.res.redirect(status, url);
    }
}
exports.Context = Context;
