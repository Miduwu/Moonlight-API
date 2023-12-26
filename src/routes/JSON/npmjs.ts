import { Context, Endpoint } from "../../main";
import z from "zod";

export class Route extends Endpoint {
    @Endpoint.Create({
        path: "/json/npm",
        method: "GET"
    })
    @Endpoint.Tags("JSON")
    @Endpoint.Query({
        query: z.string({ description: "The package name (exact match)" }),
    })
    async handler(ctx: Context) {
        const query: string = ctx.getParam("query")

        if (!query) return Endpoint.Error("Missing required parameter 'query'")
        
        const request = await fetch(`https://registry.npmjs.org/${query.toLowerCase().replaceAll(' ', '-')}`)
        if (!request.ok) return Endpoint.Error("Cannot get a valid response.")

        const data = await request.json() as NPMData

        ctx.send(data)
    }
}

export interface NPMData {
    _id:            ID;
    _rev:           string;
    time:           { [key: string]: Date };
    name:           ID;
    "dist-tags":    DistTags;
    versions:       Versions;
    maintainers:    Maintainer[];
    keywords:       string[];
    license:        string;
    readme:         string;
    readmeFilename: string;
    description:    string;
    contributors:   WelcomeAuthor[];
    author:         WelcomeAuthor;
}

export enum ID {
    Erine = "erine",
}

export interface WelcomeAuthor {
    name:  AuthorName;
    email: AuthorEmail;
    url:   string;
}

export enum AuthorEmail {
    CyberghxstPetalmailCOM = "cyberghxst@petalmail.com",
    MiduwuUsersNoreplyGithubCOM = "Miduwu@users.noreply.github.com",
}

export enum AuthorName {
    Cyberghxst = "Cyberghxst",
    Mid = "Mid",
}

export interface DistTags {
    latest: string;
    dev:    string;
    adv:    string;
}

export interface Maintainer {
    name:  MaintainerName;
    email: MaintainerEmail;
}

export enum MaintainerEmail {
    CyberghxstPetalmailCOM = "cyberghxst@petalmail.com",
    WillzdadOutlookCOM = "Willzdad@outlook.com",
}

export enum MaintainerName {
    Cyberghxstuwu = "cyberghxstuwu",
    Midowo = "midowo",
}

export interface Versions {
    "1.0.0":              The100;
    "1.0.1":              The101;
    "1.0.2":              The101;
    "1.0.3":              The101;
    "1.0.4":              The101;
    "1.0.5":              The101;
    "1.0.6":              The101;
    "1.0.7":              The101;
    "1.0.8":              The101;
    "1.0.9":              The101;
    "1.1.0":              The101;
    "1.1.1":              The101;
    "1.1.2":              The101;
    "1.1.3":              The101;
    "1.1.4":              The101;
    "1.11.4":             The101;
    "1.12.4":             The101;
    "1.13.4":             The101;
    "1.1.41":             The114;
    "1.1.42":             The114;
    "1.1.43":             The11;
    "1.1.5":              The11;
    "2.0.0":              The200;
    "3.0.0-dev":          Dev;
    "3.0.1-dev":          Dev;
    "3.0.2-dev":          Dev;
    "3.0.4-dev":          Dev;
    "3.0.5-dev":          Dev;
    "3.0.6-dev":          Dev;
    "3.0.7-dev":          Dev;
    "3.0.8-dev":          Dev;
    "3.0.10-dev":         Dev;
    "3.0.11-dev":         Dev;
    "2.0.111-dev":        The2011_Dev;
    "3.1.0-dev":          Dev;
    "3.2.0-dev":          Dev;
    "3.3.0-dev":          Dev;
    "3.4.0-dev":          The340Dev;
    "3.5.0-dev":          The100_Adv;
    "1.0.0-adv":          The100_Adv;
    "1.1.0-adv":          The110_Adv;
    "2.0.117-dev":        The2011_Dev;
    "2.0.118-dev":        The2011_Dev;
    "2.0.119-dev":        The2011_Dev;
    "2.0.1191-dev":       The2011_Dev;
    "1.2.0-adv":          The110_Adv;
    "1.2.1-adv":          The110_Adv;
    "1.2.2-adv":          The110_Adv;
    "2.1.0":              The21;
    "2.1.1":              The21;
    "1.2.2-adv.delivery": The110_Adv;
    "2.5.0":              The25;
    "2.5.1":              The25;
    "2.5.2":              The25;
    "1.2.3-adv":          The110_Adv;
    "1.2.4-adv":          The110_Adv;
    "1.2.6-adv":          The12_Adv;
    "2.6.0":              The26;
    "2.6.1":              The26;
    "2.6.5":              The26;
    "2.6.6":              The26;
    "1.2.7-adv":          The12_Adv;
    "1.2.8-adv":          The12_Adv;
}

