const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

module.exports = () => {
  router.post(
    "/productos",
    productosController.subirArchivo,
    productosController.nuevoProducto
  );
  router.get("/productos", productosController.getProductos);
  router.get("/productos/:id", productosController.getProductoId);
  router.put(
    "/productos/:id",
    productosController.subirArchivo,
    productosController.updateProducto
  );
  router.delete("/productos/:id", productosController.deleteProductos);

  return router;
};
