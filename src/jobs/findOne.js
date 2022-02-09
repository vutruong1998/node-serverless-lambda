const dynamoDB = require('../dynamodb')

module.exports.handle = async (event, ctx) => {
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