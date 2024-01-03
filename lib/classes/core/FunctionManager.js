"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionManager = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
class FunctionManager extends Map {
    add(key, value) {
        return super.set(key.toLowerCase(), value);
    }
    async load(dir = '/functions') {
        const root = process.cwd() + __dirname.replace(process.cwd(), ''), files = (0, node_fs_1.readdirSync)((0, node_path_1.join)(root, dir));
        for (const file of files) {
            if (file.endsWith('d.ts'))
                continue;
            const isFile = (0, node_fs_1.lstatSync)((0, node_path_1.join)(root, dir, file)).isFile();
            if (isFile && file.endsWith('.js')) {
                const fn = require((0, node_path_1.join)(root, dir, file)).default;
                if (!fn)
                    continue;
                this.add(file.slice(0, -3), fn);
            }
            else
                await this.load((0, node_path_1.join)(dir, file));
        }
    }
}
exports.FunctionManager = FunctionManager;
