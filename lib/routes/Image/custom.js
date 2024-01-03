"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../classes/core/index");
const main_1 = require("../../main");
const FUNCTIONS = new index_1.FunctionManager;
FUNCTIONS.load();
class Route extends main_1.Endpoint {
    async handler(ctx) {
        const body = ctx.req.body;
        if (!('code' in body))
            return main_1.Endpoint.Error("Missing code to be evaluated!");
        let data = new index_1.Data({
            ctx, interpreter: new index_1.Interpreter,
            cache: {}, functions: FUNCTIONS
        });
        const d = await data.interpreter.parse(body.code, data);
        if (!(data.cache[index_1.FRAME_NAME] instanceof main_1.Frame))
            return main_1.Endpoint.Error("Missing canvas to be sent!");
        ctx.send(data.cache[index_1.FRAME_NAME].toBuffer(), { type: "image/png" });
    }
}
exports.Route = Route;
tslib_1.__decorate([
    main_1.Endpoint.Create({
        path: "/image/custom",
        method: "POST"
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [main_1.Context]),
    tslib_1.__metadata("design:returntype", Promise)
], Route.prototype, "handler", null);
