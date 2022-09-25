const { json } = require("body-parser");
const Productos = require("../models/productos");
const multer = require("multer");
const shortid = require("shortid");

//configuacion de multer para subir imagenes
const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No válido"));
    }
  },
};

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single("imagen"); //imagen es el nombre del campo

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

exports.nuevoProducto = async (request, response, next) => {
  const producto = new Productos(request.body);

  try {
    if (request.file.filename) {
      producto.imagen = request.file.filename;
    }
    console.log(producto);
    await producto.save();
    response.json({ mensaje: "producto agregado" });
  } catch (e) {
    console.log("error al subir");
    next();
  }
};

exports.getProductos = async (request, response, next) => {
  try {
    const productos = await Productos.find({});
    response.json({ productos });
  } catch (e) {
    console.log("error");
    next();
  }
};

exports.getProductoId = async (request, response, next) => {
  try {
    const producto = Productos.findById(request.params.id);

    if (!producto) {
      return response.json({ mensaje: "no se encontro este producto" });
    }
    response.json({ producto });
  } catch (e) {
    next();
  }
};
exports.updateProducto = async (request, response, next) => {
  try {
    const productoAnterior = await Productos.findById(request.params.id);

    const productoNuevo = request.body;

    if (request.file) {
      productoNuevo.imagen = request.file.filename;
    } else {
      productoNuevo.imagen = productoAnterior.imagen;
    }


    const producto = await Productos.findByIdAndUpdate(
      request.params.id,
      productoNuevo,
      { new: true }
    );

    response.json({ producto });
  } catch (e) {
    console.log("error");
    next();
  }
};
exports.deleteProductos = async (request, response, next) => {
  try {
    await Productos.findByIdAndDelete(request.params.id);
    response.json({ mensaje: "eliminado correctamnete" });
  } catch (e) {
    next();
  }
};
