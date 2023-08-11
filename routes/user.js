const express = require("express");
const { GetUsers, PostUser, putUser, deleteUser } = require("../controller/user");
const router = express.Router();

router.get("/", GetUsers);
router.post("/", PostUser)
router.put("/", putUser)
router.delete("/", deleteUser)


module.exports = router;