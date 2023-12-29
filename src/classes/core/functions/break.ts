import { NativeFunction } from '../index.js'

export default new NativeFunction({
    name: 'break',
    description: 'Breaks the execution of the remaining code.',
    async code(d) {
        d.break = true
    }
})
.setExample(`
{log => This part will be executed.}
{break}
{log => This part will not be executed.}
`)