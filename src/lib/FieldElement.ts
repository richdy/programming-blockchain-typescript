export class FieldElement {
    public num: number
    public prime: number

    public constructor(num: number, prime: number) {
        if (num >= prime || num < 0) {
            throw new RangeError(`Num ${num} not in prime field range 0 to ${prime-1}`)
            // throw new Error()
        }
        this.num = num
        this.prime = prime
    }

    public equals(fieldElement: FieldElement): boolean {
        return fieldElement.prime === this.prime &&
            fieldElement.num === this.num
    }

    public add(fieldElement: FieldElement): FieldElement {
        if(fieldElement.prime !== this.prime) {
            throw new Error('Elements are not of the same prime field')
        }
        return new FieldElement((this.num + fieldElement.num) % this.prime, this.prime)
    }

    public sub(fieldElement: FieldElement): FieldElement {
        if(fieldElement.prime !== this.prime) {
            throw new Error('Elements are not on the same prime field')
        }
        return new FieldElement((this.num - fieldElement.num) % this.prime ,this.prime)
    }
}