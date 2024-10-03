const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const {SuccessResponse, ErrorResponse}=require('../utils/common')


async function signup(req,res){
        try {
           const user=await UserService.create({
            email:req.body.email,
            password:req.body.password
           })  
           
           SuccessResponse.data=user;
           res
              .status(StatusCodes.OK)
              .json(SuccessResponse)

        } catch (error) {
            console.log(error);
            ErrorResponse.error=error;


            res
              .status(error.statusCode)
              .json(ErrorResponse)
            
        }
}

module.exports={
    signup
}