import React from "react"
import socketIOClient from "socket.io-client"
import styles from "./ArticlesList.less"
import { Alert } from "reactstrap"
import BasePage from "../BasePage"
import ArticleListItem from "../ArticleListItem"
import { urlForEndpoint } from "../../api/helperFunctions"

const endpoint = urlForEndpoint("")

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { actions } = this.props
    actions.fetchArticles()

    const socket = socketIOClient(endpoint)
    socket.on("NewsFeed", articles => actions.updateNewsFeed(articles))
  }

  render() {
    const { isFetching, articles, error } = this.props
    if (error) {
      return (
        <BasePage isLoading={isFetching}>
          <div className="container">
            <Alert color="danger">Something went wrong: {error.message}</Alert>
          </div>
        </BasePage>
      )
    }
    const articlesNodes = articles.map((article, index) => (<ArticleListItem id={index} article={article}/>))

    return (
      <BasePage isLoading={isFetching}>
        <div className={styles["article-list"]}>
          {articlesNodes}
        </div>
      </BasePage>
    )
  }
}
