"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const tslib_1 = require("tslib");
const main_1 = require("../../main");
class Route extends main_1.Endpoint {
    async handler(ctx) {
        const name = ctx.getParam("query");
        const request = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        if (!request.ok)
            return main_1.Endpoint.Error("Cannot get a valid response.");
        const data = await request.json();
        if (data.length === 0)
            return main_1.Endpoint.Error("Cannot find a country with that name.");
        ctx.send(data[0]);
    }
}
exports.Route = Route;
tslib_1.__decorate([
    main_1.Endpoint.Create({
        path: "/json/country",
        method: "GET"
    }),
    main_1.Endpoint.Query("query", {
        description: "The country (exact name)",
        required: true,
        type: main_1.aux.STRING({ min: 1, max: 250 })
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [main_1.Context]),
    tslib_1.__metadata("design:returntype", Promise)
], Route.prototype, "handler", null);
