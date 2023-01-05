require('dotenv').config();

const urlMongo = process.env.URLMONGO
const secretSession = process.env.SECRETSESSION
const emailAdmin = process.env.EMAILADMIN
const passwordAdmin = process.env.PASSWORDADMIN

module.exports = { urlMongo, secretSession, emailAdmin, passwordAdmin };
