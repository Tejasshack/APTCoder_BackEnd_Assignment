const express = require("express")
const { config } = require("dotenv")
const { connectToMongoDB } = require("./config/db")
const authRouter = require("./routes/authRoute")
const courseRouter = require("./routes/courseRoute")

config()
connectToMongoDB()

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  return res.status(200).send({ message: "welcome", status: true })
})

app.use("/auth", authRouter)
app.use("/api", courseRouter)

const PORT = 4500
app.listen(PORT, () => {
  console.log("Listening on port:", PORT)
})
