const {Router} = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const bc = require('bcrypt');
const zod = require('zod');
const {User, Account} = require('../db/db')
const {JWT_SECRET} = require("../config");
const {authMiddleware} = require("../middlewares/middleware")

const signup = zod.object({
    username: zod.string().min(3).max(30),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50)
})

const signin = zod.object({
    username: zod.string().min(3).max(30),
    password: zod.string().min(6)
})

const put = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().max(50).optional(),
    lastName: zod.string().max(50).optional()
})

router.post('/signup', async(req, res)=>{
    try{
        const {success, data} = signup.safeParse(req.body);
        if(!success) return res.status(411).json({"error":"incorrect data"});
        const existingUser = await User.findOne({username: data.username});
        if(existingUser) return res.status(411).json({"error": "user already exists"});
        data.password = await bc.hash(data.password, 10);
        const user = await User.create(data);
        const userid = user._id;

        await Account.create({
            userid,
            balance: Math.floor(Math.random() * 10000) + 1
        })

        const token = jwt.sign({userid}, JWT_SECRET);
        return res.status(200).json({message: "User created Successfully", token});

    }catch(err){console.log(err);}

});


router.post('/signin', async(req, res)=>{
    try{
        const {success, data} = signin.safeParse(req.body);
        if(!success) return res.status(411).json({"error": "incorrect data"});
        const user = await User.findOne({username: data.username});
        const isMatch = await bc.compare(data.password, user.password);
        if(!isMatch) return res.status(411).json({"error": "password is incorrect"})
        if(!user) return res.status(411).json({"error": "username or password incorrect"});
        const userid = user._id;
        const token = jwt.sign({userid}, JWT_SECRET);
        return res.status(200).json({message: "User logged in", token});


    }catch(err){console.log(err);}
});



router.put("/", authMiddleware, async(req, res)=>{
    try{
        const userid = req.userid;
        const user = await User.findOne({_id: userid});
        const {success, data} = put.safeParse(req.body);
        if(!success) return res.status(411).json({"error": "invalid body"});

        const updatedUser = await User.findOneAndUpdate(
            { _id: userid }, 
            { $set: data }, 
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            console.error(updatedUser);
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({"message": "updated succefully"})

    }catch(err){return res.status(404).json({ err });}
});


router.get("/bulk", authMiddleware, async(req,res)=>{
    try{
        let filter = req.query.filter || "";
        filter = new RegExp(filter, "i");
        const users = await User.find({
            $or: [{ firstName: { $regex: filter} },
                { lastName: { $regex: filter} }]
        }, "firstName lastName _id");
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({users})
    }catch(err){return res.status(411).json({"error": err.message})}


});


module.exports = router;