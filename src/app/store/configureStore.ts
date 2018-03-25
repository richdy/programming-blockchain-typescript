import createSagaMiddleware from 'redux-saga'
import {all} from 'redux-saga/effects'
import {createStore, applyMiddleware, Store} from 'redux'
import {rootReducer, RootState} from '../reducers'
import {routerMiddleware} from 'react-router-redux'
import {History} from 'history'
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'
import {sagas as homeSagas} from '../../home/sagas'

function* rootSaga() {
    yield all([...homeSagas])
}

export const configureStore = (history: History, preloadedState: RootState) => {
    const sagaMiddleware = createSagaMiddleware()
    const middleware = [sagaMiddleware, routerMiddleware(history)]

    const store: Store<RootState> = createStore<RootState>(rootReducer, preloadedState, composeWithDevTools({})(
        applyMiddleware(...middleware),
    ))

    sagaMiddleware.run(rootSaga)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}