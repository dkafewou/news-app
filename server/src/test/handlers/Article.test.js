import Article from "../../model/Article"
import articles from "../fixtures/Articles"
import sources from "../fixtures/sources"
import chai, { expect, assert, should } from "chai"
import chaiHttp from "chai-http"
import Server from "../test-server"
import sinon from "sinon"
import Source from "../../model/Source"

should()
chai.use(chaiHttp)

describe("Articles", () => {
  let server
  const sandbox = sinon.createSandbox()

  before("All tests, start the server", async () => {
    server = await Server.start()
  })

  describe("/GET articles", () => {
    before("All tests, start the server and mock Article and Source model response", async () => {
      sandbox.stub(Source, "fetchAll").callsFake(() => sources)
      sandbox.stub(Article, "fetchAll").callsFake(() => articles)
    })

    it("should return status 200 along with articles data", async () => {
      const request = await chai.request(server)
      const res = await request.get("/v1/articles")
      res.status.should.eql(200)
      res.body.articles.length.should.eql(3)
      expect(res.body.articles).to.be.an("array")
    })

    after("All tests, drop restore sandbox", async () => {
      await sandbox.restore()
    })
  })

  describe("/GET articles errors", () => {
    before("All tests, start the server and mock Article and Source model response", async () => {
      sandbox.stub(Source, "fetchAll").callsFake(() => [])
      sandbox.stub(Article, "fetchAll").callsFake(() => articles)
    })

    it("should return status 404 along with error object", async () => {
      const request = await chai.request(server)
      const res = await request.get("/v1/articles")
      res.status.should.eql(500)
      should().exist(res.error)
    })

    after("All tests, drop restore sandbox", async () => {
      await sandbox.restore()
    })
  })

  after("All tests, close server and drop restore sandbox", async () => {
    await sandbox.restore()
    await server.close()
  })
})
