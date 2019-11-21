const Dev = require ('../models/Dev')
module.exports = {
    async store(req, res){
        console.log (req.params.devId)
        console.log (req.headers.user)
        const {user} = req.headers
        const {devId} = req.params

        const loggedDev = await Dev.findById(user)
        const targetUser = await Dev.findById(devId)

        if (!targetUser){
            return res.status(400).json({error: 'Dev bad request'})
        }

        loggedDev.deslikes.push(targetUser._id)
        await loggedDev.save()
        
        return res.json (loggedDev)
    }
}