import { combineReducers } from 'redux'
import { uiBlockers, UIBlockersState} from './uiBlockers'

export interface RootState {
    uiBlockers: UIBlockersState,
}

export const rootReducer = combineReducers<RootState>({
    uiBlockers
})
