"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const tslib_1 = require("tslib");
const main_1 = require("../../main");
class Route extends main_1.Endpoint {
    async handler(ctx) {
        const img = new main_1.Frame(1024, 1024);
        const avatar = await main_1.Frame.loadImage(ctx.getParam("image")).catch(main_1.aux.noop);
        if (!avatar)
            return main_1.Endpoint.Error("Invalid image provided in: " + ctx.param.name);
        img.ctx.filter = "grayscale(100%)";
        img.drawImage(avatar, 0, 0, 1024, 1024);
        img.ctx.filter = "none";
        ctx.send(img.toBuffer(), { type: "image/png" });
    }
}
exports.Route = Route;
tslib_1.__decorate([
    main_1.Endpoint.Create({
        path: "/image/grayscale",
        method: "GET"
    }),
    main_1.Endpoint.Query("image", {
        description: "The image to draw",
        required: true,
        type: main_1.aux.STRING({ essential: main_1.aux.Essentials.Image })
    }),
    main_1.Endpoint.Describe("Apply a grayscale filter to your image."),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [main_1.Context]),
    tslib_1.__metadata("design:returntype", Promise)
], Route.prototype, "handler", null);
