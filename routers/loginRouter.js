const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users/usersModel")
const restrict = require("../middleware/restricted")

const router = express.Router()


router.post("/", async (req, res, next) => {
	const authError = {
		message: "Invalid Credentials",
	}

	try {
		const user = await Users.findBy({ username: req.body.username }).first()
		if (!user) {
			return res.status(401).json(authError)
        }
        
		const passwordValid = await bcrypt.compare(req.body.password, user.password)
		if (!passwordValid) {
			return res.status(401).json(authError)
		}

		const tokenPayload = {
			userId: user.id,
			department: user.department, 
		}

		res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET))

		res.json({
			message: `Welcome ${user.username}!`,
			token: jwt.sign(tokenPayload, process.env.JWT_SECRET),
		})
	} catch(err) {
		next(err)
	}
})

module.exports = router