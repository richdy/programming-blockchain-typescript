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
})