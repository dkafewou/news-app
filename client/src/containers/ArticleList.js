import { connect } from "react-redux"
import { fetchArticles, updateNewsFeed } from "../actions/articles"
import { bindActionCreators } from "redux"
import ArticleList from "../components/ArticleList"

const mapStateToProps = state => ({
  isFetching: state.app.articles.isFetching,
  error:      state.app.articles.error,
  articles:   state.app.articles.articles
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchArticles, updateNewsFeed }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleList)
