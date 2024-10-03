const { StatusCodes } = require("http-status-codes");
const UserRepository = require("../repositories/user-repository");
const AppError = require("../utils/errors/app-error");

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

module.exports={
    create
}