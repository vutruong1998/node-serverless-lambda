const profiles = [
    {
        id: 1,
        name: 'Truong'
    }
]
module.exports = {
    async index(event, context) {
        return {
            statusCode: 200,
            body: JSON.stringify(profiles)
        }
    },
    async create(event, context) {
        const data = JSON.parse(event.body)
        profiles.push(data)
        return {
            statusCode: 200,
            body: JSON.stringify(profiles)
        }
    }
}