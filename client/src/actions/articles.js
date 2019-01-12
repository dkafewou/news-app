import * as types from "../constants/ActionTypes"

/**
 * Fetch Articles
 * */
export const fetchArticles = () => ({
  type: types.FETCH_ARTICLES
})

export const resolveFetchArticles = ({ articles }) => ({
  type:   types.FETCH_ARTICLES,
  status: "success",
  articles
})

export const rejectFetchArticles = (error) => ({
  type:   types.FETCH_ARTICLES,
  status: "failure",
  error
})

/**
 *  Update news feed with data from socket
 **/
export const updateNewsFeed = (articles) => ({
  type: types.UPDATE_NEWS_FEED,
  articles
})
