const AWS = require('aws-sdk')
const uuid = require('uuid')

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
})

module.exports.handle = async (event, ctx) => {
    const data = JSON.parse(event.body)
    const timestamp = new Date().getTime()
    console.log(data)

    const params = {
        TableName: 'sls-api-jobs',
        Item: {
            id: uuid.v1(),
            title: data.title,
            published: data.published,
            createdAt: timestamp,
            updateAt: timestamp
        }
    }
    try {
        const newJob = await dynamoDB.put(params).promise()
        console.log(newJob)
        return {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}