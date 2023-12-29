import { FRAME_NAME, FunctionError, getFunctionError, getFunctionSource, isNumberParseable } from '../index.js'
import { Endpoint, Frame } from '../../../main.js'
import { NativeFunction } from '../index.js'

export default new NativeFunction({
    name: 'canvasCreate',
    description: 'Creates a new canvas to draw on.',
    parameters: [
        {
            name: 'Width',
            description: 'Canvas width.',
            defo: 'none'
        },
        {
            name: 'Height',
            description: 'Canvas height.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [width, height] = d.function.compiled.fields.map(t => t.value)
        if (width === undefined) return new FunctionError(d, getFunctionError('Missing canvas width', d.function.compiled))
        if (height === undefined) return new FunctionError(d, getFunctionError('Missing canvas height', d.function.compiled))
        if (d.function.compiled.fields.slice(2).some(field => isNumberParseable(field.value) === false))
            return new FunctionError(d, `Invalid numbers provided in: "${getFunctionSource(d.function.compiled)}"`)

        const frame = new Frame(Number(width), Number(height), {
            ctx: d.ctx
        })

        d.cache[FRAME_NAME] = frame
    }
})
.setExample(`
{canvasCreate => 400:600}
{drawRect => ...}
{drawText => ...}
`)