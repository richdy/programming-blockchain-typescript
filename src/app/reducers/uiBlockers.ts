import {Action, handleActions} from 'redux-actions'
import * as t from '../actions/types'

export interface UIBlocker {
    callName: string,
    callStart: number,
    id: string,
    duration: number,
}

export interface UIBlockersState {
    count: number,
    list: UIBlocker[],
}

const initialState = {
    count: 0,
    list: [] as UIBlocker[],
}

export const uiBlockers = handleActions<UIBlockersState | undefined, UIBlocker | string>({
    [t.START_BLOCKING_UI]: (state: UIBlockersState, action: Action<UIBlocker>) => {
        const list = state.list.slice()
        list.push(action.payload!)
        return ({list, count: list.length})
    },

    [t.STOP_BLOCKING_UI]: (state: UIBlockersState | undefined, action: Action<string>) => {
        const list = state!.list.filter(li => li.id !== action.payload)
        list.forEach(li => `    ${li.id}: ${li.id === action.payload}`)
        return {list, count: list.length}
    },
}, initialState)
