import {delay, SagaIterator} from 'redux-saga'
import {issueCallUpdate} from '../sagas'
import uid from 'uid-safe'
import Mock = jest.Mock
import {startBlockingUI, stopBlockingUI} from '../../app/actions/creators'
import {call, put} from 'redux-saga/effects'
import mockNow from 'jest-mock-now'

jest.mock('uid-safe')

describe('home/sagas', () => {

    let sagaIterator: SagaIterator
    (uid.sync as Mock<any>).mockReturnValue('123456789ABC')

    describe('issueCallUpdate', () => {
        beforeAll(() => {
            sagaIterator = issueCallUpdate()
            mockNow(new Date('2018-03-23'))
        })

        it('should put a start blocking call', () => {
            expect(sagaIterator.next().value).toEqual(put(startBlockingUI({
                callName: 'loadCounterUpdate', duration: 2, id: '123456789ABC', callStart: 1521763200000,
            })))
        })

        it('should delay by [duration] seconds', () => {
            expect(sagaIterator.next().value).toEqual(call(delay,2000))
        })

        it('should put a stop blocking call', () => {
            expect(sagaIterator.next().value).toEqual(put(stopBlockingUI('123456789ABC')))
        })
    })
})