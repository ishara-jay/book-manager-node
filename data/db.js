const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'thomas',
    password: 'JPALbMyg',
    database: 'library',
    connectionLimit: 10,  // Number of connections in the pool
    acquireTimeout: 10000, // Wait time before error if no connection is available
    idleTimeout: 30000,    // Keep idle connections alive for 30 seconds
    multipleStatements: true, // Allow multiple SQL statements
});

module.exports = pool;