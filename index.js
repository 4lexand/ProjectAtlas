function Indumentaria() {}

function Camisa(id, stock, nombre, precio) {
  this.id = id;
  this.stock = stock;
  this.nombre = nombre;
  this.precio = precio;
}
function Pantalon(id, stock, nombre, precio) {
  this.id = id;
  this.stock = stock;
  this.nombre = nombre;
  this.precio = precio;
}
function Zapatos(id, stock, nombre, precio) {
  this.id = id;
  this.stock = stock;
  this.nombre = nombre;
  this.precio = precio;
}

Camisa.prototype = new Indumentaria();
Pantalon.prototype = new Indumentaria();
Zapatos.prototype = new Indumentaria();

let CamisaObject = new Camisa(0, 2, "Camisa", 10.5);
let PantalonObject = new Pantalon(1, 2, "Pantalon", 25.0);
let ZapatosObject = new Zapatos(2, 2, "Zapatos", 15.6);

const tiendaVirtual = (function () {
  let inventario = [CamisaObject, PantalonObject, ZapatosObject];
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
      let total = 0;
      this.carritoDeCompras.forEach((element) => {
        total += element.cantidad * element.precio;
      });

      resolve({total:total})
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

let CamisaObj = {
  id: CamisaObject.id,
  nombre: CamisaObject.nombre,
  precio: CamisaObject.precio,
  cantidad: 1,
};
let PantalonObj = {
  id: PantalonObject.id,
  nombre: PantalonObject.nombre,
  precio: PantalonObject.precio,
  cantidad: 1,
};
let ZapatosObj = {
  id: ZapatosObject.id,
  nombre: ZapatosObject.nombre,
  precio: ZapatosObject.precio,
  cantidad: 1,
};

function displayCarrito() {
  carrito.innerHTML = "";
  tiendaVirtual.carritoDeCompras.forEach((element) => {
    carrito.innerHTML += "<div>" + element.nombre + element.cantidad + "</div>";
  });
}

btnCamisa.addEventListener("click", () => {
  console.log(CamisaObject.id);
  tiendaVirtual.agregarProductos(CamisaObj);
  displayCarrito();
});
btnPantalon.addEventListener("click", () => {
  tiendaVirtual.agregarProductos(PantalonObj);
  displayCarrito();
});
btnZapatos.addEventListener("click", () => {
  tiendaVirtual.agregarProductos(ZapatosObj);
  displayCarrito();
});
btnPagar.addEventListener("click", () => {
  tiendaVirtual.realizarPago().then((resolve) => {
    console.log(resolve);
  });
});

/*
console.log(tiendaVirtual.agregarProductos({ id: 0, cantidad: 2 }));
console.log(tiendaVirtual.inventario);
console.log(tiendaVirtual.carritoDeCompras);

tiendaVirtual.realizarPago().then((response) => {
  console.log(response);
  console.log(tiendaVirtual.inventario);
});*/
