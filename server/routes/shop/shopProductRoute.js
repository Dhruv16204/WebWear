const express = require("express");

const {getFilteredProducts,getProductDetails} = require('../../controllers/shop/shopProductController')


const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);

module.exports = router;
