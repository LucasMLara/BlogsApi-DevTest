require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.HOSTNAME,
    port: process.env.PORT,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
};

console.log('📓 ~ file: config.js ~ line 11 ~ process.env.PORT', process.env.PORT);
console.log('📓 ~ file: config.js ~ line 8 ~ process.env.MYSQL_PASSWORD', process.env.MYSQL_PASSWORD);
console.log('📓 ~ file: config.js ~ line 10 ~ process.env.MYSQL_DATABASE', process.env.MYSQL_DATABASE);
console.log('📓 ~ file: config.js ~ line 12 ~ process.env.HOSTNAME', process.env.HOSTNAME);
console.log('📓 ~ file: config.js ~ line 7 ~ process.env.MYSQL_USER', process.env.MYSQL_USER);
