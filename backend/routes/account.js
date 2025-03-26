const {Router} = require("express");
const router = Router();
const {authMiddleware} = require("../middlewares/middleware");
const { User, Account } = require("../db/db");
const mongoose = require('mongoose')
const zod = require('zod');


const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number()
})

router.get('/balance', authMiddleware, async(req,res)=>{
    const userid = req.userid;
    const userBalance = await Account.find({userid}, "balance").lean();
    return res.status(200).json({"balance": userBalance});
});


router.post('/transfer', authMiddleware, async(req, res)=>{

    try{
        const {success, data} = transferSchema.safeParse(req.body);
        if(!success) return res.status(400).json({"error":"invalid body"});
    
        const session = await mongoose.startSession();
        session.startTransaction();
    
        const accountfrom = await Account.findOne({userid: req.userid}).session(session);
        const accountto = await Account.findOne({userid: data.to}).session(session);
        console.log(accountfrom, accountto);
        if(!accountfrom || !accountto) {
            await session.abortTransaction();
            return res.status(400).json({"error":"invalid account"});
        }
    
        if(accountfrom.balance < data.amount) {
            await session.abortTransaction()
            return res.status(400).json({"error": "Insufficient Balance"});
        }
    
        await Account.updateOne({userid: accountfrom.userid}, {
            $inc: {balance: -data.amount}
        }).session(session);
        await Account.updateOne({userid: accountto.userid}, {
            $inc: {balance: data.amount}
        }).session(session);
    
        await session.commitTransaction();
        await session.endSession();
        return res.status(200).json({"message":"transfer successful"});
    }catch(err){
        if(session) await session.abortTransaction();
        await session.endSession();
        return res.status(400).json({"error": err.message});

    }
});


module.exports = router;