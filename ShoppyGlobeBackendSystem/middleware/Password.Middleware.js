const bcrypt = require("bcrypt");

async function hashPassword(next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next(); 
    } catch (error) {
        next(error); 
    };
};

async function comparePassword(password){
    try {
        return await bcrypt.compare(password,this.password);
    } catch (error) {
        console.log("error: ",error.message);
    }
}

module.exports = {hashPassword, comparePassword}
