const jwt = require("jsonwebtoken")
const { SECRET_KEY } = process.env
exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error(err) // Log the error
        return res.status(401).json({ error: "Unauthorized" })
      }
      if (decoded) {
        req.user = decoded
        next()
      }
    })

    // Skip token verification temporarily
    const decoded = jwt.decode(token)

    if (decoded) {
      req.user = decoded
      next()
    } else {
      return res.status(401).json({ error: "Unauthorized" })
    }
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

exports.isCreator = async (req, res, next) => {
  try {
    if (req.user.role !== "creator") {
      return res.status(400).json({
        success: false,
        message: "This route is only for creators!",
      })
    }
    next()
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}
