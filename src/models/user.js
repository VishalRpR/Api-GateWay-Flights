'use strict';
const {
  Model
} = require('sequelize');
const bcrypt=require('bcryptjs');
const {ServerConfig} = require('../config');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.role,{through:'User_Roles',as:'user'})
    }
  }
  User.init({
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
            isEmail:true
      }
      
    } ,
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
           len:[3,50]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(function encrypt(user){
    //reason for +ServerCofig is type is string and need to convert into number
    const encryptedPassword=bcrypt.hashSync(user.password,+ServerConfig.SALT_ROUNDS);
    
    user.password=encryptedPassword;
  });
  return User;
};