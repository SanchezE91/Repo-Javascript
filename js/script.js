//CARRITO STORAGE 
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Guardar carrito
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//PAGINA VENTAS 
const tarjetas = document.querySelectorAll(".tarjeta");
const botones = document.querySelectorAll(".btn-carrito");

if (botones.length > 0) {
  const productos = [];

  tarjetas.forEach((tarjeta, index) => {
    const nombre = tarjeta.querySelector(".descripcion")?.textContent || "";
    const precioTexto =
      tarjeta.querySelector(".precio-final")?.textContent || "$0";
    const precio = Number(precioTexto.replace("$", "").replace(/\./g, ""));

    productos.push({
      id: `${window.location.pathname}-${index}`,
      nombre,
      precio,
    });
  });

  botones.forEach((boton, index) => {
    boton.addEventListener("click", () => {
      const cantidad = Number(prompt("¿Cuántas unidades querés?"));

      if (isNaN(cantidad) || cantidad <= 0) {
        alert("Cantidad inválida");
        return;
      }

      const producto = productos[index];
      const productoEnCarrito = carrito.find((p) => p.id === producto.id);

      if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
      } else {
        carrito.push({
          ...producto,
          cantidad,
        });
      }

      guardarCarrito();
      alert("Producto agregado al carrito");
    });
  });
}

//PAGINA CARRITO 
const carritoLista = document.getElementById("carritoLista");
const totalCarrito = document.getElementById("totalCarrito");

if (carritoLista && totalCarrito) {
  function mostrarCarrito() {
    carritoLista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
      carritoLista.innerHTML = `
        <p class="carrito-vacio">Tu carrito está vacío</p>
      `;
      totalCarrito.textContent = "$0";
      return;
    }

    carrito.forEach((prod, index) => {
      const div = document.createElement("div");
      div.className = "carrito-item";

      div.innerHTML = `
        <div class="carrito-item-info">
          <span class="carrito-item-nombre">${prod.nombre}</span>
          <span class="carrito-item-cantidad">
            Cantidad: ${prod.cantidad}
          </span>
        </div>

        <span class="carrito-item-precio">
          $${prod.precio * prod.cantidad}
        </span>

        <button class="btn-eliminar">Eliminar</button>
      `;

      div.querySelector(".btn-eliminar").addEventListener("click", () => {
        carrito.splice(index, 1);
        guardarCarrito();
        mostrarCarrito();
      });

      carritoLista.appendChild(div);
      total += prod.precio * prod.cantidad;
    });

    totalCarrito.textContent = `$${total}`;
  }

  mostrarCarrito();
}

//REGISTRO EN INDEX 
const formularioRegistro = document.getElementById("registrar-formulario");

if (formularioRegistro) {
  formularioRegistro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreApellido = document
      .getElementById("nombreApellido")
      .value
      .trim();

    const edad = Number(document.getElementById("edad").value);

    if (nombreApellido === "") {
      alert("Por favor ingresá tu nombre");
      return;
    }

    if (isNaN(edad) || edad <= 0) {
      alert("Ingresá una edad válida");
      return;
    }

    const usuario = {
      nombre: nombreApellido,
      edad: edad
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert(`Bienvenido/a ${nombreApellido} 👋`);

    window.location.href = "./pages/pagina-ventas.html";
  });
}

