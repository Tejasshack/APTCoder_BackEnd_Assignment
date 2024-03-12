const jwt = require("jsonwebtoken")
const { SECRET_KEY } = process.env
const User = require("../models/user_model")

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" })
      } else {
        req.user = decoded
        next()
      }
    })
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

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body
    const user = await User.create({ username, email, password, role })
    return res.status(200).send({ message: "User registered successfully." })
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with this username." })
    }

    if (password != user.password)
      return res.status(401).send({ message: "Invalid Password..." })

    const jwtToken = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY)
    return res
      .status(200)
      .send({ message: "User login successfully.", jwtToken })
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}
