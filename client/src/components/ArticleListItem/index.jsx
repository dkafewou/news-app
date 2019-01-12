import React from "react"
import PropTypes from "prop-types"
import Moment from "moment"
import styles from "./ArticleListItem.less"

const ArticleListItem = ({ article }) => (
  <article className={`container ${styles["article"]}`}>
    <h5 className={styles["title"]}>
      <a href={article.url} className={styles["link-to-article"]} target="_blank">
        {article.title}
      </a>
    </h5>
    <div className={styles["details"]}>
      <span className={styles["source"]}>
        <a href={article.url} className={styles["link-to-article"]} target="_blank">
          {article.source.name}
        </a>
      </span>
      <div className={styles["date"]}>
        <li>{Moment(article.publishedAt).fromNow()}</li>
      </div>
    </div>
  </article>
)

ArticleListItem.prototype = {
  article: PropTypes.object.isRequired
}
export default ArticleListItem
