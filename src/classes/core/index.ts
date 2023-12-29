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

/**
 * Represents the name of the error message.
 */
export const ERROR_NAME = "$$__core__error__$$";

/**
 * Represents the name of the canvas.
 */
export const FRAME_NAME = "$$__core__canva__$$";

/**
 * Throws a function error.
 */
export class FunctionError {
    /**
     * @param data - Interpreter data.
     * @param message - Error message.
     */
    constructor(data: Data, message: string) {
        data.break = true
        data.ctx.send({ message }, { status: 400, success: false })
    }
}