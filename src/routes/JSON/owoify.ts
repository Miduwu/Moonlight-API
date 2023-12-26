import { Context, Endpoint } from "../../main";
import z from "zod";

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/json/owoify",
        method: "GET"
    })
    @Endpoint.Tags("JSON")
    @Endpoint.Query({
        text: z.string({ description: "The text to owoif-r" })
    })
    async handler(ctx: Context) {
        ctx.send({
            "text": ctx.getParam("text"),
            "converted": ctx.getParam("text").replace(/(l|r)/g, "w").replace(/(L|R)/g, "W")
        })
    }
}