const Pedidos = require("../models/pedidos");

exports.nuevoPedido = async (request, response, next) => {
  const pedido = new Pedidos(request.body);

  try {
    await pedido.save();
    response.json({ mensaje: "pedido registrado" });
  } catch (e) {
    console.log(e);
    next();
  }
};

exports.getPedidos = async (request, response, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate("cliente").populate({
      path: "productos.producto",
      model: "Productos",
    });
    response.json({ pedidos });
  } catch (e) {
    console.log(e);
    next();
  }
};

exports.getPedidoId = async (request, response, next) => {
  try {
    const pedido = await Pedidos.findById(request.params.id)
      .populate("cliente")
      .populate({
        path: "productos.producto",
        model: "Productos",
      });
    response.json({ pedido });
  } catch (e) {
    console.log(e);
    next();
  }
};

exports.updatePedido = async (request, response, next) => {
  try {
    const pedido = await Pedidos.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );

    response.json({ pedido });
  } catch (e) {
    console.log(e);
    next();
  }
};

exports.deletePedido = async (request, response, next) => {
  try {
    await Pedidos.findByIdAndDelete(request.params.id);
    response.json({ mensaje: "pedido eliminado" });
  } catch (e) {
    console.log(e);
    next();
  }
};
