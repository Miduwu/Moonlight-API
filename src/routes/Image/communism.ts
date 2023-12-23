import { Context, Endpoint, Frame, aux } from "../../main";
import z from "zod";

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/image/communism",
        method: "GET"
    })
    @Endpoint.Query({
        image: z.string({ description: "The image to draw" }).url()
    })
    @Endpoint.Describe("Make a communism image")
    @Endpoint.Tags("Image")
    async handler(ctx: Context) {
        const img = new Frame(512, 512)
        const avatar = await Frame.loadImage(ctx.getParam("image")).catch(aux.noop)
        if(!avatar) return Endpoint.Error("Invalid image provided in: " + ctx.param.name)
        img.drawImage(avatar, 0, 0, 512, 512)
        img.drawImage(aux.getImage("communism")!, 0, 0, 512, 512)

        ctx.send(img.toBuffer(), { type: "image/png" })
    }
}