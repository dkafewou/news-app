import API from "../api"
import { DatabaseError } from "../errors"

const DEFAULT_CATEGORY = "technology"
const DEFAULT_LANGUAGE = "en"

export default class Article {
  constructor({ rows }) {
    Object.assign(this, rows)
  }

  /**
   * Fetch all articles
   * @static
   * @param {string} sources - The sources to fetch articles from
   * @param {string} category - The category source information to fetch
   * @param {string} language - The language source information to fetch
   * @param newsAPI - Third party library instance use to fetch news
   * @returns {Promise<[Article]>}
   */
  static async fetchAll(sources, category = DEFAULT_CATEGORY, language = DEFAULT_LANGUAGE, newsAPI = API.NewsAPI.shared) {
    try {
      const response = await newsAPI.v2.topHeadlines({
        sources:  sources,
        category: category,
        language: language
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
