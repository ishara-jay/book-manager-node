// database.js
const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'thomas',
  password: 'JPALbMyg',
  database: 'bookdb',
  connectionLimit: 5,
  allowPublicKeyRetrieval: true
});
module.exports = pool;