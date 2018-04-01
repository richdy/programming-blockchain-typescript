import { BigInteger } from 'jsbn'

export class FieldElementBN {
    public num: BigInteger
    public prime: BigInteger
    private readonly TWO: BigInteger = new BigInteger('2')

    public constructor(num: BigInteger, prime: BigInteger) {
        if (num.compareTo(prime) >= 0 || num.compareTo(BigInteger.ZERO) < 0) {
            throw new RangeError(`Num ${num} not in prime field range 0 to ${prime.subtract(new BigInteger('1'))}`)
        }
        this.num = new BigInteger(num.toString())
        this.prime = new BigInteger(prime.toString())
    }

    public equals(fieldElement: FieldElementBN): boolean {
        return fieldElement.prime.equals(this.prime) &&
            fieldElement.num.equals(this.num)
    }

    public add(fieldElement: FieldElementBN): FieldElementBN {
        if(!fieldElement.prime.equals(this.prime)) {
            throw new Error('Elements are not of the same prime field')
        }
        return new FieldElementBN((this.num.add(fieldElement.num)).mod(this.prime), this.prime)
    }

    public sub(fieldElement: FieldElementBN): FieldElementBN {
        if(!fieldElement.prime.equals(this.prime)) {
            throw new Error('Elements are not on the same prime field')
        }
        return new FieldElementBN((this.num.subtract(fieldElement.num)).mod(this.prime),this.prime)
    }

    public mul(fieldElement: FieldElementBN): FieldElementBN {
        if(!fieldElement.prime.equals(this.prime)) {
            throw new Error('Elements are not on the same prime field')
        }
        return new FieldElementBN((this.num.multiply(fieldElement.num)).mod(this.prime), this.prime)
    }

    public pow(power: BigInteger): FieldElementBN {
        const exponent = power.mod(this.prime.subtract(BigInteger.ONE))
        return new FieldElementBN(this.num.modPow(exponent, this.prime), this.prime)
    }

    public div(fieldElement: FieldElementBN): FieldElementBN {
        if(!fieldElement.prime.equals(this.prime)) {
            throw new Error('Elements are not on the same prime field')
        }
        const primeLessTwo = this.prime.subtract(this.TWO).mod(this.prime)
        const quotient = fieldElement.num.modPow(primeLessTwo, this.prime)
        const multiplier = this.num
        const result = multiplier.multiply(quotient).mod(this.prime)
        return new FieldElementBN(result, this.prime)

    }
}