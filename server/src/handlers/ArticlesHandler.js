import Source from "../model/Source"
import { ResourceNotFoundError } from "../errors"
import Article from "../model/Article"

const onGet = async (req, res, next) => {
  const { category, language } = req.query

  try {
    // fetch sources information
    const sources = await Source.fetchAll(category, language)
    if (sources.length === 0) {
      next(new ResourceNotFoundError("Not information source available"))
      return
    }

    // Reduce sources to one string text for fetching articles
    const articleSources = sources.reduce((acc, source) => {
      if (acc === "") {
        return source.id
      }
      return `${acc},${source.id}`
    }, "")
    console.log(articleSources)

    // Fetch all articles
    const articles = await Article.fetchAll(articleSources)

    // Response
    return res.json({
      articles
    })
  } catch (err) {
    next(err)
  }
}

const ArticlesHandler = { onGet }
export default ArticlesHandler
