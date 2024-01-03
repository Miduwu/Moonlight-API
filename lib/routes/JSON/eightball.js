"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const tslib_1 = require("tslib");
const main_1 = require("../../main");
const RESPONSES = {
    en: ["Yes.", "No.", "Maybe.", "Probably.", "Probably no.", "I don't know.", "Sure.", "Obviously no.", "I doubt it."],
    es: ["Si.", "No.", "Tal vez.", "Probablemente.", "Probablemente no.", "No sé.", "Obvio si.", "Obvio no.", "Lo dudo."],
    pt: ["Sim.", "Não.", "Talvez.", "Provavelmente.", "Provavelmente não.", "Não sei.", "Óbvio.", "Óbvio não.", "Duvido."],
    fr: ["Oui", "Non.", "Peut-être.", "Probablement.", "Probablement non.", "Je ne sais pas.", "De toute évidence.", "Évidemment pas.", "J'en doute."]
};
class Route extends main_1.Endpoint {
    async handler(ctx) {
        const text = ctx.getParam("text"), idiom = ctx.getParam("idiom");
        if (!text)
            throw main_1.Endpoint.Error("Missing required parameter 'text'");
        if (!(idiom.toLowerCase() in RESPONSES))
            throw main_1.Endpoint.Error("Invalid idiom provided.");
        ctx.send({
            "question": text,
            "idiom": idiom.toLowerCase(),
            "response": RESPONSES[idiom.toLowerCase()].at(Math.floor(Math.random() * RESPONSES[idiom.toLowerCase()].length))
        });
    }
}
exports.Route = Route;
tslib_1.__decorate([
    main_1.Endpoint.Create({
        path: "/json/8ball",
        method: "GET"
    }),
    main_1.Endpoint.Query("text", {
        description: "The text to ask to the magic ball",
        type: main_1.aux.STRING(),
        required: true
    }),
    main_1.Endpoint.Query("idiom", {
        description: "The idiom",
        type: main_1.aux.LITERAL("en", "es", "pt", "fr")
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [main_1.Context]),
    tslib_1.__metadata("design:returntype", Promise)
], Route.prototype, "handler", null);
