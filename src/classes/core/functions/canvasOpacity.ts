import { FRAME_NAME, FunctionError, getFunctionError, isNumberParseable } from '../index.js'
import { NativeFunction } from '../index.js'
import { Frame } from '../../../main.js'

export default new NativeFunction({
    name: 'canvasOpacity',
    description: 'Set the opacity for the next element to be printed.',
    parameters: [
        {
            name: 'Amount',
            description: 'Opacity amount between 0 and 100.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [amount] = d.function.compiled.fields.map(t => t.value)
        if (amount === undefined) return new FunctionError(d, getFunctionError('Missing opacity amount', d.function.compiled))
        if (!isNumberParseable(amount)) return new FunctionError(d, getFunctionError('Invalid opacity amount', d.function.compiled))
        if (!(d.cache[FRAME_NAME] instanceof Frame))
            return new FunctionError(d, 'Unable to find a canvas to draw on')

        const frame = d.cache[FRAME_NAME]
        const parsed = Number(amount)
        if (parsed < 0 || parsed > 100) return new FunctionError(d, getFunctionError('Invalid opacity amount', d.function.compiled))

        const resolve = (num: number) => num / 100
        frame.setAlpha(resolve(parsed))
    }
})
.setExample(`
{canvasOpacity => 50}
`)