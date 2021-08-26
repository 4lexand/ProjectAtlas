const tiendaVirtual = (function () {
  let inventario = [];
  let carritoDeCompras = [];
  let agregarProductos = function (product) {
    this.carritoDeCompras.push(product);
    console.log("El producto ha sido agregado al carrito");
  };
  return { inventario, carritoDeCompras };
})();
