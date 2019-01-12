import { compose, createStore, applyMiddleware } from "redux"
import { routerForBrowser, initializeCurrentLocation } from "redux-little-router"
import { combineReducers, install } from "redux-loop"
import rootReducer from "../reducers/index"
import routes from "./routes"

const NODE_ENV = process.env.NODE_ENV || "default"

// Get this from redux-little-router
const { reducer, middleware, enhancer } = routerForBrowser({ routes })

// Logging middleware
const logger = (()=>{
  switch (NODE_ENV) {
    case "production": {
      return store => next => action => {
        return next(action)
      }
    }

    default: {
      return store => next => action => {
        console.group(action.type)
        console.info("dispatching", action)
        let result = next(action)
        console.log("next state", store.getState())
        console.groupEnd()
        return result
      }
    }
  }
})()

const store = createStore(
  combineReducers({
    router: reducer,
    app:    rootReducer,
  }),
  compose(
    enhancer,
    install(),
    applyMiddleware(middleware, logger),
  ),
)

// Initialize
const initialLocation = store.getState().router
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation))
}

export default store
