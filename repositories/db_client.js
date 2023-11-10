var mysql = require('mysql2/promise');

async function query(sql, params) {
    var con = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        port: process.env.DB_PORT || 3308,
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'web_booking_ticket'
    });

    const [results, ] = await con.execute(sql, params);

    return results;
}

module.exports = {
    query
}