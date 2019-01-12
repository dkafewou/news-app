import API from "../api"
import { DatabaseError } from "../errors"

export default class Article {
  constructor(rows) {
    Object.assign(this, rows)
  }

  /**
   * Fetch all articles
   * @static
   * @param {string} sources - The sources to fetch articles from
   * @param newsAPI - Third party library instance use to fetch news
   * @returns {Promise<[Article]>}
   */
  static async fetchAll(sources, newsAPI = API.NewsAPI.shared) {
    try {
      const response = await newsAPI.v2.topHeadlines({
        sources: sources
      })

      return response.articles.map(article => new Article(article))
    } catch (err) {
      throw new DatabaseError("Failed to fetch articles from third party news-api", err)
    }
  }

  get [Symbol.toStringTag]() {
    return "Article"
  }
}
