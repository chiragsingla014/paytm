const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')


const authMiddleware = (req, res, next)=>{
    try{
        const auth = req.headers.authorization;
        if(!auth || !auth.startsWith("Bearer")){return res.status(403).json({"error":"invalid token"});}
        const token = auth.split(" ")[1];
        const {userid} = jwt.verify(token, JWT_SECRET);
        req.userid = userid;
        next();
    }catch(err){
        console.error(err);
        return res.status(403).json({"error":"invalid token"});
        
    }

}

module.exports = {
    authMiddleware,
}