const express = require("express");

const { postCart, getCart, putCart, deleteCart } = require("../controller/cart");
const router = express.Router();

router.post("/",postCart)
router.get("/",getCart)
router.put("/",putCart)
router.delete("/",deleteCart);



module.exports = router;