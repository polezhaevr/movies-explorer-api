require('dotenv').config();

module.exports.REG_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
module.exports.REG_ID = /[a-z0-9]{24}/;
module.exports.SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secret-key';
