const sql = require('mysql2')

const pool = sql.createPool({
    host :'localhost',
    user :'root',
    database:'roo_db',
    password:'123456'

})

module.exports = pool.promise();