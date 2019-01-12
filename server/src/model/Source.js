import API from "../api"
import { DatabaseError } from "../errors"

const DEFAULT_CATEGORY = "technology"
const DEFAULT_LANGUAGE = "en"

export default class Source {
  constructor({ rows }) {
    Object.assign(this, rows)
  }

  /**
   * Fetch all sources information
   * @static
   * @param {string} category - The category source information to fetch
   * @param {string} language - The language source information to fetch
   * @param newsAPI - Third party library instance use to fetch news
   * @returns {Promise<[Source]>}
   */
  static async fetchAll(category = DEFAULT_CATEGORY, language = DEFAULT_LANGUAGE, newsAPI = API.NewsAPI.shared) {
    try {
      const response = await newsAPI.v2.sources({
        category: category,
        language: language
      })

      if (response.sources.length > 10) {
        return response.sources.slice(0, 10).map(source => new Source(source))
      }
      return response.sources.map(source => new Source(source))
    } catch (err) {
      throw new DatabaseError("Failed to fetch source from third party news-api", err)
    }
  }

  get [Symbol.toStringTag]() {
    return "Source"
  }
}
