class Condition {
    #data = {
        left: '',
        right: '',
        operator: ''
    }

    /**
     * Set the left part of the condition.
     * @param text Left part of the condition.
     */
    setLeft(text: string) {
        this.#data.left = text.trim()
    }

    /**
     * Set the operator of the condition.
     * @param text Condition operator.
     */
    setOperator(text: string) {
        this.#data.operator = text.trim()
    }

    /**
     * Set the right part of the condition.
     * @param text Right part of the condition.
     */
    setRight(text: string) {
        this.#data.right = text.trim()
    }

    /**
     * Check if the condition to solve is truthy resolvable.
     * @returns {boolean}
     */
    isTruthy() {
        return this.#data.left === '' && this.#data.operator === ''
    }

    /**
     * Returns the full compiled condition as string.
     */
    toString() {
        return `${this.#data.left}${this.#data.operator}${this.#data.right}`
    }

    /**
     * Returns the compiled condition as array.
    */
    toArray() {
        return [this.#data.left, this.#data.operator, this.#data.right]
    }
}

export class ConditionParser {
    /**
     * Solves the provided condition.
     * @param text The condition to eval.
     */
    static solve(text: string) {
        const condition = new Condition
        let str = "", type = "left"
        for (let i = 0; i < text.length; i++) {
            const char = text[i]
            if (type === "left") {
                if (this.operators().includes(char)) {
                    condition.setLeft(str)
                    str = "", str += char, type = "middle"
                } else str += char
            } else if (type === "middle") {
                if (!this.operators().includes(char)) {
                    condition.setOperator(str)
                    str = "", str += char, type = "right"
                } else str += char
            } else if (type === "right") {
                str += char
            }
        }
        if (str !== "") condition.setRight(str)
        else condition.setRight("true")
        if (condition.isTruthy()) {
            condition.setLeft(condition.toArray()[2])
            condition.setOperator("==")
        }
        
        const [left, op, right] = condition.toArray()

        for (let x of Array.from(op)) {
            if (!this.operators().includes(x))
                throw new TypeError('¡Símbolo inválido! Se esperaba uno de: ' + this.operators().join(', '))
        }
        if (!this.isValidFullSymbol(op))
            throw new TypeError('¡Operador inválido!')

        switch (condition.toArray()[1]) {
            case ">": {
                return Number(left) > Number(right)
            };
            case "<": {
                return Number(left) < Number(right)
            };
            case ">=": {
                return Number(left) >= Number(right)
            };
            case "<=": {
                return Number(left) <= Number(right)
            };
            case "==": {
                return left == right
            };
            case "!=": {
                return left != right
            }
            default: {
                return false
            }
        }
    }

    /**
     * Return all supported operators.
     * @returns {string[]}
     */
    static operators() {
        return [
            '=',
            '>',
            '<',
            '!'
        ]
    }

    /**
     * Returns falsys values.
     * @returns {string[]}
     */
    static falsys() {
        return ["", "undefined", "null", "!1", "!true", "0", "false"];
    }

    /**
     * Check if the provided operator is valid.
     * @param entry Condition operator.
     * @returns {boolean}
     */
    static isValidFullSymbol(entry: string) {
        return [
            '>',
            '<',
            '<=',
            '>=',
            '==',
            '!='
        ].includes(entry)
    }
}