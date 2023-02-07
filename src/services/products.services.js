const models = require("../models");
const {Op} = require('sequelize');

class ProductsServices {
  static async createProducts(newProduct) {
    try {
      const product = await models.product.create(newProduct);
      return product;
    } catch (error) {
      throw error;
    }
  }

  static async getAllProducts() {
    try {
      const products = models.product.findAll({
        where: {
          available_Qty: {
            [Op.gt]: 0,
          },
        },
        include: {
          model: models.users,
          as: 'user',
          attributes: {
            exclude: ['password', 'email'],
          },
        },
      });
      return products;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await models.product.findByPk(id);
      if (result) {
        return { isValid: true, result };
      }
      return { isValid: false };
    } catch (error) {
      throw error;
    }
  }
  static async update(id, quantity) {
    try {
      const result = await models.product.decrement(
        { available_Qty: quantity },
        { where: { id } }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductsServices;