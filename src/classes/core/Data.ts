import { FunctionManager, Interpreter, NativeFunction } from './index.js'
import { CompiledFunction } from './CompiledFunction.js'
import { CompiledString } from './CompiledString.js'
import { Condition } from './Condition.js'
import { Context } from '../Context.js'

type DataOptions = {
    compiled?: {
        functions: CompiledFunction[],
        result: CompiledString[]
    }
    interpreter: Interpreter
    break?: boolean
    code?: string
    functions?: FunctionManager
    ctx: Context
    function?: {
        compiled: CompiledFunction,
        specification: NativeFunction
    }
    start?: number
    cache: Record<string, any>
}

export class Data {
    compiled!: {
        functions: CompiledFunction[],
        result: CompiledString[]
    }
    interpreter: Interpreter
    break: boolean
    code: string
    functions: FunctionManager
    ctx: Context
    function!: {
        compiled: CompiledFunction,
        specification: NativeFunction
    }
    start? = Date.now()
    condition = Condition
    cache: Record<string, any>
    constructor(options: DataOptions) {
        this.break = options.break ?? false
        this.code = options.code ?? ''
        this.function = options.function as {
            compiled: CompiledFunction,
            specification: NativeFunction
        }
        this.functions = options.functions ?? new FunctionManager
        this.interpreter = options.interpreter
        this.ctx = options.ctx
        this.cache = options.cache ?? {}
    }
    setCode(code: string) {
        this.code = code
        return this
    }
    extend(options: DataOptions) {
        return new Data(options)
    }
}