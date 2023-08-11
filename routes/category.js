const express = require("express");
const { postCat, getCat, putCat,deleteCat } = require("../controller/category");
const router = express.Router();


router.get("/",getCat);
router.post("/",postCat);
router.put("/",putCat);
router.delete("/",deleteCat);

module.exports = router