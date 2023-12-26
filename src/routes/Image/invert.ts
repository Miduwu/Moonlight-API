import { Context, Endpoint, Frame, aux } from "../../main";
import z from "zod";

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/image/invert",
        method: "GET"
    })
    @Endpoint.Query({
        image: z.string({ description: "The image to draw" }).url()
    })
    @Endpoint.Describe("Apply an invert filter to your image.")
    @Endpoint.Tags("Image")
    async handler(ctx: Context) {
        const img = new Frame(1024, 1024)

        const avatar = await Frame.loadImage(ctx.getParam("image")).catch(aux.noop)
        if(!avatar) return Endpoint.Error("Invalid image provided in: " + ctx.param.name)

        img.ctx.filter = "invert(100%)"
        img.drawImage(avatar, 0, 0, 1024, 1024)
        img.ctx.filter = "none"

        ctx.send(img.toBuffer(), { type: "image/png" })
    }
}