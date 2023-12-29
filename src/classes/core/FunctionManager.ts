import { lstatSync, readdirSync } from 'node:fs'
import { NativeFunction } from './NativeFunction'
import { join } from 'node:path'

export class FunctionManager extends Map {
    add(key: string, value: Omit<NativeFunction, 'name'>) {
        return super.set(key.toLowerCase(), value)
    }

    async load(dir: string = '/functions') {
        const root = process.cwd() + __dirname.replace(process.cwd(), ''),
            files = readdirSync(join(root, dir))
        for (const file of files) {
            if (file.endsWith('d.ts')) continue
            const isFile = lstatSync(join(root, dir, file)).isFile()
            if (isFile && file.endsWith('.js')) {
                const fn: NativeFunction = require(join(root, dir, file)).default
                if (!fn) continue
                this.add(file.slice(0, -3), fn)
            } else await this.load(join(dir, file))
        }
    }
}