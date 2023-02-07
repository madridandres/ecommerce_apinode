const initModels = require("./init-models");
const db = require("../utils/database");

const models = initModels(db);

const {users, product, cart, product_in_order, product_in_cart, order} = models;

module.exports = {
    users,
    product,
    product_in_order,
    product_in_cart,
    order,
    cart
};