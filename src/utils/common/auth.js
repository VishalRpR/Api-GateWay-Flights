
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const { ServerConfig } = require('../../config');


function checkPassword(plainpassword,encryptedPassword){
    try {
        return bcrypt.compareSync(plainpassword,encryptedPassword)
    } catch (error) {
        console.log(error)
        throw error;
        
    }
}

function createToken(input)
{
    try {
        return jwt.sign(input,ServerConfig.JWT_SECRET,{expiresIn: ServerConfig.JWT_EXPIRY})
    } catch (error) {
        console.log(error)
        throw error
        
    }
}



module.exports={
    checkPassword,
    createToken


}