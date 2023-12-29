import { FunctionError, getFunctionError } from '../index.js'
import { NativeFunction } from '../index.js'
import { loadImage } from '@napi-rs/canvas'

export default new NativeFunction({
    name: 'loadImage',
    description: 'Loads an image into the canvas.',
    parameters: [
        {
            name: 'ID',
            description: 'Image ID',
            defo: 'none'
        },
        {
            name: 'link',
            description: 'Image link',
            defo: 'none'
        }
    ],
    async code(d) {
        const [id, link] = d.function.compiled.fields.map(t => t.value)
        if (id === undefined) return new FunctionError(d, getFunctionError('Missing image ID', d.function.compiled))
        if (link === undefined) return new FunctionError(d, getFunctionError('Missing image URL', d.function.compiled))

        const imageTest = await fetch(link)
        if (!imageTest.ok) return new FunctionError(d, getFunctionError('Invalid image URL', d.function.compiled))
        
        const type = imageTest.headers.get('content-type')
        if (!type || type && !type.startsWith('image'))
            return new FunctionError(d, getFunctionError('Invalid image URL', d.function.compiled))

        if (!(d.cache.images instanceof Map)) d.cache.images = new Map()

        const image = await loadImage(link, { requestOptions: { timeout: 5000 } }).catch(e=>null)!

        d.cache.images.set(id, image)
    }
})
.setExample(`
{loadImage => AVATAR:https%COLON%//www.zooniverse.org/assets/simple-avatar.png}
{loadImage => BACKGROUND:https%COLON%//wallpaperaccess.com/full/5578377.png}
`)