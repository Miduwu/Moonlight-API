import { FunctionError, getFunctionError, isNumberParseable } from '../index.js'
import { NativeFunction } from '../index.js'

export default new NativeFunction({
    name: 'isNumber',
    description: 'Check if the function inside is a valid number.',
    parameters: [
        {
            name: 'Number',
            description: 'Number to be tested.',
            defo: 'none'
        }
    ],
    async code(d) {
        const [inside] = d.function.compiled.fields.map(f => f.value)
        if (inside === undefined)
            return new FunctionError(d, getFunctionError('Missing number', d.function.compiled))

        return isNumberParseable(inside)
    }
})
.setExample(`
{isNumber => 69}
`)