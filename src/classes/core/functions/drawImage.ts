import { getFunctionError, getFunctionSource, isNumberParseable } from '../index.js'
import { Endpoint, Frame } from '../../../main.js'
import { NativeFunction } from '../index.js'

const FRAME_NAME = "$$__core__canvas__$$"

export default new NativeFunction({
    name: 'drawImage',
    description: 'Draws an image over the canvas.',
    async code(d) {
        const [id, x, y, width, height] = d.function.compiled.fields.map(t => t.value)
        if (id === undefined) return Endpoint.Error(getFunctionError('Missing image ID', d.function.compiled))
        if (x === undefined) return Endpoint.Error(getFunctionError('Missing X coordinate', d.function.compiled))
        if (y === undefined) return Endpoint.Error(getFunctionError('Missing Y coordinate', d.function.compiled))
        if (width === undefined) return Endpoint.Error(getFunctionError('Missing image width', d.function.compiled))
        if (height === undefined) return Endpoint.Error(getFunctionError('Missing image height', d.function.compiled))
        if (d.function.compiled.fields.slice(1, 5).some(field => isNumberParseable(field.value) === false))
            return Endpoint.Error(`Invalid numbers provided in: "${getFunctionSource(d.function.compiled)}"`)
        if (!d.cache.images || !d.cache.images.has(id))
            return Endpoint.Error(getFunctionError('Invalid image ID', d.function.compiled))
        if (!(FRAME_NAME in d.cache) || !(d.cache[FRAME_NAME] instanceof Frame))
            return Endpoint.Error('Unable to find a canvas to draw on')

        const image = d.cache.images.get(id), frame = d.cache[FRAME_NAME]

        frame.drawImage(image, Number(x), Number(y), Number(width), Number(height))
    }
})
.setExample(`
{loadImage => AVATAR:https%COLON%//www.zooniverse.org/assets/simple-avatar.png}
{loadImage => BACKGROUND:https%COLON%//wallpaperaccess.com/full/5578377.png}
`)