import { FRAME_NAME, FunctionError, getFunctionError, getFunctionSource, isNumberParseable } from '../index.js'
import { NativeFunction } from '../index.js'
import { Frame } from '../../../main.js'

export default new NativeFunction({
    name: 'drawText',
    description: 'Draws a text over the canvas.',
    parameters: [
        {
            name: 'Text',
            description: 'Text to be draw.',
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
            description: 'Text box width.',
            defo: 'none'
        },
        {
            name: 'Height',
            description: 'Text box height.',
            defo: 'none'
        },
        {
            name: 'Align',
            description: 'Text align.',
            defo: 'left'
        },
        {
            name: 'Vertical align',
            description: 'Text vertical align.',
            defo: 'middle'
        }
    ],
    async code(d) {
        const [text, x, y, width, height, align = 'left', vAlign = 'middle'] = d.function.compiled.fields.map(t => t.value)
        if (text === undefined) return new FunctionError(d, getFunctionError('Missing text', d.function.compiled))
        if (x === undefined) return new FunctionError(d, getFunctionError('Missing X coordinate', d.function.compiled))
        if (y === undefined) return new FunctionError(d, getFunctionError('Missing Y coordinate', d.function.compiled))
        if (width === undefined) return new FunctionError(d, getFunctionError('Missing text box width', d.function.compiled))
        if (height === undefined) return new FunctionError(d, getFunctionError('Missing text box height', d.function.compiled))
        if (!['left', 'center', 'right'].includes(align.toLowerCase()))
            return new FunctionError(d, getFunctionError('Invalid text align', d.function.compiled))
        if (!['top', 'bottom', 'middle'].includes(vAlign.toLowerCase()))
            return new FunctionError(d, getFunctionError('Invalid text vertical align', d.function.compiled))
        if (d.function.compiled.fields.slice(1, 5).some(field => isNumberParseable(field.value) === false))
            return new FunctionError(d, `Invalid numbers provided in: "${getFunctionSource(d.function.compiled)}"`)
        if (!(d.cache[FRAME_NAME] instanceof Frame))
            return new FunctionError(d, 'Unable to find a canvas to draw on')

        const frame = d.cache[FRAME_NAME]

        frame.drawText(text, Number(x), Number(y), Number(width), Number(height), {
            box: true,
            align: align as any,
            vAlign: vAlign as any
        })
    }
})
.setExample(`
{drawImage => Hello world!:0:0:1024:1024:center:middle}
`)