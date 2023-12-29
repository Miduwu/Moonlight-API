export class CompiledField {
    public value: string = ''
    public index: number = Infinity
    constructor (value: string, index: number) {
        this.value = value
        this.index = index
    }
}

export class CompiledFunction {
    public name: string = ''
    public over: string = ''
    public fields: CompiledField[] = []

    /**
     * Set the name for this function.
     * @param name Function name.
     */
    public setName(name: string) {
        this.name = name.toLowerCase().trim()
        this.update()
        return this
    }

    /**
     * Attach a new parameter to this function.
     * @param value Parameter value.
     */
    public attachParameter(value: string) {
        this.fields.push(new CompiledField(value, this.fields.length))
        this.update()
        return this
    }

    /**
     * Reset this compiled function.
     */
    public resetFunction() {
        this.name = ''
        this.over = ''
        this.fields = []
    }

    /**
     * Updates the function overview.
     */
    public update() {
        this.name = this.name.trim().toLowerCase()
        this.over = this.fields.length > 0 ? '{' + this.name + ' => ' + this.fields.map(field => field.value).join(':') + '}' : '{' + this.name + '}'
        return this
    }
}