export interface The100 {
    name:                    ID;
    version:                 string;
    description:             string;
    main:                    string;
    scripts:                 The100_Scripts;
    repository:              Repository;
    keywords:                any[];
    author:                  string;
    license:                 License;
    bugs:                    Bugs;
    homepage:                string;
    dependencies:            The100_Dependencies;
    gitHead:                 string;
    _id:                     string;
    _nodeVersion:            The100__NodeVersion;
    _npmVersion:             The100__NpmVersion;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              Deprecated;
}

export enum The100__NodeVersion {
    The16142 = "16.14.2",
    The16181 = "16.18.1",
    The1670 = "16.7.0",
    The1870 = "18.7.0",
}

export interface NpmOperationalInternal {
    host: Host;
    tmp:  string;
}

export enum Host {
    S3NpmRegistryPackages = "s3://npm-registry-packages",
}

export enum The100__NpmVersion {
    The7203 = "7.20.3",
    The8150 = "8.15.0",
    The8192 = "8.19.2",
    The850 = "8.5.0",
}

export interface Bugs {
    url: string;
}

export interface The100_Dependencies {
    axios:             string;
    "discord.js":      string;
    "gradient-string": string;
    midb:              string;
    tablite:           string;
}

export enum Deprecated {
    UnsupportedVersionUseLatestInstead = "Unsupported version, use latest instead.",
}

export interface Directories {
}

export interface Dist {
    integrity:        string;
    shasum:           string;
    tarball:          string;
    fileCount:        number;
    unpackedSize:     number;
    signatures:       Signature[];
    "npm-signature"?: string;
}

export interface Signature {
    keyid: Keyid;
    sig:   string;
}

export enum Keyid {
    SHA256Jl3Bwswu80PjjokCgh0O2W5C2U4LhQAE57Gj9Cz1KzA = "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA",
}

export enum License {
    ISC = "ISC",
}

export interface Repository {
    type: Type;
    url:  URL;
}

export enum Type {
    Git = "git",
}

export enum URL {
    GitHTTPSGithubCOMCyberghxstErineGit = "git+https://github.com/Cyberghxst/Erine.git",
}

export interface The100_Scripts {
    test:  Test;
    dev:   string;
    start: string;
}

export enum Test {
    EchoErrorNoTestSpecifiedExit1 = "echo \"Error: no test specified\" && exit 1",
    TsNodeSrcTestsIndexTs = "ts-node src/tests/index.ts",
    TsNodeSrcTestsMainTs = "ts-node src/tests/main.ts",
}

export interface The100_Adv {
    name:                    ID;
    version:                 string;
    description:             string;
    types:                   Typ;
    main:                    The100AdvMain;
    scripts:                 The100AdvScripts;
    contributors:            AuthorElement[];
    keywords:                Keyword[];
    author:                  AuthorElement;
    license:                 License;
    devDependencies:         The100AdvDevDependencies;
    dependencies:            The100AdvDependencies;
    readme:                  Readme;
    readmeFilename:          ReadmeFilename;
    gitHead:                 string;
    _id:                     string;
    _nodeVersion:            The100AdvNodeVersion;
    _npmVersion:             The100AdvNpmVersion;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              string;
}

export enum The100AdvNodeVersion {
    The18160 = "18.16.0",
}

export enum The100AdvNpmVersion {
    The951 = "9.5.1",
}

export interface AuthorElement {
    name: AuthorName;
}

export interface The100AdvDependencies {
    "@oceanicjs/builders": OceanicjsBuilders;
    "oceanic-collectors":  OceanicCollectors;
    "oceanic.js":          OceanicJS;
    tslib:                 DevDependenciesTslib;
}

export enum OceanicjsBuilders {
    The117 = "^1.1.7",
    The119 = "^1.1.9",
}

export enum OceanicCollectors {
    The107 = "^1.0.7",
}

export enum OceanicJS {
    The160 = "^1.6.0",
    The170 = "^1.7.0",
    The171 = "^1.7.1",
    The181 = "^1.8.1",
}

export enum DevDependenciesTslib {
    The250 = "^2.5.0",
    The253 = "^2.5.3",
    The262 = "^2.6.2",
}

