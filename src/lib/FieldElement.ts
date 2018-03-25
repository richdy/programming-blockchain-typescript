export class FieldElement {
    public num: number
    public prime: number

    constructor(num: number, prime: number) {
        if (num >= prime || num < 0) {
            throw new RangeError(`Num ${num} not in prime field range 0 to ${prime-1}`)
            // throw new Error()
        }
        this.num = num
        this.prime = prime
    }
}