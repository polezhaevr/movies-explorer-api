require('dotenv').config();

module.exports.REG_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
module.exports.REG_ID = /[a-z0-9]{24}/;
module.exports.SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secret-key';

module.exports.DATABASE_URL = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports.PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;