export interface The100AdvDevDependencies {
    "ts-node":        TsNode;
    "tsconfig-paths": TsconfigPaths;
    typescript:       Typescript;
    "@types/node"?:   PurpleTypesNode;
    typedoc?:         Typedoc;
}

export enum PurpleTypesNode {
    The181111 = "^18.11.11",
    The20102 = "^20.10.2",
}

export enum TsNode {
    The1091 = "^10.9.1",
}

export enum TsconfigPaths {
    The411 = "^4.1.1",
    The420 = "^4.2.0",
}

export enum Typedoc {
    The0247 = "^0.24.7",
    The0248 = "^0.24.8",
    The0253 = "^0.25.3",
}

export enum Typescript {
    The493 = "^4.9.3",
    The503 = "^5.0.3",
    The516 = "^5.1.6",
    The522 = "^5.2.2",
}

export enum Keyword {
    Decorators = "decorators",
    Discord = "discord",
    Discordjs = "discordjs",
    Discordpy = "discordpy",
    Oceanicjs = "oceanicjs",
}

export enum The100AdvMain {
    SandMainJS = "sand/main.js",
}

export enum Readme {
    ErineOceanicBETA = "# Erine: Oceanic\u000d\n\u000d\n### BETA",
}

export enum ReadmeFilename {
    READMEMd = "README.md",
}

export interface The100AdvScripts {
    test: Test;
}

export enum Typ {
    SandMainDTs = "sand/main.d.ts",
    Typings = "./typings",
}

export interface The101 {
    devDependencies:         The100AdvDevDependencies;
    dependencies:            The101_Dependencies;
    name:                    ID;
    description:             Description;
    version:                 string;
    main:                    The101_Main;
    scripts:                 The100AdvScripts;
    repository:              Repository;
    keywords:                string[];
    author:                  string;
    license:                 License;
    bugs:                    Bugs;
    homepage:                string;
    gitHead:                 string;
    _id:                     string;
    _nodeVersion:            The100__NodeVersion;
    _npmVersion:             The100__NpmVersion;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              Deprecated;
    types?:                  Types;
    readme?:                 string;
    readmeFilename?:         ReadmeFilename;
}

export interface The101_Dependencies {
    "discord.js":         DiscordJS;
    "tiny-typed-emitter": TinyTypedEmitter;
    tslib:                PurpleTslib;
}

export enum DiscordJS {
    The1471 = "^14.7.1",
}

export enum TinyTypedEmitter {
    The210 = "^2.1.0",
}

export enum PurpleTslib {
    The241 = "^2.4.1",
}

export enum Description {
    APowerfulCommandsFrameworkForDiscordJS = "A powerful commands framework for discord.js",
    APowerfulDiscordJSFrameworkToUseInYourBot = "A powerful discord.js framework to use in your bot!",
}

export enum The101_Main {
    CoreMainJS = "core/main.js",
}

export enum Types {
    MainDTs = "main.d.ts",
}

export interface The110_Adv {
    name:                    ID;
    version:                 string;
    description:             string;
    types:                   Typ;
    main:                    The100AdvMain;
    scripts:                 The110AdvScripts;
    contributors:            AuthorElement[];
    keywords:                Keyword[];
    author:                  AuthorElement;
    license:                 License;
    devDependencies:         The100AdvDevDependencies;
    dependencies:            The100AdvDependencies;
    readme?:                 string;
    readmeFilename?:         ReadmeFilename;
    gitHead?:                string;
    _id:                     string;
    _nodeVersion:            string;
    _npmVersion:             string;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              string;
    publishConfig?:          PublishConfig;
    _integrity?:             string;
    _resolved?:              string;
    _from?:                  string;
}

export interface PublishConfig {
    tag:    Tag;
    access: Access;
}

export enum Access {
    Public = "public",
}

export enum Tag {
    Adv = "adv",
    Latest = "latest",
}

export interface The110AdvScripts {
    test:         Test;
    "build:dist": BuildDist;
    "build:docs": BuildDocs;
}

export enum BuildDist {
    TscPTsconfigJSON = "tsc -p tsconfig.json",
}

export enum BuildDocs {
    Typedoc = "typedoc",
    TypedocEntryPointStrategyExpandSrcMainTsOutDocs = "typedoc --entryPointStrategy expand ./src/main.ts --out docs",
}

