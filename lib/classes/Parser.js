"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = exports.isHex = exports.StringEssentials = void 0;
const Endpoint_1 = require("./Endpoint");
const canvas_1 = require("@napi-rs/canvas");
var StringEssentials;
(function (StringEssentials) {
    StringEssentials[StringEssentials["Link"] = 0] = "Link";
    StringEssentials[StringEssentials["Image"] = 1] = "Image";
    StringEssentials[StringEssentials["Color"] = 2] = "Color";
})(StringEssentials || (exports.StringEssentials = StringEssentials = {}));
function isHex(hex) {
    const regex = /#?([A-F0-9]{3}|[[A-F0-9]{6}])/ig;
    return regex.test(hex);
}
exports.isHex = isHex;
function isURL(url) {
    const regex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
    return regex.test(url);
}
class Parser {
    aux;
    constructor(aux) {
        this.aux = aux;
    }
    async STRING(paramName, body, options) {
        if (options?.isIn && !(body in options.isIn))
            throw Endpoint_1.Endpoint.Error(`Invalid string, not in allowed values, in: ${paramName}`);
        if (options?.max && body.length > options.max)
            throw Endpoint_1.Endpoint.Error(`Invalid string, max is ${options.max}, in: ${paramName}`);
        if (options?.min && body.length < options.min)
            throw Endpoint_1.Endpoint.Error(`Invalid string, min is ${options.max}, in: ${paramName}`);
        if (options?.essential === StringEssentials.Color && !isHex(body))
            throw Endpoint_1.Endpoint.Error(`Invalid string, it has to be a color, in: ${paramName}`);
        else if (options?.essential === StringEssentials.Link && !isURL(body))
            throw Endpoint_1.Endpoint.Error(`Invalid string, it has to be a link, in: ${paramName}`);
        else if (options?.essential === StringEssentials.Image) {
            let b = await (0, canvas_1.loadImage)(body, { maxRedirects: 2 }).catch(this.aux.noop);
            if (!b)
                throw Endpoint_1.Endpoint.Error(`Invalid string, it has to be a valid image URL, in: ${paramName}`);
            else
                return b;
        }
        return body;
    }
    NUMBER(paramName, body, options) {
        if (body.replace(/[\d.-]/g, ""))
            throw Endpoint_1.Endpoint.Error(`Invalid number in: ${paramName}`);
        let loaded = Number(body);
        if (isNaN(loaded))
            throw Endpoint_1.Endpoint.Error(`Invalid number in: ${paramName}`);
        if (options?.noDecimals && body.includes("."))
            throw Endpoint_1.Endpoint.Error(`Invalid number, decimals are not allowed in: ${paramName}`);
        if (options?.max && options.max > loaded)
            throw Endpoint_1.Endpoint.Error(`Invalid number, max is ${options.max} in: ${paramName}`);
        if (options?.min && options.min < loaded)
            throw Endpoint_1.Endpoint.Error(`Invalid number, min is ${options.min} in: ${paramName}`);
        return loaded;
    }
    BOOLEAN(paramName, body) {
        if (!(/true|false|yes|no/gi))
            throw Endpoint_1.Endpoint.Error(`Invalid boolean in: ${paramName}`);
        return /true|ye/gi.test(body) ? true : false;
    }
    LITERAL(paramName, body, ...literals) {
        if (typeof literals[0] == "number") {
            let n = this.NUMBER(paramName, body);
            if (!(n in literals))
                throw Endpoint_1.Endpoint.Error(`Invalid literal, allowed: (${literals.join(", ")}) in: ${paramName}`);
            return n;
        }
        else {
            if (!(body.toLowerCase() in literals))
                throw Endpoint_1.Endpoint.Error(`Invalid literal, allowed: (${literals.join(", ")}) in: ${paramName}`);
            return body.toLowerCase();
        }
    }
}
exports.Parser = Parser;
