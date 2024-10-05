const { StatusCodes } = require("http-status-codes");
const UserRepository = require("../repositories/user-repository");
const AppError = require("../utils/errors/app-error");
const {Auth} = require("../utils/common");
const { application } = require("express");

const userRepo=new UserRepository();

async function create(data){
        try {
            const response= await userRepo.create(data);
            return response;
            
        } catch (error) {
            console.log(error)
            if(error.name=='SequelizeValidationError'||error.name=='SequelizeUniqueConstraintError'){
                     let explanation=[];
                     error.errors.forEach((err) => {
                        explanation.push(err.message);
                     });

                     throw new AppError(explanation,StatusCodes.BAD_REQUEST)
            }
            throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
        
        }
}



async function signin(data){
    try {
        console.log('inside service')
        const user=await userRepo.getUserByEmail(data.email);
        if(!user){
            throw new AppError('user with this email does not exist',StatusCodes.BAD_REQUEST)
        }
        const iscorrpassword=Auth.checkPassword(data.password,user.password)
        console.log(iscorrpassword)
        if(!iscorrpassword){
            throw new AppError('password you provided does not match ',StatusCodes.BAD_REQUEST)
        }
        const token=Auth.createToken({
         email:user.email,
         id:user.id

        })
        return token;


    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function isAuthenticated(token){
        try {
            if(!token){
                throw new AppError('missing JWT token',StatusCodes.BAD_REQUEST)
            }
            const response=Auth.verifyToken(token);
            console.log(response.id)
            const user=await userRepo.get(response.id);
            if(!user){
                throw new AppError('No user found',StatusCodes.NOT_FOUND)
            }

            return user.id;
              
        } catch (error) {
            if(error instanceof AppError) throw error;
            if(error.name == 'JsonWebTokenError') {
                throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
            }
            if(error.name=='TokenExpiredError'){
                throw new AppError('JWT token expired',StatusCodes.BAD_REQUEST)
            }
            console.log(error);
            throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
            
        }
}

module.exports={
    create,
    signin,
    isAuthenticated
}