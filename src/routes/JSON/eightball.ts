import { Context, Endpoint, aux } from "../../main";

const RESPONSES = {
    en: ["Yes.", "No.", "Maybe.", "Probably.", "Probably no.", "I don't know.", "Sure.", "Obviously no.", "I doubt it."],
    es: ["Si.", "No.", "Tal vez.", "Probablemente.", "Probablemente no.", "No sé.", "Obvio si.", "Obvio no.", "Lo dudo."],
    pt: ["Sim.", "Não.", "Talvez.", "Provavelmente.", "Provavelmente não.", "Não sei.", "Óbvio.", "Óbvio não.", "Duvido."],
    fr: ["Oui", "Non.", "Peut-être.", "Probablement.", "Probablement non.", "Je ne sais pas.", "De toute évidence.", "Évidemment pas.", "J'en doute."]
} as Record<string, string[]>

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/json/8ball",
        method: "GET"
    })
    @Endpoint.Query("text", {
        description: "The text to ask to the magic ball",
        type: aux.STRING(),
        required: true
    })
    @Endpoint.Query("idiom", {
        description: "The idiom",
        type: aux.LITERAL("en", "es", "pt", "fr")
    })
    async handler(ctx: Context) {
        const text: string = ctx.getParam("text"), idiom: string = ctx.getParam("idiom")

        if (!text) throw Endpoint.Error("Missing required parameter 'text'")
        if (!(idiom.toLowerCase() in RESPONSES))
            throw Endpoint.Error("Invalid idiom provided.")

        ctx.send({
            "question": text,
            "idiom": idiom.toLowerCase(),
            "response": RESPONSES[idiom.toLowerCase()].at(Math.floor(Math.random() * RESPONSES[idiom.toLowerCase()].length))
        })
    }
}