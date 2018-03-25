import {Action, ActionFunction1, createAction} from 'redux-actions'
import * as t from './types'
import {UIBlocker} from '../reducers/uiBlockers'

export const startBlockingUI: ActionFunction1<UIBlocker, Action<UIBlocker>> = createAction<UIBlocker>(t.START_BLOCKING_UI)
export const stopBlockingUI: ActionFunction1<string, Action<string>> = createAction<string>(t.STOP_BLOCKING_UI)