const mongoose = require("mongoose");
const {hashPassword, comparePassword} = require("../middleware/Password.Middleware.js");

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            unique:true,
            lowercase:true,
            required:true,
        },
        email:{
            type:String,
            unique:true,
            lowercase:true,
            required:true,
        },
        password:{
            type:String,
            required:true,
        }
    },{timestamps:true}
);

userSchema.pre("save",hashPassword);
userSchema.methods.comparePassword = comparePassword;

const User = mongoose.model("User", userSchema);
module.exports = User;