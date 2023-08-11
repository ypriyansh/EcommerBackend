const express = require("express");
const {  postAdd, getAdd, putAdd, deleteAdd } = require("../controller/address");
const router = express.Router();

// console.log("hii ")

router.get("/",getAdd);
router.post("/",postAdd);
router.put("/",putAdd);
router.put("/",deleteAdd)




module.exports = router