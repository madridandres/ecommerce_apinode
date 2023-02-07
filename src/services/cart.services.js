const models = require("../models");

class CartServices {
  static async cartCreate(newCart) {
    try {
      const result = await models.cart.create(newCart);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getCart(user) {
    console.log(user);
    try {
      const cart = await models.cart.findOne({
        where: { id },
      });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  static async addProductInCart(addProductToCart) {
    try {
      const result = await models.product_in_cart.create(addProductToCart);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getProductsInCart(user) {
    try {
      const user_id = user.id;
      console.log(user_id);
      const cart = await models.cart.findOne({
        where: { user_id },
        include: {
          model: models.product_in_cart,
          as: "product_in_carts",
          include: {
            model: models.product,
            as: "product",
          },
        },
      });
      return cart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartServices;
