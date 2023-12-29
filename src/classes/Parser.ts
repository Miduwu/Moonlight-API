import { Auxiliar } from "./Auxiliar";
import { Endpoint } from "./Endpoint";
import { loadImage } from "@napi-rs/canvas";

export type StringOptions = { min?: number, max?: number, essential?: StringEssentials, isIn?: string[] }
export type NumberOptions = { min?: number, max?: number, noDecimals?: boolean }

export enum StringEssentials { Link, Image, Color }

/**
 * Check if the given string is a valid hex code.
 * @param hex - The string to be tested.
 * @returns {boolean}
 */
function isHex(hex: string) {
    const regex = /#?([A-F0-9]{3}|[[A-F0-9]{6}])/ig
    return regex.test(hex)
}

/**
 * Check if the given string is a valid URL.
 * @param hex - The string to be tested.
 * @returns {boolean}
 */
function isURL(url: string) {
    const regex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g
    return regex.test(url)
}

export class Parser {
    public aux: Auxiliar;
    constructor(aux: Auxiliar) {
        this.aux = aux
    }
    // pending: return null => throw Endpoint.Error()
    async STRING(paramName: string, body: string, options?: StringOptions) {
        if(options?.isIn && !(body in options.isIn)) throw Endpoint.Error(`Invalid string, not in allowed values, in: ${paramName}`)
        if(options?.max && body.length > options.max) throw Endpoint.Error(`Invalid string, max is ${options.max}, in: ${paramName}`)
        if(options?.min && body.length < options.min) throw Endpoint.Error(`Invalid string, min is ${options.max}, in: ${paramName}`)
        if(options?.essential === StringEssentials.Color && !isHex(body)) throw Endpoint.Error(`Invalid string, it has to be a color, in: ${paramName}`)
        else if(options?.essential === StringEssentials.Link && !isURL(body)) throw Endpoint.Error(`Invalid string, it has to be a link, in: ${paramName}`)
        else if(options?.essential === StringEssentials.Image) {
            let b = await loadImage(body, { maxRedirects: 2 }).catch(this.aux.noop)
            if(!b) throw Endpoint.Error(`Invalid string, it has to be a valid image URL, in: ${paramName}`)
            else return b
        }
        return body
    }

    NUMBER(paramName: string, body: string, options?: NumberOptions) {
        if(body.replace(/[\d.-]/g, "")) throw Endpoint.Error(`Invalid number in: ${paramName}`)
        let loaded = Number(body)
        if(isNaN(loaded)) throw Endpoint.Error(`Invalid number in: ${paramName}`)
        if(options?.noDecimals && body.includes(".")) throw Endpoint.Error(`Invalid number, decimals are not allowed in: ${paramName}`)
        if(options?.max && options.max > loaded) throw Endpoint.Error(`Invalid number, max is ${options.max} in: ${paramName}`)
        if(options?.min && options.min < loaded) throw Endpoint.Error(`Invalid number, min is ${options.min} in: ${paramName}`)
        return loaded
    }

    BOOLEAN(paramName: string, body: string) {
        if(!(/true|false|yes|no/gi)) throw Endpoint.Error(`Invalid boolean in: ${paramName}`)
        return /true|ye/gi.test(body) ? true: false
    }

    LITERAL(paramName: string, body: string, ...literals: any[]) {
        if(typeof literals[0] == "number") {
            let n = this.NUMBER(paramName, body)
            if(!(n! in literals)) throw Endpoint.Error(`Invalid literal, allowed: (${literals.join(", ")}) in: ${paramName}`)
            return n
        } else {
            if(!(body.toLowerCase() in literals)) throw Endpoint.Error(`Invalid literal, allowed: (${literals.join(", ")}) in: ${paramName}`)
            return body.toLowerCase()
        }
    }

}