export interface The114 {
    devDependencies:         The1141_DevDependencies;
    dependencies:            The101_Dependencies;
    name:                    ID;
    description:             Description;
    version:                 string;
    main:                    The101_Main;
    types:                   Types;
    scripts:                 The1141_Scripts;
    repository:              Repository;
    keywords:                string[];
    author:                  string;
    license:                 License;
    bugs:                    Bugs;
    homepage:                string;
    readme:                  string;
    readmeFilename:          ReadmeFilename;
    gitHead:                 string;
    _id:                     string;
    _nodeVersion:            The100__NodeVersion;
    _npmVersion:             The100__NpmVersion;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              Deprecated;
}

export interface The1141_DevDependencies {
    "@types/node"?:   FluffyTypesNode;
    lodash:           Lodash;
    "ts-node":        TsNode;
    "tsconfig-paths": TsconfigPaths;
    typescript:       string;
    "uglify-js":      UglifyJS;
    tslib?:           DevDependenciesTslib;
}

export enum FluffyTypesNode {
    The181111 = "^18.11.11",
    The18167 = "^18.16.7",
}

export enum Lodash {
    The41721 = "^4.17.21",
}

export enum UglifyJS {
    The3174 = "^3.17.4",
}

export interface The1141_Scripts {
    test: Test;
    ugly: string;
}

export interface The11 {
    devDependencies:         The1141_DevDependencies;
    dependencies:            The101_Dependencies;
    name:                    ID;
    description:             Description;
    version:                 string;
    main:                    The101_Main;
    types:                   Types;
    scripts:                 The1143_Scripts;
    repository:              Repository;
    keywords:                string[];
    author:                  string;
    license:                 License;
    bugs:                    Bugs;
    homepage:                string;
    readme?:                 string;
    readmeFilename?:         ReadmeFilename;
    gitHead:                 string;
    _id:                     string;
    _nodeVersion:            The100__NodeVersion;
    _npmVersion:             The100__NpmVersion;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              Deprecated;
}

export interface The1143_Scripts {
    test:  Test;
    build: string;
}

export interface The12_Adv {
    name:                    ID;
    version:                 string;
    description:             string;
    types:                   Typ;
    main:                    The100AdvMain;
    contributors:            AuthorElement[];
    keywords:                Keyword[];
    author:                  AuthorElement;
    license:                 License;
    devDependencies:         The100AdvDevDependencies;
    dependencies:            The100AdvDependencies;
    publishConfig:           PublishConfig;
    scripts:                 The110AdvScripts;
    readme:                  string;
    readmeFilename:          ReadmeFilename;
    _id:                     string;
    _integrity:              string;
    _resolved:               string;
    _from:                   string;
    _nodeVersion:            string;
    _npmVersion:             string;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated?:             string;
    exports?:                The126AdvExports;
    typesVersions?:          TypesVersions;
}

export interface The126AdvExports {
    experiments?:     string;
    "./builders"?:    string;
    "./experiments"?: string;
    "."?:             string;
}

export interface TypesVersions {
    "*": Empty;
}

export interface Empty {
    builders:    string[];
    experiments: string[];
}

export interface The200 {
    devDependencies:         The1141_DevDependencies;
    dependencies:            The200_Dependencies;
    name:                    ID;
    description:             Description;
    version:                 string;
    main:                    The101_Main;
    types:                   Types;
    repository:              Repository;
    keywords:                string[];
    author:                  string;
    license:                 License;
    bugs:                    Bugs;
    homepage:                string;
    scripts:                 The1143_Scripts;
    _id:                     string;
    _integrity:              string;
    _resolved:               string;
    _from:                   string;
    _nodeVersion:            string;
    _npmVersion:             The100AdvNpmVersion;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              Deprecated;
}

export interface The200_Dependencies {
    "discord.js":         string;
    "tiny-typed-emitter": TinyTypedEmitter;
}

export interface The2011_Dev {
    devDependencies:         The1141_DevDependencies;
    dependencies:            The200_Dependencies;
    name:                    ID;
    description:             Description;
    version:                 string;
    main:                    string;
    types:                   string;
    module:                  string;
    exports:                 The20111DevExports;
    contributors:            AuthorElement[];
    repository:              Repository;
    keywords:                string[];
    author:                  string;
    license:                 License;
    bugs:                    Bugs;
    homepage:                string;
    scripts:                 The1143_Scripts;
    readme:                  string;
    readmeFilename:          ReadmeFilename;
    _id:                     string;
    _integrity:              string;
    _resolved:               string;
    _from:                   string;
    _nodeVersion:            string;
    _npmVersion:             The100AdvNpmVersion;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              Deprecated;
}

