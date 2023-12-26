import { Context, Endpoint } from "../../main";
import z from "zod";

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/json/country",
        method: "GET"
    })
    @Endpoint.Tags("JSON")
    @Endpoint.Query({
        query: z.string({ description: "The country exact name." }),
    })
    async handler(ctx: Context) {
        const name: string = ctx.getParam("query")

        const request = await fetch(`https://restcountries.com/v3.1/name/${name}`)
        if (!request.ok) return Endpoint.Error("Cannot get a valid response.")

        const data = await request.json() as Datum[]
        if (data.length === 0) return Endpoint.Error("Cannot find a country with that name.")

        ctx.send(data[0])
    }
}

/**
 * Thanks to https://quicktype.io ;)
 */
export interface Datum {
    name:         Name;
    tld:          string[];
    cca2:         string;
    ccn3:         string;
    cca3:         string;
    cioc:         string;
    independent:  boolean;
    status:       string;
    unMember:     boolean;
    currencies:   Currencies;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       string;
    subregion:    string;
    languages:    Languages;
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    borders:      string[];
    area:         number;
    demonyms:     Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    gini:         Gini;
    fifa:         string;
    car:          Car;
    timezones:    string[];
    continents:   string[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  string;
    capitalInfo:  CapitalInfo;
    postalCode:   PostalCode;
}

export interface CapitalInfo {
    latlng: number[];
}

export interface Car {
    signs: string[];
    side:  string;
}

export interface CoatOfArms {
    png: string;
    svg: string;
}

export interface Currencies {
    MXN: Mxn;
}

export interface Mxn {
    name:   string;
    symbol: string;
}

export interface Demonyms {
    eng: Eng;
    fra: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export interface Gini {
    "2018": number;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}

export interface Languages {
    spa: string;
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: NativeName;
}

export interface NativeName {
    spa: Translation;
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: string;
    regex:  string;
}