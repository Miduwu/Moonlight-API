import { FRAME_NAME, FunctionError, getFunctionError, getFunctionSource } from '../index.js'
import { NativeFunction } from '../index.js'
import { Frame } from '../../../main.js'
import { isHex } from '../../Parser.js'

export default new NativeFunction({
    name: 'canvasFillStyle',
    description: 'Set the fill style for the canvas.',
    parameters: [
        {
            name: 'Hex',
            description: 'Hex color.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [hex] = d.function.compiled.fields.map(t => t.value)
        if (hex === undefined) return new FunctionError(d, getFunctionError('Missing hexadecimal color', d.function.compiled))
        if (!isHex(hex)) return new FunctionError(d, `Invalid hexadecimal code provided in: "${getFunctionSource(d.function.compiled)}"`)
        if (!(d.cache[FRAME_NAME] instanceof Frame))
            return new FunctionError(d, 'Unable to find a canvas to draw on')

        const frame = d.cache[FRAME_NAME]

        frame.setFillStyle('#' + hex.replaceAll('#', '').trim())
    }
})
.setExample(`
{canvasFillStyle => #FF0000}
`)