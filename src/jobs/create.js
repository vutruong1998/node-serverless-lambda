const uuid = require('uuid')
const dynamoDB = require('../dynamodb')

module.exports.handle = async (event, ctx) => {
    const data = JSON.parse(event.body)
    const timestamp = new Date().getTime()
    console.log(data)

    const params = {
        TableName: process.env.JOBS_TABLE,
        Item: {
            id: uuid.v1(),
            title: data.title,
            published: data.published,
            createdAt: timestamp,
            updateAt: timestamp
        }
    }
    try {
        await dynamoDB.put(params).promise()
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