import { Context, Endpoint } from "../../main";
import z from "zod";

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/json/github",
        method: "GET"
    })
    @Endpoint.Tags("JSON")
    @Endpoint.Query({
        query: z.string({ description: "The query to search in GitHub." }),
        type: z.string({ description: "Type of data to be search." })
    })
    async handler(ctx: Context) {
        const type: string = ctx.getParam("type", "repo"), query: string = ctx.getParam("query")
        if (type === "url") {
            const result = await fetch(`https://api.github.com/users/${query}`)
            if (!result.ok) return Endpoint.Error("Cannot get a valid response.")
            else ctx.send(await result.json())
        } else {
            const result = await fetch(`https://api.github.com/search/repositories?q=${query}&page=1&per_page=1`)
            if (!result.ok) return Endpoint.Error("Cannot get a valid response.")
            else if ((await result.json()).total_count === "0") return Endpoint.Error("400", "No results found.")
            else ctx.send(await result.json())
        }
    }
}