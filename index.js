function Indumentaria() {}

function Camisa(id, stock, nombre, precio) {
  this.id = id;
  this.stock = stock;
  this.nombre = nombre;
  this.precio = precio;
}

const tiendaVirtual = (function () {
  let inventario = [{}, {}, {}];
  let carritoDeCompras = [];
  let agregarProductos = function (product) {
    this.carritoDeCompras.push(product);
    console.log("El producto ha sido agregado al carrito");
  };
  let actualizarInventario = function () {};
  let realizarPago = function () {};
  return { inventario, carritoDeCompras, agregarProductos };
})();
