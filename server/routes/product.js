const express = require('express');
const { addProduct, newlyAdded, deleteProduct, getAllProducts } = require('../controllers/product');
const router = express.Router()

router.post('/add_product', addProduct)
router.get('/newly_added', newlyAdded)
router.delete('/delete_product', deleteProduct)
router.get('/all_products', getAllProducts)

module.exports = router