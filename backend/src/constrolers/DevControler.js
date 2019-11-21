const axios = require('axios')
const Dev = require('../models/Dev')
module.exports = {
    async index(req, res) {
        const { user } = req.headers
        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.deslikes } },

            ],
        })

        return res.json(users)
    },

    // para sincronizar o tempo de resposta com outra api
    async store(req, res) {
        const { username } = req.body
        const userExists = await Dev.findOne({ user: username })
        if (userExists) {
            return res.json(userExists)
        }
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`)

            const { name, bio, avatar_url: avatar } = response.data

            const desenvolvedor = await Dev.create({
                name,
                user: username,
                bio,
                avatar
            })
            return res.json(desenvolvedor)
        } catch (e) {
            console.log(e)
        }
    }
}