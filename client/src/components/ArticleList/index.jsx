import React from "react"
import socketIOClient from "socket.io-client"
import styles from "./ArticlesList.less"
import BasePage from "../BasePage"
import ArticleListItem from "../ArticleListItem"

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { actions } = this.props
    actions.fetchArticles()
  }

  render() {
    const { isFetching, articles, error } = this.props
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
