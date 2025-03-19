// const sql = require('mysql2')

// const pool = sql.createPool({
//     host :'localhost',
//     user :'root',
//     database:'roo_db',
//     password:'123456'

// })

// module.exports = pool.promise();


const Sequelize = require('sequelize')

const connection = new Sequelize('roo_db','root','123456',{dialect:'mysql',host:'localhost'})

module.exports = connection