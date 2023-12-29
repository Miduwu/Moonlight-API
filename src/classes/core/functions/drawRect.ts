import { FRAME_NAME, FunctionError, getFunctionError, getFunctionSource, isNumberParseable } from '../index.js'
import { NativeFunction } from '../index.js'
import { Frame } from '../../../main.js'

export default new NativeFunction({
    name: 'drawRect',
    description: 'Draws a rectangle over the canvas.',
    parameters: [
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
            description: 'Rectangle width.',
            defo: 'none'
        },
        {
            name: 'Height',
            description: 'Rectangle height.',
            defo: 'none'
        },
        {
            name: 'Radius',
            description: 'Rectangle corner radius.',
            defo: '0'
        }
    ],
    async code(d) {
        const [x, y, width, height, radius = '0'] = d.function.compiled.fields.map(t => t.value)
        if (x === undefined) return new FunctionError(d, getFunctionError('Missing X coordinate', d.function.compiled))
        if (y === undefined) return new FunctionError(d, getFunctionError('Missing Y coordinate', d.function.compiled))
        if (width === undefined) return new FunctionError(d, getFunctionError('Missing image width', d.function.compiled))
        if (height === undefined) return new FunctionError(d, getFunctionError('Missing image height', d.function.compiled))
        if (d.function.compiled.fields.slice(0, 5).some(field => isNumberParseable(field.value) === false))
            return new FunctionError(d, `Invalid numbers provided in: "${getFunctionSource(d.function.compiled)}"`)
        if (!(d.cache[FRAME_NAME] instanceof Frame))
            return new FunctionError(d, 'Unable to find a canvas to draw on')

        const frame = d.cache[FRAME_NAME]

        frame.drawRectangle(Number(x), Number(y), Number(width), Number(height), { radius: Number(radius) })
    }
})
.setExample(`
{drawRect => 0:0:1024:1024:60}
`)