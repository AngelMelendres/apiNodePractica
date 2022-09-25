const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const clientesRoutes = require("./routes/clientes.routes");
const productosRoutes = require("./routes/productos.routes");
const pedidosRoutes = require("./routes/pedidos.routes");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/proyectoApi", {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(clientesRoutes());
app.use(productosRoutes());
app.use(pedidosRoutes())

app.listen("4000");
