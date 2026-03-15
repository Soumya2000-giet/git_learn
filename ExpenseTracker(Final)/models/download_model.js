const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../utils/connection.js')

const Download = sequelize.define('dowloads', {
  url: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING
  }
},{
  timestamps: false
});

module.exports = Download;