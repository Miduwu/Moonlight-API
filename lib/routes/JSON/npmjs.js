"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UglifyJS = exports.Lodash = exports.FluffyTypesNode = exports.BuildDocs = exports.BuildDist = exports.Tag = exports.Access = exports.Types = exports.The101_Main = exports.Description = exports.PurpleTslib = exports.TinyTypedEmitter = exports.DiscordJS = exports.Typ = exports.ReadmeFilename = exports.Readme = exports.The100AdvMain = exports.Keyword = exports.Typescript = exports.Typedoc = exports.TsconfigPaths = exports.TsNode = exports.PurpleTypesNode = exports.DevDependenciesTslib = exports.OceanicJS = exports.OceanicCollectors = exports.OceanicjsBuilders = exports.The100AdvNpmVersion = exports.The100AdvNodeVersion = exports.Test = exports.URL = exports.Type = exports.License = exports.Keyid = exports.Deprecated = exports.The100__NpmVersion = exports.Host = exports.The100__NodeVersion = exports.MaintainerName = exports.MaintainerEmail = exports.AuthorName = exports.AuthorEmail = exports.ID = exports.Route = void 0;
const tslib_1 = require("tslib");
const main_1 = require("../../main");
class Route extends main_1.Endpoint {
    async handler(ctx) {
        const query = ctx.getParam("query");
        if (!query)
            throw main_1.Endpoint.Error("Missing required parameter 'query'");
        const request = await fetch(`https://registry.npmjs.org/${query.toLowerCase().replaceAll(' ', '-')}`);
        if (!request.ok)
            throw main_1.Endpoint.Error("Cannot get a valid response.");
        const data = await request.json();
        ctx.send(data);
    }
}
exports.Route = Route;
tslib_1.__decorate([
    main_1.Endpoint.Create({
        path: "/json/npm",
        method: "GET"
    }),
    main_1.Endpoint.Query("query", {
        description: "The package name (exact match)",
        required: true,
        type: main_1.aux.STRING({ min: 2, max: 100 })
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [main_1.Context]),
    tslib_1.__metadata("design:returntype", Promise)
], Route.prototype, "handler", null);
var ID;
(function (ID) {
    ID["Erine"] = "erine";
})(ID || (exports.ID = ID = {}));
var AuthorEmail;
(function (AuthorEmail) {
    AuthorEmail["CyberghxstPetalmailCOM"] = "cyberghxst@petalmail.com";
    AuthorEmail["MiduwuUsersNoreplyGithubCOM"] = "Miduwu@users.noreply.github.com";
})(AuthorEmail || (exports.AuthorEmail = AuthorEmail = {}));
var AuthorName;
(function (AuthorName) {
    AuthorName["Cyberghxst"] = "Cyberghxst";
    AuthorName["Mid"] = "Mid";
})(AuthorName || (exports.AuthorName = AuthorName = {}));
var MaintainerEmail;
(function (MaintainerEmail) {
    MaintainerEmail["CyberghxstPetalmailCOM"] = "cyberghxst@petalmail.com";
    MaintainerEmail["WillzdadOutlookCOM"] = "Willzdad@outlook.com";
})(MaintainerEmail || (exports.MaintainerEmail = MaintainerEmail = {}));
var MaintainerName;
(function (MaintainerName) {
    MaintainerName["Cyberghxstuwu"] = "cyberghxstuwu";
    MaintainerName["Midowo"] = "midowo";
})(MaintainerName || (exports.MaintainerName = MaintainerName = {}));
var The100__NodeVersion;
(function (The100__NodeVersion) {
    The100__NodeVersion["The16142"] = "16.14.2";
    The100__NodeVersion["The16181"] = "16.18.1";
    The100__NodeVersion["The1670"] = "16.7.0";
    The100__NodeVersion["The1870"] = "18.7.0";
})(The100__NodeVersion || (exports.The100__NodeVersion = The100__NodeVersion = {}));
var Host;
(function (Host) {
    Host["S3NpmRegistryPackages"] = "s3://npm-registry-packages";
})(Host || (exports.Host = Host = {}));
var The100__NpmVersion;
(function (The100__NpmVersion) {
    The100__NpmVersion["The7203"] = "7.20.3";
    The100__NpmVersion["The8150"] = "8.15.0";
    The100__NpmVersion["The8192"] = "8.19.2";
    The100__NpmVersion["The850"] = "8.5.0";
})(The100__NpmVersion || (exports.The100__NpmVersion = The100__NpmVersion = {}));
var Deprecated;
(function (Deprecated) {
    Deprecated["UnsupportedVersionUseLatestInstead"] = "Unsupported version, use latest instead.";
})(Deprecated || (exports.Deprecated = Deprecated = {}));
var Keyid;
(function (Keyid) {
    Keyid["SHA256Jl3Bwswu80PjjokCgh0O2W5C2U4LhQAE57Gj9Cz1KzA"] = "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA";
})(Keyid || (exports.Keyid = Keyid = {}));
var License;
(function (License) {
    License["ISC"] = "ISC";
})(License || (exports.License = License = {}));
var Type;
(function (Type) {
    Type["Git"] = "git";
})(Type || (exports.Type = Type = {}));
var URL;
(function (URL) {
    URL["GitHTTPSGithubCOMCyberghxstErineGit"] = "git+https://github.com/Cyberghxst/Erine.git";
})(URL || (exports.URL = URL = {}));
var Test;
(function (Test) {
    Test["EchoErrorNoTestSpecifiedExit1"] = "echo \"Error: no test specified\" && exit 1";
    Test["TsNodeSrcTestsIndexTs"] = "ts-node src/tests/index.ts";
    Test["TsNodeSrcTestsMainTs"] = "ts-node src/tests/main.ts";
})(Test || (exports.Test = Test = {}));
var The100AdvNodeVersion;
(function (The100AdvNodeVersion) {
    The100AdvNodeVersion["The18160"] = "18.16.0";
})(The100AdvNodeVersion || (exports.The100AdvNodeVersion = The100AdvNodeVersion = {}));
var The100AdvNpmVersion;
(function (The100AdvNpmVersion) {
    The100AdvNpmVersion["The951"] = "9.5.1";
})(The100AdvNpmVersion || (exports.The100AdvNpmVersion = The100AdvNpmVersion = {}));
var OceanicjsBuilders;
(function (OceanicjsBuilders) {
    OceanicjsBuilders["The117"] = "^1.1.7";
    OceanicjsBuilders["The119"] = "^1.1.9";
})(OceanicjsBuilders || (exports.OceanicjsBuilders = OceanicjsBuilders = {}));
var OceanicCollectors;
(function (OceanicCollectors) {
    OceanicCollectors["The107"] = "^1.0.7";
})(OceanicCollectors || (exports.OceanicCollectors = OceanicCollectors = {}));
var OceanicJS;
(function (OceanicJS) {
    OceanicJS["The160"] = "^1.6.0";
    OceanicJS["The170"] = "^1.7.0";
    OceanicJS["The171"] = "^1.7.1";
    OceanicJS["The181"] = "^1.8.1";
})(OceanicJS || (exports.OceanicJS = OceanicJS = {}));
var DevDependenciesTslib;
(function (DevDependenciesTslib) {
    DevDependenciesTslib["The250"] = "^2.5.0";
    DevDependenciesTslib["The253"] = "^2.5.3";
    DevDependenciesTslib["The262"] = "^2.6.2";
})(DevDependenciesTslib || (exports.DevDependenciesTslib = DevDependenciesTslib = {}));
var PurpleTypesNode;
(function (PurpleTypesNode) {
    PurpleTypesNode["The181111"] = "^18.11.11";
    PurpleTypesNode["The20102"] = "^20.10.2";
})(PurpleTypesNode || (exports.PurpleTypesNode = PurpleTypesNode = {}));
var TsNode;
(function (TsNode) {
    TsNode["The1091"] = "^10.9.1";
})(TsNode || (exports.TsNode = TsNode = {}));
var TsconfigPaths;
(function (TsconfigPaths) {
    TsconfigPaths["The411"] = "^4.1.1";
    TsconfigPaths["The420"] = "^4.2.0";
})(TsconfigPaths || (exports.TsconfigPaths = TsconfigPaths = {}));
var Typedoc;
(function (Typedoc) {
    Typedoc["The0247"] = "^0.24.7";
    Typedoc["The0248"] = "^0.24.8";
    Typedoc["The0253"] = "^0.25.3";
})(Typedoc || (exports.Typedoc = Typedoc = {}));
var Typescript;
(function (Typescript) {
    Typescript["The493"] = "^4.9.3";
    Typescript["The503"] = "^5.0.3";
    Typescript["The516"] = "^5.1.6";
    Typescript["The522"] = "^5.2.2";
})(Typescript || (exports.Typescript = Typescript = {}));
var Keyword;
(function (Keyword) {
    Keyword["Decorators"] = "decorators";
    Keyword["Discord"] = "discord";
    Keyword["Discordjs"] = "discordjs";
    Keyword["Discordpy"] = "discordpy";
    Keyword["Oceanicjs"] = "oceanicjs";
})(Keyword || (exports.Keyword = Keyword = {}));
var The100AdvMain;
(function (The100AdvMain) {
    The100AdvMain["SandMainJS"] = "sand/main.js";
})(The100AdvMain || (exports.The100AdvMain = The100AdvMain = {}));
var Readme;
(function (Readme) {
    Readme["ErineOceanicBETA"] = "# Erine: Oceanic\r\n\r\n### BETA";
})(Readme || (exports.Readme = Readme = {}));
var ReadmeFilename;
(function (ReadmeFilename) {
    ReadmeFilename["READMEMd"] = "README.md";
})(ReadmeFilename || (exports.ReadmeFilename = ReadmeFilename = {}));
var Typ;
(function (Typ) {
    Typ["SandMainDTs"] = "sand/main.d.ts";
    Typ["Typings"] = "./typings";
})(Typ || (exports.Typ = Typ = {}));
var DiscordJS;
(function (DiscordJS) {
    DiscordJS["The1471"] = "^14.7.1";
})(DiscordJS || (exports.DiscordJS = DiscordJS = {}));
var TinyTypedEmitter;
(function (TinyTypedEmitter) {
    TinyTypedEmitter["The210"] = "^2.1.0";
})(TinyTypedEmitter || (exports.TinyTypedEmitter = TinyTypedEmitter = {}));
var PurpleTslib;
(function (PurpleTslib) {
    PurpleTslib["The241"] = "^2.4.1";
})(PurpleTslib || (exports.PurpleTslib = PurpleTslib = {}));
var Description;
(function (Description) {
    Description["APowerfulCommandsFrameworkForDiscordJS"] = "A powerful commands framework for discord.js";
    Description["APowerfulDiscordJSFrameworkToUseInYourBot"] = "A powerful discord.js framework to use in your bot!";
})(Description || (exports.Description = Description = {}));
var The101_Main;
(function (The101_Main) {
    The101_Main["CoreMainJS"] = "core/main.js";
})(The101_Main || (exports.The101_Main = The101_Main = {}));
var Types;
(function (Types) {
    Types["MainDTs"] = "main.d.ts";
})(Types || (exports.Types = Types = {}));
var Access;
(function (Access) {
    Access["Public"] = "public";
})(Access || (exports.Access = Access = {}));
var Tag;
(function (Tag) {
    Tag["Adv"] = "adv";
    Tag["Latest"] = "latest";
})(Tag || (exports.Tag = Tag = {}));
var BuildDist;
(function (BuildDist) {
    BuildDist["TscPTsconfigJSON"] = "tsc -p tsconfig.json";
})(BuildDist || (exports.BuildDist = BuildDist = {}));
var BuildDocs;
(function (BuildDocs) {
    BuildDocs["Typedoc"] = "typedoc";
    BuildDocs["TypedocEntryPointStrategyExpandSrcMainTsOutDocs"] = "typedoc --entryPointStrategy expand ./src/main.ts --out docs";
})(BuildDocs || (exports.BuildDocs = BuildDocs = {}));
var FluffyTypesNode;
(function (FluffyTypesNode) {
    FluffyTypesNode["The181111"] = "^18.11.11";
    FluffyTypesNode["The18167"] = "^18.16.7";
})(FluffyTypesNode || (exports.FluffyTypesNode = FluffyTypesNode = {}));
var Lodash;
(function (Lodash) {
    Lodash["The41721"] = "^4.17.21";
})(Lodash || (exports.Lodash = Lodash = {}));
var UglifyJS;
(function (UglifyJS) {
    UglifyJS["The3174"] = "^3.17.4";
})(UglifyJS || (exports.UglifyJS = UglifyJS = {}));
