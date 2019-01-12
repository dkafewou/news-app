import NewsApi from "newsapi"
import Config from "../helpers/Config"

const API_KEY = Config.shared.requireProduction("API_KEY", "4463838f6daf4f53a36605feb6b1a7b9")

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
