import "babel-polyfill"
import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import store from "./store/index"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./app/App"
import ErrorBoundary from "./components/ErrorBoundary"
import "whatwg-fetch"

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <ErrorBoundary>
        <App/>
      </ErrorBoundary>
    </Provider>,
    document.getElementById("root")
  )
})
