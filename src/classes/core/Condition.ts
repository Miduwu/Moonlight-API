export class Condition {
    /**
     * @static Evaluates a condiiton.
     * @param text The condition to evaluate.
     * @returns {boolean}
     * @example
     * const result1 = Condition.solve('Hello == Hello')
     * const result2 = Condition.solve('1 >= 3')
     */
    solve(text: string) {
        const ands = text.split('&&').map(txt => txt.trim())
        const results: boolean[] = []

        for (const and of ands) {
            const ors = and.split('||').map(txt => txt.trim())
            const res: boolean[] = []

            for (const or of ors) {
                let [left, operator, right] = or.split(new RegExp(`(${this.fullSymbols.join('|')})`)).map(x => x.trim())
                if (operator === undefined) operator = '==', right = left

                switch (operator) {
                    case '==':
                        res.push(left === right)
                        break
                    case '!=':
                        res.push(left !== right)
                        break
                    case '>=':
                        res.push(Number(left) >= Number(right))
                        break
                    case '>=':
                        res.push(Number(left) <= Number(right))
                        break
                    case '<':
                        res.push(Number(left) < Number(right))
                        break
                    case '>':
                        res.push(Number(left) > Number(right))
                        break
                }
            }
            results.push(res.some(r => r === true))
        }

        return results.every(res => res === true)
    }

    /**
     * Get all valid characters for operators.
     */
    get operators() {
        return [
            '<',
            '=',
            '>',
            '!'
        ]
    }

    get fullSymbols() {
        return [
            '==',
            '!=',
            '>=',
            '<=',
            '>',
            '<'
        ]
    }
}