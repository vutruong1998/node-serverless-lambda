module.exports.handle = async (event, context) => {
    console.log(event)
    return {
        statusCode: 200,
        body: JSON.stringify({
            "message": "I'm from jobs handler"
        })
    }
}