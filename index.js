function Indumentaria(id, stock, nombre, precio) {
  this.id = id;
  this.stock = stock;
  this.nombre = nombre;
  this.precio = precio;
}

const tiendaVirtual = (function () {
  let inventario = [
    new Indumentaria(0, 2, "Camisa", 10.5),
    new Indumentaria(1, 2, "Pantalon", 25.0),
    new Indumentaria(2, 2, "Zapatos", 15.6),
  ];
  let carritoDeCompras = [];
  let agregarProductos = function (product) {
    this.carritoDeCompras.push(product);
    console.log("El producto ha sido agregado al carrito");
  };

  let actualizarInventario = function () {
    return new Promise((resolve, reject) => {});
  };
  let realizarPago = function () {};
  return { inventario, carritoDeCompras, agregarProductos, realizarPago };
})();

console.log(tiendaVirtual.inventario);
