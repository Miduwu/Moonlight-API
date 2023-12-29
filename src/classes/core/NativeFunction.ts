import { Data } from "./Data"

export type FunctionOptions = {
    name: string,
    description: string,
    parameters?: {
        name: string,
        description: string,
        defo: string,
        unescape?: boolean,
        parse?: boolean
    }[],
    // ownerOnly?: boolean,
    code: (d: Data) => Promise<any>
}

export class NativeFunction {
    name: string
    description: string
    parameters?: {
        name: string,
        description: string,
        defo: string,
        unescape?: boolean,
        parse?: boolean
    }[]
    example?: string
    // ownerOnly?: boolean
    code: (d: Data) => Promise<any>
    constructor(options: FunctionOptions) {
        this.name = options.name
        this.description = options.description
        this.parameters = options.parameters
        // this.ownerOnly = options.ownerOnly
        this.code = options.code
    }

    /**
     * Set the example for this function.
     * @param example - Example to be attached to this function.
     */
    setExample(example: string) {
        this.example = example.trim().split('\n').map(t => t.trim()).join('\n')
        return this
    }
}