import * as F from "fastify";
import { NumberOptions, StringOptions } from "./Parser";

export interface EndpointOptions {
    method: F.HTTPMethods
    path: string
    schema?: F.FastifySchema
    query?: Record<string, QueryOptions>
}

export type TYPES = "STRING" | "LITERAL" | "BOOLEAN" | "NUMBER"
export type ParamOptions = { schema: TYPES, options?: StringOptions | NumberOptions | string[] | number[] }

export interface QueryOptions {
    description?: string
    required?: boolean
    default?: any
    type: ParamOptions
}

export class APIError extends Error {
    constructor(message: string, options?: Record<string, any>) {
        super(message, options)
    }
}

export class Endpoint {
    options: EndpointOptions | null = null
    
    static Create(options: EndpointOptions) {
        return function (target: any, key: string, descriptor: PropertyDescriptor) {
            if(!descriptor.value.options) descriptor.value.options = options
            else {
                descriptor.value.options["method"] = options.method
                descriptor.value.options["path"] = options.path
            }
        }
    }

    static Query(name: string, options: QueryOptions) {
        return function(target: any, key: string, descriptor: PropertyDescriptor) {
            if(!descriptor.value.options) descriptor.value.options = {}
            if(!descriptor.value.options.query) descriptor.value!.options.query = {}
            descriptor.value.options.query[name] = options
        }
    }

    static Describe(description: string) {
        return function(target: any, key: string, descriptor: PropertyDescriptor) {
            if(!descriptor.value.options) descriptor.value.options = {}
            if(!descriptor.value.options.schema) descriptor.value!.options.schema = {}
            descriptor.value.options.schema.description = description
        }
    }

    static Error(message: string, options?: any) {
        return new APIError(message, options)
    }

    assign() {
        for(const key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), key)
            if(!descriptor || typeof descriptor.value !== "function" || !descriptor.value.options) continue;
            if(descriptor.value.options) this.options = descriptor.value.options
        }
        return this
    }
}