const AuthServices = require("../services/auth.services");
const CartServices = require('../services/cart.services');
const transporter = require("../utils/mailer");

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await AuthServices.register(user);
    if (result) {
      await CartServices.cartCreate({user_id: result.id, total_price: 0});
      res.status(201).json({ message: "user created" });
      await transporter.sendMail({
        to: result.email,
        from: "madridandres.107.am@gmail.com",
        subjetc: "Email confirmation",
        html: "<h1>Bienvenido a la mejor app de ecommerce creada por mi</h1> <p>Tienes que confirmar tu email</p><p> Solo haz click en el siguiente <a href='#'' target='new_blank'> enlace </a>",
      });
    } else {
      res.status(400).json({ message: "somethign wrong" });
    }
  } catch (error) {
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not email provided",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not password provided",
      });
    }
    const result = await AuthServices.login({ email, password });
    if (result.isValid) {
      const { username, id, email } = result.user;
      const userData = { username, id, email };
      const token = AuthServices.genToken(userData);
      userData.token = token;
      res.json(userData);
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something wrong" });
  }
};

module.exports = {
  register,
  login,
};
