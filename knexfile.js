// Update with your config settings.

require('dotenv').config();

const CLIENT_SQLITE = 'sqlite3';
const CLIENT_POSTGRES = 'pg';

const CLIENT = process.env.DB_CLIENT;
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error(`database uri should be specified`);
}

let connection;
switch (CLIENT) {
  case CLIENT_SQLITE:
    connection = {filename: DB_URI};
    break;
  case CLIENT_POSTGRES:
    connection = DB_URI;
    break;
  default:
    throw new Error(`unknown database client: ${CLIENT}`);
}

module.exports = {
  client: process.env.DB_CLIENT,
  connection: process.env.DB_CLIENT === 'sqlite3' ? {filename: process.env.DB_URI} : process.env.DB_URI
};
