# pact-conference-workshop

## Setup

1. git clone https://github.com/lewis-prescott-cruk/pact-conference-workshop.git
2. cmd: ```npm install```

## Task

### Fill in the blanks
1. Using the API documentation provided create the contract file (`Note: json file is created on finalize command`)
2. Update `ingredients.spec.js`
| Refer to the docs: [Pact](https://github.com/pact-foundation/pact-js#consumer-side-testing)
3. Run on cmd ```npm test```

### Upload to Broker
Request Bearer Token for request
1. Publish Pact file to broker: https://docs.pact.io/pact_broker/publishing_and_retrieving_pacts
2. Run on cmd ```npm run publish```

## Documentation

### Response
Json:
```json
[
   "butter",
   "caster sugar",
   "eggs",
   "self-raising flour",
   "baking powder",
   "cocoa powder"
]
```
### Swagger
```yaml
swagger: "2.0"
info:
  description: "This is a sample Cake server."
  version: "1.0.0"
  title: "Cake recipes"
host: "localhost"
basePath: "/"
schemes:
- "http"
paths:
  /ingredients/{id}:
    get:
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
        - name: id
          in: path
          description: Cake Name
          required: true
          type: string
      responses:
        "200":
          description: "Cake Returned"
```
