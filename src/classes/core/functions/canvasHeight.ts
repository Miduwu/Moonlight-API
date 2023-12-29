import { FRAME_NAME, FunctionError } from '../index.js'
import { NativeFunction } from '../index.js'
import { Frame } from '../../../main.js'

export default new NativeFunction({
    name: 'canvasHeight',
    description: 'Retrieves the canvas height.',
    async code(d) {
        if (!(d.cache[FRAME_NAME] instanceof Frame))
            return new FunctionError(d, 'Unable to find a canvas')

        return d.cache[FRAME_NAME].canvas.height
    }
})
.setExample(`
{let => height:{canvasHeight}}
`)