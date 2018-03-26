import {FieldElement} from '../FieldElement'

describe('FieldElement', () => {

    describe('construction', () => {

        describe('success', () => {
            it('should successfully instantiate a field element', () => {
                const fe = new FieldElement(1, 2)
                expect(fe.num).toBe(1)
                expect(fe.prime).toBe(2)
            })
        })

        describe('failure', () => {
            it('should throw a Range error if num > prime', () => {
                expect(() => new FieldElement(2, 1)).toThrowError(RangeError)
            })

            it('should throw a Range error if num < 0', () => {
                expect(() => new FieldElement(-1, 2)).toThrowError(RangeError)
            })
        })
    })

    describe('equality', () => {
        const fe = new FieldElement(5,7)
        describe('success', () => {

            it('should return true if item matches', () => {
                const fe2 = new FieldElement(5, 7)
                expect(fe.equals(fe2)).toBe(true)
            })
        })

        describe('failure', () => {
            it('should return false if prime does not match', () => {
                const fe2 = new FieldElement(5,11)
                expect(fe.equals(fe2)).toBe(false)
            })

            it('should return false if num does not match', () => {
                const fe2 = new FieldElement(3, 7)
                expect(fe.equals(fe2)).toBe(false)
            })
        })
    })

    describe('addition', () => {
        const fe = new FieldElement(5,7)

        describe('success', () => {
            it('should add two elements', () => {
                const fe2 = new FieldElement(3, 7)
                expect(fe.add(fe2)).toEqual(new FieldElement(1,7))
            })
        })
        describe('failure', () => {
            it('should fail to add elements not of the same prime field', () => {
                const fe2 = new FieldElement(3,11)
                expect(() => fe.add(fe2)).toThrow(Error)
            })
        })
    })

    describe('subtraction', () => {
        const fe = new FieldElement(5, 7)
        describe('success', () => {
            it('should return a new element that is the difference between the two', () => {
                const fe2 = new FieldElement(2, 7)
                expect(fe.sub(fe2)).toEqual(new FieldElement(3, 7))
            })
        })

        describe('error', () => {
            it('should throw an error if elements are not of the same prime field', () => {
                const fe2 = new FieldElement(2, 11)
                expect(() => fe.sub(fe2)).toThrow(Error)
            })
        })

    })
})