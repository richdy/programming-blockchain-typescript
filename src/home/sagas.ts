import {delay, SagaIterator} from 'redux-saga'
import {call, put, takeEvery} from 'redux-saga/effects'
import * as t from './actions/types'
import {startBlockingUI, stopBlockingUI} from '../app/actions/creators'
import uid from 'uid-safe'
import getRandomValues from 'get-random-values'

export function* issueCallUpdate(): SagaIterator {

    // Simulate long running job id
    const id: string = uid.sync(12)

    // Simulate long running job time
    const callLength: number = getRandomValues(new Uint8Array(1))[0] % 10

    yield put(startBlockingUI({ id, callName: 'loadCounterUpdate', callStart: Date.now(), duration: callLength }))
    yield call(delay, callLength * 1000)
    yield put(stopBlockingUI(id))
}

function* watchIssueCallUpdate() {
    yield takeEvery(t.ISSUE_CALL, issueCallUpdate)
}

export const sagas = [
    watchIssueCallUpdate(),
]