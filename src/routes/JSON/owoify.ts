import { Context, Endpoint, aux } from "../../main";

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/json/owoify",
        method: "GET"
    })
    @Endpoint.Query("text", {
        description: "The text to owoify.",
        required: true,
        type: aux.STRING({ min: 1, max: 1000 })
    })
    async handler(ctx: Context) {
        ctx.send({
            "text": ctx.getParam("text"),
            "converted": ctx.getParam("text").replace(/(l|r)/g, "w").replace(/(L|R)/g, "W")
        })
    }
}