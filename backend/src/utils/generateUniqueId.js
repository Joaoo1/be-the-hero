const crypto = require('crypto')

//Retorna um id aleatório de 4 Bytes em hexadecimal (8 Caracteres)
module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');
}