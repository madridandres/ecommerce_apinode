const { Router } = require('express');
const {createProducts, getAllProducts} = require('../controllers/products.controller');

const router = Router();

router.post('/', createProducts);
router.get('/', getAllProducts);

module.exports = router;