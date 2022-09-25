const Clientes = require("../models/clientes");


//agrega un cliente
exports.nuevoCliente = async (request, response, next) => {
  const cliente = new Clientes(request.body);
  console.log(cliente);
  try {
    await cliente.save();
    response.json({ mensaje: "OK Se agrego el cliente" });
  } catch (e) {
    response.json({ mensaje: "No se agrego el cliente" });
    next();
  }
};

// muestra todos los clientes
exports.getClientes = async (request, response, next) => {
  try {
    const clientes = await Clientes.find({});
    response.json({ clientes });
  } catch (e) {
    response.json({ mensaje: "No se cargaron los clientes" });
    next();
  }
};

//obtene un solo cliente

exports.getClienteId = async (request, response, next) => {
  const cliente = await Clientes.findById(request.params.id);
  if (!cliente) {
    response.json({ mensaje: "No se encontro el cliente" });
    next();
  }
  response.json({ cliente });
};

//actualizar un cliente
exports.updateCliente = async (request, response, next) => {
  try {
    const cliente = await Clientes.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    response.json({ cliente });
  } catch (e) {
    next();
  }
};

exports.deleteCliente = async (request, response, next) => {
  try {
    const cliente = await Clientes.findByIdAndDelete(request.params.id);
    response.json({ mensaje: "eliminado" });
  } catch (e) {
    next();
  }
};
