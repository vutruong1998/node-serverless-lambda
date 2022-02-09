const dynamoDB = require('../dynamodb')

module.exports.handle = async (event, ctx) => {
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
}