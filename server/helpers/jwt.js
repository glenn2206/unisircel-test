const jwt = require('jsonwebtoken')

function jwtSign(payload) {
    return jwt.sign(payload, 'rahasia')
}

module.exports = jwtSign