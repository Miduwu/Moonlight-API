"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const tslib_1 = require("tslib");
const main_1 = require("../../main");
class Route extends main_1.Endpoint {
    async handler(ctx) {
        const type = ctx.getParam("type", "repo"), query = ctx.getParam("query");
        if (type === "user") {
            const result = await fetch(`https://api.github.com/users/${query}`);
            if (!result.ok)
                throw main_1.Endpoint.Error("Cannot get a valid response.");
            else
                ctx.send(await result.json());
        }
        else {
            const result = await fetch(`https://api.github.com/search/repositories?q=${query}&page=1&per_page=1`);
            if (!result.ok)
                throw main_1.Endpoint.Error("Cannot get a valid response.");
            else if ((await result.json()).total_count === "0")
                throw main_1.Endpoint.Error("400", "No results found.");
            else
                ctx.send(await result.json());
        }
    }
}
exports.Route = Route;
tslib_1.__decorate([
    main_1.Endpoint.Create({
        path: "/json/github",
        method: "GET"
    }),
    main_1.Endpoint.Query("query", {
        description: "The query to use for the GitHub API.",
        required: true,
        type: main_1.aux.STRING({ min: 1, max: 100 })
    }),
    main_1.Endpoint.Query("type", {
        description: "What type of data should be returned",
        default: "repo",
        type: main_1.aux.LITERAL("user", "repo")
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [main_1.Context]),
    tslib_1.__metadata("design:returntype", Promise)
], Route.prototype, "handler", null);
