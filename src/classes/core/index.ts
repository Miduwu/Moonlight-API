import { CompiledFunction } from './CompiledFunction.js'
import { Data } from './Data.js'

export * from './FunctionManager.js'
export * from './NativeFunction.js'
export * from './Interpreter.js'
export * from './Compiler.js'
export { Data }

export type CoreFunction = {
    description?: string,
    fields?: {
        name: string,
        description: string,
        level: 'required' | 'optional'
    }[],
    usage?: string,
    returns?: string,
    parse?: boolean[],
    run: (d: Data, ...args: string[]) => Promise<string | void>
}


/**
 * Check whether a string is parseable to number.
 * @param num - String to be tested.
 * @returns {boolean}
 */
export const isNumberParseable = (num: string) => !isNaN(Number(num))

/**
 * Get the string source of a function.
 * @param func - Compiled function.
 * @returns {string}
 */
export const getFunctionSource = (func: CompiledFunction) => `{${func.name} => ${func.fields.map(x => x.value).join(':')}}`

/**
 * Get the error message of a function.
 * @param message - Error message to be generated.
 * @param func - Compiled function.
 * @returns {string}
 */
export const getFunctionError = (message: string, func: CompiledFunction) => `${message} in: "${func.name}"`