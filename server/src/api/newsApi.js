import NewsApi from "newsapi"
import Config from "../helpers/Config"

const API_KEY = Config.shared.requireProduction("API_KEY", "6bf1ed229e5c43ae8cf2f53d57da17ba")

let instance

export default class NewsAPI {
  static get shared() {
    if (instance !== undefined) {
      return instance
    }
    instance = new NewsApi(API_KEY)

    return instance
  }
}
