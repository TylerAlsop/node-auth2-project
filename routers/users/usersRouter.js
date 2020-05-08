const express = require("express")
const Users = require("./usersModel")
const restrict = require("../../middleware/restricted")

const router = express.Router()

router.get("/", restrict("hr"), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

module.exports = router