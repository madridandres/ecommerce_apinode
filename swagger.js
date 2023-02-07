const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const options = {
    apis: [
        "./src/routes/auth.routes.js",
        "./src/models/users.js"
    ],
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce en node js",
            version: "0.0.9",
            description: "API para una ecommerce"
        }
    }
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader({"Content-Type": "application/json"});
        res.send(swaggerSpec)
    });
    console.log(`La documentación está disponible en ${process.env.URL}:${port}/api/v1/docs`);
}

module.exports = swaggerDocs;