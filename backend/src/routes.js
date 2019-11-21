const express =require ('express')
const DevControler = require ('./constrolers/DevControler')
const LikeControler = require ('./constrolers/LikeControler');
const DeslikeControler = require ('./constrolers/DeslikeControler');
const routes = express.Router()

routes.get('/', (req, res) => {
    return res.json({message: `Olá ${req.query.name}`})
})

routes.post('/de', (req, res)=>{
    console.log (req.body)
    
    return res.json(
        res.json(req.body)
    )
})
routes.get('/devs/', DevControler.index)
routes.post('/devs/:devId/likes', LikeControler.store)
routes.post('/devs/:devId/deslikes', DeslikeControler.store)



routes.post('/dev', DevControler.store)
module.exports = routes