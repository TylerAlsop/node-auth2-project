const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
// const session = require("express-session")
const cookieParser = require("cookie-parser")

const usersRouter = require("./routers/users/usersRouter")
const authRouter = require("./routers/authRouter")


const server = express()
const port = process.env.PORT || 5555

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser())

server.use("/users", usersRouter)
server.use("/auth", authRouter)

server.get("/", (req, res, next) => {
	res.json({
		message: "Welcome to my new auth API.",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Oh no. Something went wrong.",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
