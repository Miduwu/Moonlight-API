import { FRAME_NAME, FunctionError, getFunctionError, getFunctionSource, isNumberParseable } from '../index.js'
import { NativeFunction } from '../index.js'
import { Frame } from '../../../main.js'

export default new NativeFunction({
    name: 'drawImage',
    description: 'Draws an image over the canvas.',
    parameters: [
        {
            name: 'ID',
            description: 'Image ID',
            defo: 'none'
        },
        {
            name: 'X',
            description: 'X coordinate.',
            defo: 'none'
        },
        {
            name: 'Y',
            description: 'Y coordinate.',
            defo: 'none'
        },
        {
            name: 'Width',
            description: 'Image width.',
            defo: 'none'
        },
        {
            name: 'Height',
            description: 'Image height.',
            defo: 'none'
        },
        {
            name: 'Radius',
            description: 'Image corner radius.',
            defo: '0'
        }
    ],
    async code(d) {
        const [id, x, y, width, height, radius = '0'] = d.function.compiled.fields.map(t => t.value)
        if (id === undefined) return new FunctionError(d, getFunctionError('Missing image ID', d.function.compiled))
        if (x === undefined) return new FunctionError(d, getFunctionError('Missing X coordinate', d.function.compiled))
        if (y === undefined) return new FunctionError(d, getFunctionError('Missing Y coordinate', d.function.compiled))
        if (width === undefined) return new FunctionError(d, getFunctionError('Missing image width', d.function.compiled))
        if (height === undefined) return new FunctionError(d, getFunctionError('Missing image height', d.function.compiled))
        if (d.function.compiled.fields.slice(1, 6).some(field => isNumberParseable(field.value) === false))
            return new FunctionError(d, `Invalid numbers provided in: "${getFunctionSource(d.function.compiled)}"`)
        if (!d.cache.images || !d.cache.images.has(id))
            return new FunctionError(d, getFunctionError('Invalid image ID', d.function.compiled))
        if (!(d.cache[FRAME_NAME] instanceof Frame))
            return new FunctionError(d, 'Unable to find a canvas to draw on')

        const image = d.cache.images.get(id), frame = d.cache[FRAME_NAME]

        frame.drawImage(image, Number(x), Number(y), Number(width), Number(height), { radius: Number(radius) })
    }
})
.setExample(`
{loadImage => AVATAR:https%COLON%//www.zooniverse.org/assets/simple-avatar.png}
{drawImage => AVATAR:0:0:1024:1024}
`)