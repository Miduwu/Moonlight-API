import { FunctionError, getFunctionError } from '../index.js'
import { NativeFunction } from '../index.js'

export default new NativeFunction({
    name: 'get',
    description: 'Retrieves a environment variable.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [name] = d.function.compiled.fields.map(f => f.value)
        if (name === undefined)
            return new FunctionError(d, getFunctionError('Missing variable name', d.function.compiled))
        if (!(name in d.cache))
            return new FunctionError(d, getFunctionError('Invalid variable name', d.function.compiled))

        return d.cache[name]
    }
})
.setExample(`
{let => width:{canvasWidth}}
{get => width}
`)