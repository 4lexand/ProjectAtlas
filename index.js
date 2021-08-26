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
    let existingProduct = this.carritoDeCompras.filter(
      (item) => item.id == product.id
    );
    console.log(existingProduct.length);
    if (existingProduct.length == 0) {
      this.carritoDeCompras.push(product);
    } else {
      //this.carritoDeCompras[existingProduct.id].cantidad= this.carritoDeCompras[existingProduct.id].cantidad+1;
    }

    //console.log("El producto ha sido agregado al carrito");
  };

  let actualizarInventario = function () {
    for (let i = 0; i < this.carritoDeCompras.length; i++) {
      let productSell = this.carritoDeCompras[i];
      this.inventario[productSell.id].stock =
        this.inventario[productSell.id].stock - productSell.cantidad;
    }
  };
  let realizarPago = async function () {
    return new Promise((resolve) => {
      this.actualizarInventario();
      resolve("Inventario Actualizado");
    });
  };
  return {
    inventario,
    carritoDeCompras,
    agregarProductos,
    realizarPago,
    actualizarInventario,
  };
})();
/*
let btnCamisa = document.querySelector("#btnAgregarCamisa");
let btnPantalon = document.querySelector("#btnAgregarPantalon");
let btnZapatos = document.querySelector("#btnAgregarZapatos");
let btnPagar = document.querySelector("#btnPagar");

btnCamisa.addEventListener("click", () => {
  tiendaVirtual.agregarProductos({ id: 0, cantidad: 1 });
});
btnPantalon.addEventListener("click", () => {
  tiendaVirtual.agregarProductos({ id: 1, cantidad: 1 });
});
btnZapatos.addEventListener("click", () => {
  tiendaVirtual.agregarProductos({ id: 2, cantidad: 1 });
});
btnPagar.addEventListener("click", () => {
  console.log(tiendaVirtual.carritoDeCompras);
});
*/

console.log(tiendaVirtual.agregarProductos({ id: 0, cantidad: 1 }));
console.log(tiendaVirtual.agregarProductos({ id: 0, cantidad: 1 }));
console.log(tiendaVirtual.carritoDeCompras);
/*
console.log(tiendaVirtual.agregarProductos({ id: 0, cantidad: 2 }));
console.log(tiendaVirtual.inventario);
console.log(tiendaVirtual.carritoDeCompras);

tiendaVirtual.realizarPago().then((response) => {
  console.log(response);
  console.log(tiendaVirtual.inventario);
});*/
