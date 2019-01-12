import React from "react"
import ArticlesList from "../../containers/ArticleList"
import styles from "./ArticlesPage.less"

const ArticlesPage = () => (
  <div className={styles["articles-page"]}>
    <h1 className="text-center">Live News Feed</h1>
    <ArticlesList/>
  </div>
)
export default ArticlesPage
