const User = require("../model/User.Model.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email, and password!"
        });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists!"
            });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            status: 500,
            success: false
        });
    };
};


exports.login = async (req,res) =>{
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Please provide username and password!"
        });
    }
    
    try {
        const user = await User.findOne({username});

        if(!user || !await user.comparePassword(password)){
            return res.status(400).json(
                {
                    message:"Invalid credentials!"
                }
            );
        };

        const token = jwt.sign(
            {userId:user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn:process.env.JWT_EXPIRES_IN}
        );

        res.status(200).json({token});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};
