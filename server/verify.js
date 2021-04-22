const jwt =  require('jsonwebtoken')

const getUser = (token, jwtSecret) => {
  try {
    if (token) {
      return jwt.verify(token, jwtSecret);
    }
    return null;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getUser,
};
