const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')


const forgotpassword = sequelize.define('forgotpassword',{

    id : {
        type : Sequelize.UUID,
         allowNull:false,
        primaryKey : true,
    },

    isactive :{
        type : Sequelize.BOOLEAN
    }
}

)

module.exports = forgotpassword