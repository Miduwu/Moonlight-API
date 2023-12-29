import { CompiledFunction } from './CompiledFunction'
import { CompiledString } from './CompiledString'

const testWord = (s: string) => /\w/.test(s)

export class Compiler {
    static compile(code: string) {
        const functions: CompiledFunction[] = [],
            result: CompiledString[] = []
        let func = new CompiledFunction,
            str = new CompiledString,
            depth = 0, type = 'text'
        for (let i = 0; i < code.length; i++) {
            const c = code[i], n = code[i + 1]

            if ('{' === c) depth++
            else if ('}' === c) depth--

            if ('text' === type) {
                if ('{' === c) {
                    type = 'function_name'
                    if (str.value !== '') {
                        result.push(str), str = new CompiledString
                    }
                } else str.write(c)
            } else if (type.startsWith('function')) {
                const mode = type.split('_')[1].trim()
                if ('name' === mode) {
                    if ('=' === c && '>' === n) {
                        func.update()
                        str = new CompiledString
                        type = 'function_param', i += 2
                    } else if (depth <= 1 && '}' === c) {
                        const over = new CompiledString
                        over.overwrite(`$FUNCTION_` + functions.length)
                        if (str.value !== '') {
                            func.attachParameter(str.value)
                            str = new CompiledString
                        }
                        if (func.name !== '') {
                            func.update()
                            functions.push(func)
                            result.push(over)
                            func = new CompiledFunction
                        }
                        type = 'text'
                    } else func.name += c
                } else if ('param' === mode) {
                    if (depth <= 0 && '}' === c) {
                        const over = new CompiledString
                        over.overwrite(`$FUNCTION_` + functions.length)
                        if (str.value !== '') {
                            func.attachParameter(str.value)
                            str = new CompiledString
                        }
                        if (func.name !== '') {
                            func.update()
                            functions.push(func)
                            result.push(over)
                            func = new CompiledFunction
                        }
                        type = 'text'
                    } else if (depth <= 1 && ':' === c) {
                        func.attachParameter(str.value)
                        str = new CompiledString
                    } else str.write(c)
                }
            }
        }
        if (str.value !== '') 
            result.push(str)
        if (func.name !== '') {
            func.update()
            functions.push(func)
        }
        return { result, functions }
    }
}

/*

{createCanvas => 200:400}

*/