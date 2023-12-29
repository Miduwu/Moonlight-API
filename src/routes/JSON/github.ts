import { Context, Endpoint, aux } from "../../main";

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/json/github",
        method: "GET"
    })
    @Endpoint.Query("query", {
        description: "The query to use for the GitHub API.",
        required: true,
        type: aux.STRING({ min: 1, max: 100 })
    })
    @Endpoint.Query("type", {
        description: "What type of data should be returned",
        default: "repo",
        type: aux.LITERAL("user", "repo")
    })
    async handler(ctx: Context) {
        console.log(2)
        const type: string = ctx.getParam("type", "repo"), query: string = ctx.getParam("query")
        if (type === "user") {
            const result = await fetch(`https://api.github.com/users/${query}`)
            if (!result.ok) throw Endpoint.Error("Cannot get a valid response.")
            else ctx.send(await result.json())
        } else {
            const result = await fetch(`https://api.github.com/search/repositories?q=${query}&page=1&per_page=1`)
            if (!result.ok) throw Endpoint.Error("Cannot get a valid response.")
            else if ((await result.json()).total_count === "0") throw Endpoint.Error("400", "No results found.")
            else ctx.send(await result.json())
        }
    }
}