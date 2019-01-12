import ScheduleHandler from "./ScheduleHandler"
import Source from "../model/Source"
import Article from "../model/Article"

export default class NewsFeedHandler extends ScheduleHandler {
  async fire(fireTime, socket) {
    this.logMessage(`Fetching news from newsapi.org and update feed (${fireTime})`)

    const sources = await Source.fetchAll()
    if (sources.length === 0) {
      this.logMessage(`Not information source available at this: (${fireTime})`)
      return
    }

    for (const source of sources) {
      Article.fetchAll(source.id).then(articles => {
        socket.emit("NewsFeed", articles)
        this.logSuccess(`Fetched news feed from ${source.name} and update feed`)
      }).catch(err => {
        this.logError(`Failed to fetch news feed from ${source.name}`, err)
      })
    }
  }
}
