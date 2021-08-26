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
    if (existingProduct.length == 0) {
      this.carritoDeCompras.push(product);
    } else {
      this.carritoDeCompras[existingProduct[0].id].cantidad++;
    }
    alert("El producto ha sido agregado al carrito");
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

let btnCamisa = document.querySelector("#btnAgregarCamisa");
let btnPantalon = document.querySelector("#btnAgregarPantalon");
let btnZapatos = document.querySelector("#btnAgregarZapatos");
let btnPagar = document.querySelector("#btnPagar");
let carrito = document.querySelector("#carrito");

let Camisa = { id: 0, nombre: "Camisa", cantidad: 1 };
let Pantalon = { id: 1, nombre: "Pantalon", cantidad: 1 };
let Zapatos = { id: 2, nombre: "Zapatos", cantidad: 1 };

function displayCarrito() {
  carrito.innerHTML = "";
  tiendaVirtual.carritoDeCompras.forEach((element) => {
    carrito.innerHTML += "<div>" + element.nombre + element.cantidad + "</div>" ;
  });
}

btnCamisa.addEventListener("click", () => {
  tiendaVirtual.agregarProductos(Camisa);
  displayCarrito()
});
btnPantalon.addEventListener("click", () => {
  tiendaVirtual.agregarProductos(Pantalon);
  displayCarrito()
});
btnZapatos.addEventListener("click", () => {
  tiendaVirtual.agregarProductos(Zapatos);
  displayCarrito()
});
btnPagar.addEventListener("click", () => {
  console.log(tiendaVirtual.carritoDeCompras);
});

/*
console.log(tiendaVirtual.agregarProductos({ id: 0, cantidad: 2 }));
console.log(tiendaVirtual.inventario);
console.log(tiendaVirtual.carritoDeCompras);

tiendaVirtual.realizarPago().then((response) => {
  console.log(response);
  console.log(tiendaVirtual.inventario);
});*/
