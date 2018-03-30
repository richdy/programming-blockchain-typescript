import {FieldElementBN} from '../FieldElementBN'
import {BigInteger} from 'jsbn'

describe('FieldElementBN', () => {

    const newFieldElement = (num: number, prime: number): FieldElementBN =>
        new FieldElementBN(new BigInteger(num.toString()), new BigInteger(prime.toString()))

    describe('construction', () => {

        describe('success', () => {
            it('should successfully instantiate a field element', () => {
                const fe = newFieldElement(1,2)
                expect(fe.num).toEqual(new BigInteger('1'))
                expect(fe.prime).toEqual(new BigInteger('2'))
            })
        })

        describe('failure', () => {
            it('should throw a Range error if num > prime', () => {
                expect(() => newFieldElement(2,1)).toThrowError(RangeError)
            })

            it('should throw a Range error if num < 0', () => {
                expect(() => newFieldElement(-1, 2)).toThrowError(RangeError)
            })
        })
    })

    describe('equality', () => {
        const fe = newFieldElement(5, 7)
        describe('success', () => {

            it('should return true if item matches', () => {
                const fe2 = newFieldElement(5, 7)
                expect(fe.equals(fe2)).toBe(true)
            })
        })

        describe('failure', () => {
            it('should return false if prime does not match', () => {
                const fe2 = newFieldElement(5,11)
                expect(fe.equals(fe2)).toBe(false)
            })

            it('should return false if num does not match', () => {
                const fe2 = newFieldElement(3,7)
                expect(fe.equals(fe2)).toBe(false)
            })
        })
    })

    describe('addition', () => {
        const fe = newFieldElement(5,7)

        describe('success', () => {
            it('should add two elements', () => {
                const fe2 = newFieldElement(3, 7)
                expect(fe.add(fe2)).toEqual(newFieldElement(1,7))
            })
        })
        describe('failure', () => {
            it('should fail to add elements not of the same prime field', () => {
                const fe2 = newFieldElement(3,11)
                expect(() => fe.add(fe2)).toThrow(Error)
            })
        })
    })

    describe('subtraction', () => {
        const fe = newFieldElement(5, 7)
        describe('success', () => {
            it('should return a new element that is the difference between the two', () => {
                const fe2 = newFieldElement(2, 7)
                expect(fe.sub(fe2)).toEqual(newFieldElement(3, 7))
            })
        })

        describe('error', () => {
            it('should throw an error if elements are not of the same prime field', () => {
                const fe2 = newFieldElement(2, 11)
                expect(() => fe.sub(fe2)).toThrow(Error)
            })
        })
    })

    describe('multiplication', () => {
        const fe = newFieldElement(5, 7)
        describe('success', () => {
            it('should return a new element that is the product of the two', () => {
                const fe2 = newFieldElement(2, 7)
                expect(fe.mul(fe2)).toEqual(newFieldElement(3, 7))
            })
        })

        describe('error', () => {
            it('should throw an error if elements are not of the same prime field', () => {
                const fe2 = newFieldElement(2, 11)
                expect(() => fe.mul(fe2)).toThrow(Error)
            })
        })
    })

    describe('exponentiation', () => {
        const fe = newFieldElement(17, 31)
        const fe2 = newFieldElement(18,31)
        it('should return a new element that is exponentially larger', () => {
            expect(fe.pow(3)).toEqual(newFieldElement(15,31))
        })

        it('should chain properly with multiplication', () => {
            expect(newFieldElement(5,31).pow(5).mul(fe2)).toEqual(newFieldElement(16,31))
        })
    })
})