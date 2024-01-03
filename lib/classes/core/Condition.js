"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condition = void 0;
class Condition {
    solve(text) {
        const ands = text.split('&&').map(txt => txt.trim());
        const results = [];
        for (const and of ands) {
            const ors = and.split('||').map(txt => txt.trim());
            const res = [];
            for (const or of ors) {
                let [left, operator, right] = or.split(new RegExp(`(${this.fullSymbols.join('|')})`)).map(x => x.trim());
                if (operator === undefined)
                    operator = '==', right = left;
                switch (operator) {
                    case '==':
                        res.push(left === right);
                        break;
                    case '!=':
                        res.push(left !== right);
                        break;
                    case '>=':
                        res.push(Number(left) >= Number(right));
                        break;
                    case '>=':
                        res.push(Number(left) <= Number(right));
                        break;
                    case '<':
                        res.push(Number(left) < Number(right));
                        break;
                    case '>':
                        res.push(Number(left) > Number(right));
                        break;
                }
            }
            results.push(res.some(r => r === true));
        }
        return results.every(res => res === true);
    }
    get operators() {
        return [
            '<',
            '=',
            '>',
            '!'
        ];
    }
    get fullSymbols() {
        return [
            '==',
            '!=',
            '>=',
            '<=',
            '>',
            '<'
        ];
    }
}
exports.Condition = Condition;
