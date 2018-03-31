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
            it('should add two elements whose sum is less than prime field order', () => {
                const a = newFieldElement(2,31)
                const b = newFieldElement(15,31)
                expect(a.add(b)).toEqual(newFieldElement(17,31))
                //
                // const fe2 = newFieldElement(3, 7)
                // expect(fe.add(fe2)).toEqual(newFieldElement(1,7))
            })

            it('should add two elements whose sum is greater than prime field order', () => {
                const a = newFieldElement(17,31)
                const b = newFieldElement(21,31)
                expect(a.add(b)).toEqual(newFieldElement(7,31))
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
        describe('success', () => {
            it('should subtract an element from another where the difference is less than the prime field order', () => {
                const a = newFieldElement(29,31)
                const b = newFieldElement(4,31)
                expect(a.sub(b)).toEqual(newFieldElement(25,31))
            })
            it('should subtract an element from another where the difference is greater than the prime field order', () => {
                const a = newFieldElement(15,31)
                const b = newFieldElement(30,31)
                expect(a.sub(b)).toEqual(newFieldElement(16,31))
            })
        })

        describe('error', () => {
            it('should throw an error if elements are not of the same prime field', () => {
                const fe1 = newFieldElement(29, 31)
                const fe2 = newFieldElement(2, 11)
                expect(() => fe1.sub(fe2)).toThrow(Error)
            })
        })
    })

    describe('multiplication', () => {

        describe('success', () => {
            it('should return a new element that is the product of the two', () => {
                const a = newFieldElement(24, 31)
                const b = newFieldElement(19, 31)
                expect(a.mul(b)).toEqual(newFieldElement(22, 31))
            })
        })

        describe('error', () => {
            it('should throw an error if elements are not of the same prime field', () => {
                const fe1 = newFieldElement(2, 31)
                const fe2 = newFieldElement(2, 11)
                expect(() => fe1.mul(fe2)).toThrow(Error)
            })
        })
    })

    describe('exponentiation', () => {
        const fe = newFieldElement(17, 31)
        const fe2 = newFieldElement(18,31)
        it('should return a new element that is exponentially larger', () => {
            expect(fe.pow(new BigInteger('3'))).toEqual(newFieldElement(15,31))
        })

        it('should perform negative exponentiation', () => {
            const a = newFieldElement(17,31)
            expect(a.pow(new BigInteger('-3'))).toEqual(newFieldElement(29, 31))
        })

        it('should chain properly with multiplication', () => {
            expect(newFieldElement(5,31).pow(new BigInteger('5')).mul(fe2)).toEqual(newFieldElement(16,31))
        })
    })

    describe('division', () => {

        describe('success', () => {
            it('should divide a by b', () => {
                const a = newFieldElement(3,31)
                const b = newFieldElement(24,31)
                expect(a.div(b)).toEqual(newFieldElement(4, 31))
            })

            it('should work with complex operations', () => {
                const a = newFieldElement(4, 31)
                const b = newFieldElement(11, 31)
                expect(a.pow(new BigInteger('-4')).mul(b)).toEqual(newFieldElement(13,31))
            })
        })

        describe('error', () => {
            it('should throw an error if elements are not of the same prime field', () => {
                const fe1 = newFieldElement(2, 31)
                const fe2 = newFieldElement(2, 11)
                expect(() => fe1.div(fe2)).toThrow(Error)
            })
        })

    })
})