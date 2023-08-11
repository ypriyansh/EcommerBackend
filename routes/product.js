const express = require("express");

const { postPro,getPro, putPro, deletePro } = require("../controller/product");

 const router = express.Router();

router.post("/",postPro);


router.get("/",getPro);
router.put("/",putPro)
router.delete("/",deletePro)

 module.exports = router;