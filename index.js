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
      this.carritoDeCompras.forEach((element) => {
        if (element.id == existingProduct[0].id) {
          element.cantidad = element.cantidad + 1;
        }
      });
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
      let carritoTerminado = this.carritoDeCompras;
      //reseteando el carrito de compras media vez haya terminado compra
      this.carritoDeCompras = [];

      resolve({ total: total, productos: carritoTerminado });
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
//elementos del html
let btnCamisa = document.querySelector("#btnAgregarCamisa");
let btnPantalon = document.querySelector("#btnAgregarPantalon");
let btnZapatos = document.querySelector("#btnAgregarZapatos");
let btnPagar = document.querySelector("#btnPagar");
let carrito = document.querySelector("#carrito");
let total = document.querySelector("#total");
let despedida = document.querySelector("#despedida");
let productosComprados = document.querySelector("#productosComprados");

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
  if (tiendaVirtual.carritoDeCompras.length > 0) {
    tiendaVirtual.carritoDeCompras.forEach((element) => {
      carrito.innerHTML +=
        "<div class='element'>" +
        element.nombre +
        " - " +
        element.cantidad +
        " - $" +
        element.precio +
        "c/u" +
        "</div>";
    });
  }
}

function displayPago(data) {
  total.innerHTML = "$" + data.total;
  productosComprados.innerHTML = "";
  data.productos.forEach((element) => {
    productosComprados.innerHTML +=
      "<div> Producto: " +
      element.nombre +
      " - Cantidad: " +
      element.cantidad +
      " - Costo unitario: $" +
      element.precio;
    +"</div> ";
  });

  despedida.innerHTML = "Gracias por tu compra!!! :)";
}

btnCamisa.addEventListener("click", () => {
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
    displayCarrito();
    displayPago(resolve);
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