export interface The20111DevExports {
    ".": Class;
}

export interface Class {
    types:   string;
    import:  string;
    require: string;
}

export interface The21 {
    devDependencies:         The1141_DevDependencies;
    dependencies:            The200_Dependencies;
    name:                    ID;
    description:             Description;
    version:                 string;
    main:                    string;
    module:                  string;
    types:                   string;
    exports:                 The210_Exports;
    contributors:            AuthorElement[];
    repository:              Repository;
    keywords:                string[];
    author:                  string;
    license:                 License;
    bugs:                    Bugs;
    homepage:                string;
    scripts:                 The1143_Scripts;
    _id:                     string;
    _integrity:              string;
    _resolved:               string;
    _from:                   string;
    _nodeVersion:            string;
    _npmVersion:             The100AdvNpmVersion;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              string;
}

export interface The210_Exports {
    require: string;
    import:  string;
}

export interface The25 {
    name:                    ID;
    description:             string;
    version:                 string;
    main:                    string;
    module:                  string;
    types:                   string;
    exports:                 The210_Exports;
    keywords:                string[];
    contributors:            WelcomeAuthor[];
    author:                  WelcomeAuthor;
    license:                 string;
    publishConfig:           PublishConfig;
    dependencies:            The250_Dependencies;
    devDependencies:         The250_DevDependencies;
    scripts:                 The250_Scripts;
    _id:                     string;
    _integrity?:             string;
    _resolved?:              string;
    _from?:                  string;
    _nodeVersion:            string;
    _npmVersion:             The100AdvNpmVersion;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              string;
    gitHead?:                string;
}

export interface The250_Dependencies {
    "discord.js": string;
    tslib:        string;
}

export interface The250_DevDependencies {
    lodash:      Lodash;
    typescript:  Typescript;
    "uglify-js": UglifyJS;
}

export interface The250_Scripts {
    watch:      string;
    prepublish: string;
}

export interface The26 {
    name:                    ID;
    description:             string;
    version:                 string;
    main:                    string;
    module:                  string;
    types:                   string;
    exports:                 The210_Exports;
    keywords:                string[];
    contributors:            WelcomeAuthor[];
    author:                  WelcomeAuthor;
    license:                 string;
    publishConfig:           PublishConfig;
    dependencies:            The260_Dependencies;
    devDependencies:         The250_DevDependencies;
    scripts:                 The250_Scripts;
    _id:                     string;
    _integrity:              string;
    _resolved:               string;
    _from:                   string;
    _nodeVersion:            string;
    _npmVersion:             string;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated?:             string;
}

export interface The260_Dependencies {
    "@sapphire/shapeshift": string;
    "discord.js":           string;
    tslib:                  string;
}

export interface Dev {
    name:                    ID;
    version:                 string;
    description:             string;
    typings?:                Typ;
    main:                    The100AdvMain;
    scripts:                 The100AdvScripts;
    keywords:                any[];
    author:                  AuthorElement;
    license:                 License;
    devDependencies:         The300DevDevDependencies;
    dependencies:            The100AdvDependencies;
    readme:                  Readme;
    readmeFilename:          ReadmeFilename;
    gitHead:                 string;
    _id:                     string;
    _nodeVersion:            The100AdvNodeVersion;
    _npmVersion:             The100AdvNpmVersion;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              Deprecated;
    types?:                  Typ;
}

export interface The300DevDevDependencies {
    "ts-node":  TsNode;
    typescript: Typescript;
}

export interface The340Dev {
    name:                    ID;
    version:                 string;
    description:             string;
    types:                   Typ;
    main:                    The100AdvMain;
    contributors:            AuthorElement[];
    keywords:                Keyword[];
    author:                  AuthorElement;
    license:                 License;
    devDependencies:         The1141_DevDependencies;
    dependencies:            The100AdvDependencies;
    scripts:                 The1143_Scripts;
    readme:                  Readme;
    readmeFilename:          ReadmeFilename;
    _id:                     string;
    _integrity:              string;
    _resolved:               string;
    _from:                   string;
    _nodeVersion:            string;
    _npmVersion:             The100AdvNpmVersion;
    dist:                    Dist;
    _npmUser:                Maintainer;
    directories:             Directories;
    maintainers:             Maintainer[];
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap:          boolean;
    deprecated:              string;
}