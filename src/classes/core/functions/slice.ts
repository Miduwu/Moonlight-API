import { FunctionError, getFunctionError, getFunctionSource, isNumberParseable } from '../index.js'
import { NativeFunction } from '../index.js'

export default new NativeFunction({
    name: 'slice',
    description: 'Get a part of a text, from X to Y.',
    parameters: [
        {
            name: 'Text',
            description: 'Text to be converted.',
            defo: 'none'
        },
        {
            name: 'From',
            description: 'Slicing start index.',
            defo: 'none'
        },
        {
            name: 'To',
            description: 'Slicing end index.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [text, from, to] = d.function.compiled.fields.map(f => f.value)
        if (text === undefined)
            return new FunctionError(d, getFunctionError('Missing text', d.function.compiled))
        if (d.function.compiled.fields.slice(1, 3).some(field => isNumberParseable(field.value) === false))
            return new FunctionError(d, `Invalid numbers provided in: "${getFunctionSource(d.function.compiled)}"`)
        
        return to ? text.slice(Number(from), Number(to)) : text.slice(Number(from))
    }
})
.setExample(`
{slice => HELLO WORLD:0:5}
`)