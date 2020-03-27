# pact-conference-workshop

## Setup

1. git clone https://github.com/lewis-prescott-cruk/pact-conference-workshop.git
2. cmd: ```npm install```

## Task

### Fill in the blanks
1. Using the API documentation provided create the contract file (`Note: json file is created on finalize command`)
2. Update `cake-recipe.spec.js` & `index.js`
Refer to the docs: [Pact](https://github.com/pact-foundation/pact-js#consumer-side-testing)
3. Run on cmd ```npm test```

### Upload to Broker
Request Bearer Token for request
1. Publish Pact file to broker: https://docs.pact.io/pact_broker/publishing_and_retrieving_pacts

```bash
curl -v -XPUT -H "Content-Type: application/json" \
-H "Authorization: Bearer my_token" \
-d@spec/pacts/a_consumer-a_provider.json \
http://your-pact-broker/pacts/provider/A%20Provider/consumer/A%20Consumer/version/1.0.0+4jvh387gj3
```
or on Windows
```powershell
$res = Invoke-WebRequest -Uri "http://your-pact-broker/pacts/provider/A%20Provider/consumer/A%20Consumer/version/1.0.0+4jvh387gj3" -Method Put -InFile .\a_consumer-a_provider.json -ContentType "application/json"
-Headers @{ 'Authentication' = 'Bearer xxxxxxxxxxxxxxxx'  }
```

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
paths:
  /ingredients:
    parameters:
      - in: query
        name: cake
        schema:
          type: string
        description: The name of the cake
    get:
      summary: Returns a list of ingredients.
      responses:
        '200':
          description: A JSON array of ingredients
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
```
