import Article from "../../model/Article"
import { expect } from "chai"

describe("Articles", () => {

  describe("Fetch all articles", () => {
    // Use function instead to enable this in the scope
    it("should fetch all articles from newsapi.org", async function () {
      // Set timeout to avoid the failing since it takes more than 2s to fetch from third api
      this.timeout(5000)
      const sources = "bbc-news,the-verge"
      const articles = await Article.fetchAll(sources)

      expect(articles).to.be.an("array")
      articles.forEach(article => {
        expect(article).to.be.a("Article")
        expect(article.title).to.be.a("string")
        expect(article.source).to.be.an("object")
      })
    })
  })
})
