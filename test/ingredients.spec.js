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

  // Add ingredients here
  const EXPECTED_BODY = like(["cocoa powder", "butter", "flour"])

  // Add cake name here
  const CAKE_NAME = "chocolate"

  describe("get ingredients", () => {
    after(() => provider.finalize())

    before(done => {
      const interaction = {
        // Add test scenario description here
        uponReceiving: "get request for chocolate ingredients",
        withRequest: {
          method: "GET",
          path: `/ingredients/${CAKE_NAME}`,
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
      provider
      .setup()
      .then(() => {
        provider.addInteraction(interaction)
        done()
      })
    })

    afterEach(() => provider.verify())

    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      getMyIngredients(urlAndPort, CAKE_NAME).then(response => {
        expect(response.data).to.be.a("array")
        done()
      }).catch(done)
    })
  })
})
