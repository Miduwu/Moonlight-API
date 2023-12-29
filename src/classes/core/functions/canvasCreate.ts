import { getFunctionError, getFunctionSource, isNumberParseable } from '../index.js'
import { Endpoint, Frame } from '../../../main.js'
import { NativeFunction } from '../index.js'

export default new NativeFunction({
    name: 'canvasCreate',
    description: 'Creates a new canvas to draw on.',
    async code(d) {
        const [width, height] = d.function.compiled.fields.map(t => t.value)
        if (width === undefined) return Endpoint.Error(getFunctionError('Missing canvas width', d.function.compiled))
        if (height === undefined) return Endpoint.Error(getFunctionError('Missing canvas height', d.function.compiled))
        if (d.function.compiled.fields.slice(2).some(field => isNumberParseable(field.value) === false))
            return Endpoint.Error(`Invalid numbers provided in: "${getFunctionSource(d.function.compiled)}"`)

        const frame = new Frame(Number(width), Number(height), {
            ctx: d.ctx
        })

        d.cache['$$__core__canvas__$$'] = frame
    }
})
.setExample(`
{canvasCreate => 400:600}
{drawRect => ...}
{drawText => ...}
`)