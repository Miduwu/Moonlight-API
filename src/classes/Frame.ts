import { createCanvas, Image, SKRSContext2D as Magic, Canvas, loadImage } from "@napi-rs/canvas";
import { Context } from "./Context";

export type DrawImageOptions = { radius?: number, isCircle?: boolean }
export type DrawRectangleOptions = { radius?: number }
export type DrawTextOptions = { box?: boolean, align?: "right" | "left" | "center", vAlign?: "top" | "bottom" | "middle" }

class Frame {
    canvas: Canvas;
    ctx: Magic;
    currentRotation: number = 0;
    context?: Context;
    width: number;
    height: number;
    constructor(width: number, height: number, options?: { ctx?: Context, background?: string | CanvasGradient }) {
        this.canvas = createCanvas(width, height)
        this.ctx = this.canvas.getContext("2d")
        this.width = width
        this.height = height
        if(options?.ctx) this.context = options.ctx
        if(options?.background) {
            this.setFillStyle(options.background)
            this.drawRectangle(0, 0, width, height)
        }
    }

    static async loadImage(body: any) {
        return await loadImage(body, { requestOptions: { timeout: 5000 } }).catch(e=>null)
    }

    toBuffer(mime: any = "image/png") {
        return this.canvas.toBuffer(mime)
    }

    drawImage(image: Image, x: number, y: number, width: number, height: number, options?: DrawImageOptions) {
        let radius = options?.radius || 0
        this.ctx.save()
        if(options?.isCircle) {
            this.ctx.beginPath();
            this.ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.clip();
            this.ctx.drawImage(image, x, y, width, height);
        } else {
            this.ctx.beginPath()
		    this.ctx.moveTo(x + radius, y)
		    this.ctx.lineTo(x + width - radius, y)
		    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
		    this.ctx.lineTo(x + width, y + height - radius)
		    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
		    this.ctx.lineTo(x + radius, y + height)
		    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
		    this.ctx.lineTo(x, y + radius)
		    this.ctx.quadraticCurveTo(x, y, x + radius, y)
		    this.ctx.closePath()
            this.ctx.clip()
            this.ctx.drawImage(image, x, y, width, height)
            this.ctx.restore()
            this.ctx.save()
        }
    }

    drawRectangle(x: number, y: number, width: number, height: number, options?: DrawRectangleOptions) {
        let radius = options?.radius || 0
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.arcTo(x + width, y, x + width, y + radius, radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.arcTo(x, y + height, x, y + height - radius, radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.arcTo(x, y, x + radius, y, radius);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawText(text: string, x: number, y: number, width: number, height: number, options: DrawTextOptions = { box: false, align: "right" }) {
        if(options?.box) {
            const SIZE = Number(this.ctx.font.match(/[\d]{1,5}px/g)![0].replace('px', ''))
            if (width <= 0 || height <= 0 || SIZE <= 0) return
            const xEnd = x + width
            const yEnd = y + height
            let txtY = y + height / 2 + SIZE / 2
            let textanchor: number;
            if(options.align === "right") {
                textanchor = xEnd
                this.ctx.textAlign = "right"
            } else if (options.align === "left") {
                textanchor = x
                this.ctx.textAlign = "left"
            } else {
                textanchor = x + width / 2
                this.ctx.textAlign = "center"
            }
            let textarray: string[] = []
            let temptextarray = text.split('\n')
            temptextarray.forEach(txtt => {
                let textwidth = this.ctx.measureText(txtt).width
                if(textwidth <= width) {
                    textarray.push(txtt)
                } else {
                    let temptext = txtt
                    let linelen = width
                    let textlen
                    let textpixlen
                    let texttoprint
                    textwidth = this.ctx.measureText(temptext).width
                    while(textwidth > linelen) {
                        textlen = 0
                        textpixlen = 0
                        texttoprint = ""
                        while(textpixlen < linelen) {
                            textlen++
                            texttoprint = temptext.substr(0, textlen)
                            textpixlen = this.ctx.measureText(temptext.substr(0, textlen)).width
                        }
                        textlen--
                        texttoprint = texttoprint.substr(0, textlen)
                        const backup = textlen
                        if(temptext.substr(textlen, 1) != ' ') {
                            while(temptext.substr(textlen, 1) != ' ' && textlen != 0) {
                                textlen--
                            }
                            if(textlen == 0) textlen = backup
                            texttoprint = temptext.substr(0, textlen)
                        }
                        temptext = temptext.substr(textlen)
                        textwidth = this.ctx.measureText(temptext).width
                        textarray.push(texttoprint)
                    }
                    if (textwidth > 0) textarray.push(temptext)
                }
            })
            const charHeight = this.getTextHeight(text, this.ctx.font) //close approximation of height with width
            const vheight = charHeight * (textarray.length - 1)
            const negoffset = vheight / 2
            // Vertical Align
            if (options.vAlign === 'top') txtY = y + SIZE
            else if (options.vAlign === 'bottom') {
                txtY = yEnd - vheight
            } else {
                //defaults to center
                txtY -= negoffset
            }
            textarray.forEach(txtline => {
                txtline = txtline.trim()
                this.ctx.fillText(txtline, textanchor, txtY)
                txtY += charHeight
            })
        }
    }

    getTextHeight(text: string, style: string): number {
        const previousTextBaseline = this.ctx.textBaseline
        const previousFont = this.ctx.font
    
        this.ctx.textBaseline = 'bottom'
        this.ctx.font = style
        const { actualBoundingBoxAscent: height1, actualBoundingBoxDescent: height2 } = this.ctx.measureText(text)
    
        this.ctx.textBaseline = previousTextBaseline
        this.ctx.font = previousFont
        return height1 + height2 + 1.7
    }

    setAlpha(opacity: number) {
        this.ctx.globalAlpha = opacity
    }

    setFillStyle(payload: CanvasGradient | string) {
        this.ctx.fillStyle = payload
    }

    setStrokeStyle(payload: CanvasGradient | string) {
        this.ctx.strokeStyle = payload
    }

    setFont(font: string) {
        this.ctx.font = font
    }

    getMetrics(text: string) {
        this.ctx.measureText(text)
    }

    setRotation(angle: number) {
        this.ctx.rotate((angle === 0 ? -this.currentRotation: angle) * Math.PI / 180)
        this.currentRotation = angle
    }
}

export { Frame, Image, Magic }