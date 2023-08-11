const express = require("express");
const { orderpost, orderget } = require("../controller/order");
const router = express.Router();


router.post("/",orderpost);
router.get("/",orderget);

module.exports = router;