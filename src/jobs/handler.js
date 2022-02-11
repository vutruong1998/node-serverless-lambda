const middy = require('@middy/core')

const jsonBodyParser = require('@middy/http-json-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const validator = require('@middy/validator')
const customerMiddleware = require('../../middleware/customMiddleware')

const baseHandler = async (event, context) => {
  const { creditCardNumber, expiryMonth, expiryYear, cvc, nameOnCard, amount } = event.body
  console.log(event.body)

  const response = { result: true, message: 'Payment processed correctly'}
  return { statusCode: 200, body: JSON.stringify(response) }
}

const inputSchema = {
 type: 'object',
 properties: {
   body: {
      type: 'object',
      properties: {
        creditCardNumber: { type: 'string', minLength: 12, maxLength: 19, pattern: '\\d+' },
        expiryMonth: { type: 'integer', minimum: 1, maximum: 12 },
        expiryYear: { type: 'integer', minimum: 2017, maximum: 2027 },
        cvc: { type: 'string', minLength: 3, maxLength: 4, pattern: '\\d+' },
        nameOnCard: { type: 'string' },
        amount: { type: 'number' }
      },
      required: ['creditCardNumber']
   }
 }
}

module.exports.handle = middy(baseHandler)
  // .use(customerMiddleware({ a: 'a' }))
  .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
  .use(validator({ inputSchema })) // validates the input
  .use(httpErrorHandler()) // handles common http errors and returns proper responses
