module.exports = {
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
}