const {Router} = require('express');
const {
    addProductInCart,
} = require('../controllers/cart.controller');

const router = Router();

router.post('/add', addProductInCart);

module.exports = router;