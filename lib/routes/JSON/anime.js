"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const tslib_1 = require("tslib");
const main_1 = require("../../main");
class Route extends main_1.Endpoint {
    async handler(ctx) {
        const type = ctx.getParam("type"), query = ctx.getParam("query"), limit = ctx.getParam("limit");
        if (!["anime", "manga"].includes(type.toLowerCase()))
            return main_1.Endpoint.Error("Invalid search type provided");
        const URL = `https://kitsu.io/api/edge/${type}?filter[text]=${query}&page[offset]=0`;
        const request = await fetch(URL);
        if (!request.ok)
            throw main_1.Endpoint.Error("Cannot get a valid response.");
        const data = await request.json();
        ctx.send(data['data'].slice(0, limit));
    }
}
exports.Route = Route;
tslib_1.__decorate([
    main_1.Endpoint.Create({
        path: "/json/anime",
        method: "GET"
    }),
    main_1.Endpoint.Query("type", {
        description: "The type of search",
        default: "anime",
        type: main_1.aux.LITERAL("anime", "manga")
    }),
    main_1.Endpoint.Query("query", {
        description: "What to search for",
        required: true,
        type: main_1.aux.STRING({ max: 1000, min: 1 })
    }),
    main_1.Endpoint.Query("limit", {
        description: "How many results should be returned? (Maximum is 10)",
        default: 10,
        type: main_1.aux.NUMBER({ min: 1, max: 10 })
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [main_1.Context]),
    tslib_1.__metadata("design:returntype", Promise)
], Route.prototype, "handler", null);
