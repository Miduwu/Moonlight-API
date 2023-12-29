import { NativeFunction } from './NativeFunction'
import { Compiler } from './Compiler'
import { randomUUID } from 'crypto'
import { Data } from './Data'

const ESCAPERS = [
    ['{', '%LB%'],
    ['}', '%RB%'],
    [':', '%COLON%']
]
const Unescape = (t: string) => {
    for (const escaper of ESCAPERS) {
        t = t.replaceAll(escaper[1], escaper[0])
    }
    return t
}, Escape = (t: string) => {
    for (const escaper of ESCAPERS) {
        t = t.replaceAll(escaper[0], escaper[1])
    }
    return t
}

export class Interpreter {
    async parse(code: string, d: Data) {
        d.start = Date.now()
        const compiled = Compiler.compile(code)
        d.compiled = compiled
        let result = compiled.result.map(x => x.value), parsedFunctions: string[] = []
        for (let index = 0; index < compiled.functions.length; index++) {
            const token = compiled.functions[index]
            if (d.break) break
            if (!d.functions.has(token.name)) {
                if (token.fields.length < 1) {
                    const inside = token.fields.map(field => field.value).join(':')
                    const parsed = (await this.parse(inside, d)).code
                    parsedFunctions.push(token.over.replace(inside, parsed))
                } else parsedFunctions.push(token.over)
                continue
            }
            const params: string[] = [], func: NativeFunction = d.functions.get(token.name)
            d.function = { compiled: token, specification: func }
            if (token.fields.length > 0) {
                for (let i = 0; i < token.fields.length; i++) {
                    const data = d.extend({ ...d })
                    const field = token.fields[i],
                        specification = func.parameters?.[i],
                        dontParse = specification && 'parse' in specification && specification.parse === false,
                        dontUnescape = specification && 'unescape' in specification && specification.unescape === false,
                        parsed = dontParse ? field.value : (await this.parse(field.value, data)).code
                    params.push(dontUnescape ? parsed : Unescape(parsed))
                    token.fields[i].value = dontUnescape ? parsed : Unescape(parsed)
                }
            }
            const r = await func.code(d)
            parsedFunctions[parsedFunctions.length] = r === undefined ? '' : r
        }

        parsedFunctions.forEach((text, i) => {
            result[result.indexOf('$FUNCTION_' + i)] = text
        })
        d.setCode(Unescape(result.join('')))
        
        return d
    }
}