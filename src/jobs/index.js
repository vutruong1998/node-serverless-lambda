const uuid = require('uuid')
const dynamoDB = require('../dynamodb')

module.exports = {
    async index(event, context) {
        try {
            const results = await dynamoDB
                .scan({
                    TableName: process.env.JOBS_TABLE
                })
                .promise()
            return {
                statusCode: 200,
                body: JSON.stringify(results)
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify(error)
            }
        }
    },
    async create(event, context) {
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
    },
    async findOne(event, context) {
        const id = event.pathParameters.id
        try {
            const result = await dynamoDB
                .get({
                    TableName: process.env.JOBS_TABLE,
                    Key: {
                        id
                    }
                })
                .promise()
            return {
                statusCode: 200,
                body: JSON.stringify(result)
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify(error)
            }
        }
    }
}