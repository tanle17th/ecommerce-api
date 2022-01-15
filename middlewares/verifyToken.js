const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  // gonna pass token thru headers
  const authHeader = req.headers.token
  if (authHeader) {
    // split with ' ' to get rid of whitespaces
    const token = authHeader.split(' ')[1]
    // if has token:
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      // check whether token is expired/wrong:
      if (err) return res.status(403).json('Token is invalid')

      // create a req.user object, and pass the user
      // if verify successfully
      req.user = user
      next()
    })
  } else {
    return res.status(401).json('You are not authenticated')
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // OR (||), the expression is evaluated until we get one true
    // 1. if twos id equal to each other, return true
    // 2. if not, check if admin, return true
    // 3. neither one, return false
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      res.status(403).json('Wrong User ID or Not an Admin!')
    }
  })
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // if admin, full access:
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(403).json('You must be admin to implement this!')
    }
  })
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
}
