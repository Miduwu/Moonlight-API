import * as F from "fastify";
import { z as T } from "zod";

export interface EndpointOptions {
    method: F.HTTPMethods
    path: string
    schema?: F.FastifySchema
}

const JSONResponse = {
    "statusCode": T.number(),
    "data": T.any(),
    "success": T.boolean()
}

const ImageResponse = T.any()

const LeftResponses: Record<number, typeof JSONResponse> = {
    400: JSONResponse,
    405: JSONResponse,
    500: JSONResponse,
    422: JSONResponse,
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

    static Query(params: Record<string, any>) {
        return function(target: any, key: string, descriptor: PropertyDescriptor) {
            if(!descriptor.value.options) descriptor.value.options = {}
            if(!descriptor.value.options.schema) descriptor.value!.options.schema = {}
            descriptor.value.options.schema.querystring = T.object(params)
        }
    }

    static Tags(...tags: string[]) {
        return function(target: any, key: string, descriptor: PropertyDescriptor) {
            if(!descriptor.value.options) descriptor.value.options = {}
            if(!descriptor.value.options.schema) descriptor.value!.options.schema = {}
            descriptor.value.options.schema.tags = [...tags]
        }
    }

    static Body(params: Record<string, any>) {
        return function(target: any, key: string, descriptor: PropertyDescriptor) {
            if(!descriptor.value.options) descriptor.value.options = {}
            if(!descriptor.value.options.schema) descriptor.value!.options.schema = {}
            descriptor.value.options.schema.body = T.object(params)
        }
    }

    static Describe(description: string) {
        return function(target: any, key: string, descriptor: PropertyDescriptor) {
            if(!descriptor.value.options) descriptor.value.options = {}
            if(!descriptor.value.options.schema) descriptor.value!.options.schema = {}
            descriptor.value.options.schema.description = description
        }
    }

    static Error(...args: string[]) {
        return F.errorCodes.FST_ERR_VALIDATION(...args)
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