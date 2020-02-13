# pact-conference-workshop

## Setup

1. git clone https://github.com/lewis-prescott-cruk/pact-conference-workshop.git
2. cmd: ```npm install```

## Fill in the blanks
1. Using the API documentation provided create the contract file (`Note: json file is created on finalize command`)
2. Update `cake-recipe.spec.js` & `index.js`
3. Run on cmd ```npm test```

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
