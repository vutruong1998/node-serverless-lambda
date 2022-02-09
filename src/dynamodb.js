const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: process.env.REGION,
    endpoint: process.env.ENDPOINT,
    accessKeyId: process.env.DEFAULT_ACCESS_KEY,
    secretAccessKey: process.env.DEFAULT_SECRET
})

module.exports = dynamodb