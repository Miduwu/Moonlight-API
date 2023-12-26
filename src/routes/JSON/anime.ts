import { Context, Endpoint } from "../../main";
import z from "zod";

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/json/anime",
        method: "GET"
    })
    @Endpoint.Tags("JSON")
    @Endpoint.Query({
        type: z.string({ description: "The type of search" }),
        query: z.string({ description: "The anime/manga title to search" }),
        limit: z.string({ description: "The limit of results to show" })
    })
    async handler(ctx: Context) {
        const type: string = ctx.getParam("type"),
            query: string = ctx.getParam("query"),
            limit = Number(ctx.getParam("limit")) ?? 10

        const URL = `https://kitsu.io/api/edge/${type}?filter[text]=${query}&page[offset]=0`
        const request = await fetch(URL)

        if (!request.ok) return Endpoint.Error("Cannot get a valid response.")

        const data = await request.json()
        
        ctx.send(data['data'].slice(0, limit))
    }
}