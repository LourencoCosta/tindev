const Dev = require('../models/Dev')
module.exports = {
    async store(req, res) {

        console.log (req.connectedUsers)

        //console.log(req.params.devId)
        //console.log(req.headers.user)
        const { user } = req.headers
        const { devId } = req.params

        const loggedDev = await Dev.findById(user)
        const targetUser = await Dev.findById(devId)

        if (!targetUser) {
            return res.status(400).json({ error: 'Dev bad request' })
        }
        if (targetUser.likes.includes(loggedDev._id)) {
            const loggedSocket = req.connectedUsers[user]
            const targetSocket = re.connectedUsers[devId]
            if (loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev)
            }

            if (targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev)
            }
        }
        loggedDev.likes.push(targetUser._id)
        await loggedDev.save()



        return res.json(loggedDev)
    }
}