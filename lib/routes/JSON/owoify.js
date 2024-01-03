"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const tslib_1 = require("tslib");
const main_1 = require("../../main");
class Route extends main_1.Endpoint {
    async handler(ctx) {
        ctx.send({
            "text": ctx.getParam("text"),
            "converted": ctx.getParam("text").replace(/(l|r)/g, "w").replace(/(L|R)/g, "W")
        });
    }
}
exports.Route = Route;
tslib_1.__decorate([
    main_1.Endpoint.Create({
        path: "/json/owoify",
        method: "GET"
    }),
    main_1.Endpoint.Query("text", {
        description: "The text to owoify.",
        required: true,
        type: main_1.aux.STRING({ min: 1, max: 1000 })
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [main_1.Context]),
    tslib_1.__metadata("design:returntype", Promise)
], Route.prototype, "handler", null);
