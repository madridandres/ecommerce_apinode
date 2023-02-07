const CartServices = require('../services/cart.services');


const addProductInCart = async (req, res) => {
    try {
        const addProductToCart = req.body;
        const result = await CartServices.addProductInCart(addProductToCart);
        res.status(201).json({message: "product added to cart successfully"})
    } catch (error) {
        res.status(400).json(error.message);
    }
}


module.exports = {
    addProductInCart,
};