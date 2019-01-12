import { loop, Cmd } from "redux-loop"
import {
  rejectFetchArticles,
  resolveFetchArticles
} from "../actions/articles"
import API from "../api/index"
import {
  FETCH_ARTICLES, UPDATE_NEWS_FEED
} from "../constants/ActionTypes"

const initialState = {
  articles:   [],
  isFetching: false,
  error:      null
}

export default function articles(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NEWS_FEED: {
      const { articles } = action
      if (state.articles.length < articles.length) {
        return Object.assign({}, state, {
          articles: action.articles
        })
      }

      const partArticles = state.articles.slice(0, (state.articles.length - articles.length))
      const fullArticles = articles.concat(partArticles)

      return Object.assign({}, state, {
        articles: fullArticles
      })
    }

    case FETCH_ARTICLES: {
      const { status } = action
      // Check status
      switch (status) {
        case "success": {
          return Object.assign({}, state, {
            isFetching: false,
            error:      null,
            articles:   action.articles
          })
        }

        case "failure": {
          // Something went wrong
          return Object.assign({}, state, {
            isFetching: false,
            error:      action.error,
            articles:   []
          })
        }

        default: {
          // Is still fetching
          return loop(
            Object.assign({}, state, {
              isFetching: true,
              error:      null
            }),
            Cmd.run(API.getArticles, {
              args:                 [],
              successActionCreator: resolveFetchArticles,
              failActionCreator:    rejectFetchArticles
            })
          )
        }
      }
    }

    default:
      return Object.assign({}, state)
  }
}
