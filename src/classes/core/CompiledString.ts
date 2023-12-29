export class CompiledString {
    public value: string = ''

    /**
     * Overwrite the compiled value.
     * @param value The new compiled value.
     */
    overwrite(value: string) {
        this.value = value
        return this
    }

    /**
     * Reset the compiled value.
     */
    reset() {
        this.value = ''
        return this
    }

    /**
     * Write a character into the compiled value.
     * @param char Character to write into the value.
     */
    write(char: string) {
        this.value += char
        return this
    }
}