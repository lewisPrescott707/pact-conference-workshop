"use strict"

const expect = require("chai").expect
const path = require("path")
const { Pact, Matchers } = require("@pact-foundation/pact")
const { like } = Matchers
const { getMyIngredients } = require("../index")

describe("The Cake API", () => {
  let url = "http://localhost"
  const port = 8992

  const provider = new Pact({
    consumer: "MyConsumer",
    provider: "MyProvider",
    port: port,
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2,
    pactfileWriteMode: "merge",
  })

  const EXPECTED_BODY = like([])

  // Setup the provider
  before(() => provider.setup())

  // Write Pact when all tests done
  after(() => provider.finalize())

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())

  describe("get ingredients", () => {
    beforeEach(done => {
      const interaction = {
        uponReceiving: "",
        withRequest: {
          method: "GET",
          path: "/",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: EXPECTED_BODY,
        },
      }
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      getMyIngredients(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_BODY)
        done()
      }, done)
    })
  })
})
