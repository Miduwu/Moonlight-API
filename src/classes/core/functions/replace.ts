import { FunctionError, getFunctionError } from '../index.js'
import { NativeFunction } from '../index.js'

export default new NativeFunction({
    name: 'replace',
    description: 'Replaces the first matched word in a text.',
    parameters: [
        {
            name: 'Text',
            description: 'Text to work on.',
            defo: 'none'
        },
        {
            name: 'Match',
            description: 'Word to be replaced.',
            defo: 'none'
        },
        {
            name: 'replacement',
            description: 'Word to be replaced with.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [text, match, replacement = ''] = d.function.compiled.fields.map(f => f.value)
        if (text === undefined)
            return new FunctionError(d, getFunctionError('Missing text', d.function.compiled))
        if (match === undefined)
            return new FunctionError(d, getFunctionError('Missing text', d.function.compiled))

        return text.replace(match, replacement)
    }
})
.setExample(`
{replace => HELLO WORLD:HELLO:BYE}
`)