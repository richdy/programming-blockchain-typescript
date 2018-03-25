import {UIBlocker, uiBlockers, UIBlockersState} from '../uiBlockers'
import {startBlockingUI, stopBlockingUI} from '../../actions/creators'

describe('app/reducer/uiblockers', () => {

    let result: UIBlockersState | undefined

    describe('undefined', () => {
        it('should have an initial state', () => {
            result = uiBlockers(undefined, { type: '', payload: undefined })
            expect(result).toEqual({
                count: 0,
                list: [] as UIBlocker[],
            })
        })
    })

    describe('start blocking call', () => {
        const existingState: UIBlockersState = {
            count: 1,
            list: [
                {
                    callName: 'Call1',
                    callStart: 1234,
                    id: '1234-5678',
                    duration: 1000,
                },
            ]
        }

        const payload: UIBlocker = {
            id: '7890-1234',
            callName: 'Call2',
            callStart: 5678,
            duration: 2000,
        }

        it('should add a blocking call to the list', () => {

            const expectedState: UIBlockersState = {
                count: 2,
                list: [
                    {
                        callName: 'Call1',
                        callStart: 1234,
                        id: '1234-5678',
                        duration: 1000,
                    },
                    {
                        id: '7890-1234',
                        callName: 'Call2',
                        callStart: 5678,
                        duration: 2000,
                    }
                ]
            }
            result = uiBlockers(existingState, startBlockingUI(payload))
            expect(result).toEqual(expectedState)
        })
    })

    describe('stop blocking call', () => {
        const existingState: UIBlockersState = {
            count: 2,
            list: [
                {
                    id: '1234-5678',
                    callName: 'Call1',
                    callStart: 1234,
                    duration: 1000,
                },
                {
                    id: '7890-1234',
                    callName: 'Call2',
                    callStart: 5678,
                    duration: 2000,
                }
            ]
        }

        const payload:string = '7890-1234'

        it('should remove the payload\'s blocking call to the list', () => {

            const expectedState: UIBlockersState = {
                count: 1,
                list: [
                    {
                        callName: 'Call1',
                        callStart: 1234,
                        id: '1234-5678',
                        duration: 1000,
                    },
                ]
            }
            result = uiBlockers(existingState, stopBlockingUI(payload))
            expect(result).toEqual(expectedState)
        })
    })

})