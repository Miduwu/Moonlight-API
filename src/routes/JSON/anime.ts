import { Context, Endpoint, aux } from "../../main";

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/json/anime",
        method: "GET"
    })
    @Endpoint.Query("type", {
        description: "The type of search",
        default: "anime",
        type: aux.LITERAL("anime", "manga")
    })
    @Endpoint.Query("query", {
        description: "What to search for",
        required: true,
        type: aux.STRING({ max: 1000, min: 1 })
    })
    @Endpoint.Query("limit", {
        description: "How many results should be returned? (Maximum is 10)",
        default: 10,
        type: aux.NUMBER({ min: 1, max: 10 })
    })
    async handler(ctx: Context) {
        const type: string = ctx.getParam("type"),
            query: string = ctx.getParam("query"),
            limit = ctx.getParam<number>("limit")

        if (!["anime", "manga"].includes(type.toLowerCase()))
            return Endpoint.Error("Invalid search type provided")

        const URL = `https://kitsu.io/api/edge/${type}?filter[text]=${query}&page[offset]=0`
        const request = await fetch(URL)

        if (!request.ok) throw Endpoint.Error("Cannot get a valid response.")

        const data = await request.json()
        
        ctx.send(data['data'].slice(0, limit))
    }
}