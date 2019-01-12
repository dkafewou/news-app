import Scheduler from "node-schedule"
import NewsFeedHandler from "./scheduler-handler/NewsFeedHandler"

const serve = async (socket) => {
  /*
   Fetch news from newsapi.org and update app feed every 30 second
   */
  const newsFeedHandler = new NewsFeedHandler()
  Scheduler.scheduleJob("*/30 * * * * *", (fireTime) => {
    return newsFeedHandler.fire(fireTime, socket)
  })
  console.log("News has been send to news-app")
}

const ServerScheduler = { serve }
export default ServerScheduler
