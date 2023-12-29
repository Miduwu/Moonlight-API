import { Context, Endpoint, Frame, aux } from "../../main";

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/image/communism",
        method: "GET"
    })
    @Endpoint.Query("image", {
        description: "The image to draw",
        required: true,
        type: aux.STRING({ essential: aux.Essentials.Image })
    })
    @Endpoint.Describe("Make a communism image")
    async handler(ctx: Context) {
        const img = new Frame(512, 512)
        const avatar = await Frame.loadImage(ctx.getParam("image")).catch(aux.noop)
        if(!avatar) return Endpoint.Error("Invalid image provided in: " + ctx.param.name)
        img.drawImage(avatar, 0, 0, 512, 512)
        img.drawImage(aux.getImage("communism")!, 0, 0, 512, 512)

        ctx.send(img.toBuffer(), { type: "image/png" })
    }
}