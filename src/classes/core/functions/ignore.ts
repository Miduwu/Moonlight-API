import { FunctionError, getFunctionError } from '../index.js'
import { NativeFunction } from '../index.js'

export default new NativeFunction({
    name: 'ignore',
    description: 'The inside of this function won\'t be executed.',
    parameters: [
        {
            name: 'inside',
            description: 'Function content.',
            parse: false,
            defo: 'none'
        }
    ],
    async code(d) {
        const [inside] = d.function.compiled.fields.map(f => f.value)
        if (inside === undefined)
            return new FunctionError(d, getFunctionError('Missing function inside', d.function.compiled))
    }
})
.setExample(`
{ignore =>
    Code inside "ignore" will not be executed.
    {let => height:{canvasHeight}}
}
`)