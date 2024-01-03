const jwt = require('jsonwebtoken')

const generateToken = (userId)  => {

  return accessToken = jwt.sign({userId} , process.env.JWT_SECERT, {expiresIn: 3 * 24 * 60 * 60 * 1000})
  }

  module.exports = {generateToken}
  