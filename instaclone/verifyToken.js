const jwt = require('jsonwebtoken')


module.exports= function auth(req,res,next) {

    const authHeader =req.headers['authorization']
    const token =authHeader && authHeader.split(' ')[1]
    if(token ==null) return res.sendStatus(401).send('Access denied')


    try{
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
            if(err) return res.sendStatus(403)
            req.user =user
            next()
        })
       
    }catch(err) {
        res.status(400).send('Invalid token')
    }
}

