import {App} from './app/App'
import React from 'react'
import {StaticRouter} from 'react-router-dom'
import express from 'express'
import {renderToString} from 'react-dom/server'
import {configureStore} from './app/store/configureStore'
import * as serialize from 'serialize-javascript'
import createHistory from 'history/createMemoryHistory'
import { Provider } from 'react-redux'

// tslint:disable-next-line:no-var-requires
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST as string)

const history = createHistory()

const server = express()
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR as string))
    .get('/*', (req, res) => {
        const context:any = {}

        const preloadedState = { uiBlockers: { list: [], count: 0 } }

        // Create a new Redux store instance
        const store = configureStore(history, preloadedState)

        const markup = renderToString(
            <StaticRouter context={context} location={req.url}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </StaticRouter>
        )
        const finalState = store.getState()
        if (context.url) {
            res.redirect(context.url)
        } else {
            res.status(200).send(
                `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
                    ? `<link rel="stylesheet" href="${assets.client.css}">`
                    : ''}
        ${process.env.NODE_ENV === 'production'
                    ? `<script src="${assets.client.js}" defer></script>`
                    : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
    </body>
</html>`,
            )
        }
    })

export default server
