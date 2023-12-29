import { FunctionError, getFunctionError } from '../index.js'
import { NativeFunction } from '../index.js'

export default new NativeFunction({
    name: 'let',
    description: 'Creates a environment variable.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            defo: 'none'
        },
        {
            name: 'Value',
            description: 'Variable value.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [name, value] = d.function.compiled.fields.map(f => f.value)
        if (name === undefined)
            return new FunctionError(d, getFunctionError('Missing variable name', d.function.compiled))
        if (value === undefined)
            return new FunctionError(d, getFunctionError('Missing variable value', d.function.compiled))

        d.cache[name] = value
    }
})
.setExample(`
{let => width:{canvasWidth}}
`)