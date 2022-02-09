module.exports.handle = async (event, ctx) => {
    const jobs = [
        { id: 1, title: 'Nodejs' }
    ]
    return {
        statusCode: 200,
        body: JSON.stringify({
            jobs
        })
    }
}