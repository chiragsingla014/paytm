const mongoose = require('mongoose');
const { type } = require('os');
require('dotenv').config();
const url = process.env.MONGO_URI;


  mongoose.connect(url)
  .then(()=>{console.log("Database Connected")})
  .catch((err)=>{console.error(err)});


  const UserSchema = new mongoose.Schema({
    username: {type: String ,required: true, trim: true, unique: true, minLength: 3, maxLength: 30, lowercase: true},
    password: {type: String, required: true, minLength: 6},
    firstName: {type: String, required: true, trim: true, maxLength: 50},
    lastName: {type: String, required: true, trim: true, maxLength: 50},
    })


  const accountSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    balance: {type: Number, required: true}
  })

  const User = mongoose.model('User', UserSchema);
  const Account = mongoose.model('Account', accountSchema);



  module.exports = {
    User,
    Account
  }