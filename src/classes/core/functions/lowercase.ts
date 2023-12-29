import { FunctionError, getFunctionError } from '../index.js'
import { NativeFunction } from '../index.js'

export default new NativeFunction({
    name: 'lowercase',
    description: 'Converts a text to lowercase.',
    parameters: [
        {
            name: 'Text',
            description: 'Text to be converted.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [inside] = d.function.compiled.fields.map(f => f.value)
        if (inside === undefined)
            return new FunctionError(d, getFunctionError('Missing text', d.function.compiled))

        return inside.toLowerCase()
    }
})
.setExample(`
{lowercase => HELLO WORLD}
`)