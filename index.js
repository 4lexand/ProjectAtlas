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

  let actualizarInventario = function actualizarInventario() {
    return new Promise((resolve) => {
      if (this.carritoDeCompras.length > 0) {
        for (let i = 0; i < this.carritoDeCompras.length; i++) {
          let productSell = this.carritoDeCompras[i];
          this.inventario[productSell.id].stock =
            this.inventario[productSell.id].stock - productSell.cantidad;
        }
      }
      resolve("Inventario Actualizado");
    });
  };
  let realizarPago = async function () {
    let actualizarInventarioPago = await this.actualizarInventario;
    console.log(actualizarInventarioPago);
    return actualizarInventarioPago;
  };
  return { inventario, carritoDeCompras, agregarProductos, realizarPago };
})();

console.log(tiendaVirtual.agregarProductos({ id: 0, cantidad: 1 }));
console.log(tiendaVirtual.inventario);
console.log(tiendaVirtual.carritoDeCompras);

tiendaVirtual.realizarPago().then((response)=>{
  console.log(response);
})
