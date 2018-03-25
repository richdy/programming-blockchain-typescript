import React from 'react'
import { hydrate } from 'react-dom'
import { Root } from './app/Root'
import { configureStore } from './app/store/configureStore'
import createHistory from 'history/createHashHistory'

const store = configureStore(createHistory(), window.__PRELOADED_STATE__)

hydrate(<Root store={store} />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
