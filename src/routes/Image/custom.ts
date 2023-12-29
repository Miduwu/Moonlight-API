import { Data, FunctionManager, Interpreter } from "../../classes/core/index"
import { Context, Endpoint, Frame, aux } from "../../main"

const FRAME_NAME = "$$__core__canvas__$$"
const FUNCTIONS = new FunctionManager;
FUNCTIONS.load()

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/image/custom",
        method: "POST"
    })
    async handler(ctx: Context) {
        const body = ctx.req.body as Record<string, string>
        if (!('code' in body)) return Endpoint.Error("Missing code to be evaluated!")

        let data = new Data({
            ctx, interpreter: new Interpreter,
            cache: {}, functions: FUNCTIONS
        })

        const d = await data.interpreter.parse(body.code, data)

        if (!(FRAME_NAME in data.cache) || !(data.cache[FRAME_NAME] instanceof Frame))
            return Endpoint.Error("Missing canvas to be sent!")

        ctx.send(data.cache[FRAME_NAME].toBuffer(), { type: "image/png" })
    }
}