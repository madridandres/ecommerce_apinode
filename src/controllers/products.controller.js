const ProductsServices = require('../services/products.services');

const createProducts = async (req, res) => {
  try {
    const { body } = req;
    const user_id = await req.body.user_id;
    const newProduct = { ...body, user_id };
    const result = await ProductsServices.createProducts(newProduct);
    res.status(201).json({message: "Product Created"});
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllProducts = async (req, res) => {
    try {
      const products = await ProductsServices.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

module.exports = {createProducts, getAllProducts};