import Source from "../../model/Source"
import { expect, assert } from "chai"

describe("Sources", () => {

  describe("Fetch all sources", () => {
    // Use function instead to enable this in the scope
    it("should fetch all sources from newsapi.org", async function () {
      // Set timeout to avoid the failing since it takes more than 2s to fetch from third api
      this.timeout(5000)
      const sources = await Source.fetchAll()

      expect(sources).to.be.an("array")
      assert(sources.length <= 10, "sources length is correct")
      sources.forEach(source => {
        expect(source).to.be.a("Source")
        expect(source.id).to.be.a("string")
        expect(source.name).to.be.a("string")
      })
    })
  })
})
