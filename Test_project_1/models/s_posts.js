const {Sequelize, DataTypes} = require('sequelize')

const sequelize= require('../utils/connection.js')

const Post = sequelize.define('posts',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    link_id:{
        type:DataTypes.STRING,
        unique:true
    },
    description:{
        type:DataTypes.STRING,
       
    }  
})

module.exports = Post
