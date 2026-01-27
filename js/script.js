// ================= CARRITO + STORAGE =================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ================= FETCH + ASYNC / AWAIT =================
async function cargarProductos() {
  try {
    const response = await fetch("../json/prods.json");
    const productos = await response.json();

    renderizarProductos(productos);
    activarBotones(productos);

  } catch (error) {
    console.error("Error al cargar productos", error);
  }
}

// ================= RENDER PRODUCTOS (VENTAS) =================
function renderizarProductos(productos) {
  const tarjetas = document.querySelectorAll(".tarjeta");
  if (tarjetas.length === 0) return;

  tarjetas.forEach((tarjeta) => {
    const boton = tarjeta.querySelector(".btn-carrito");
    const id = Number(boton.dataset.id);

    const prod = productos.find(p => p.id === id);
    if (!prod) return;

    tarjeta.querySelector(".descripcion").textContent = prod.nombre;
    tarjeta.querySelector(".precio-final").textContent = `$ ${prod.precio}`;
  });
}

// ================= EVENTOS + CARRITO =================
function activarBotones(productos) {
  const botones = document.querySelectorAll(".btn-carrito");
  if (botones.length === 0) return;

  botones.forEach((boton) => {
    boton.addEventListener("click", async () => {

      const id = Number(boton.dataset.id);
      const producto = productos.find(p => p.id === id);

      if (!producto) return;

      const { value: cantidad } = await Swal.fire({
        title: "¿Cuántas unidades?",
        input: "number",
        inputValue: 1,
        showCancelButton: true,
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
          if (!value || value <= 0) {
            return "Ingresá una cantidad válida";
          }
        }
      });

      if (!cantidad) return;

      const productoEnCarrito = carrito.find(p => p.id === producto.id);

      if (productoEnCarrito) {
        productoEnCarrito.cantidad += Number(cantidad);
      } else {
        carrito.push({ ...producto, cantidad: Number(cantidad) });
      }

      guardarCarrito();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Producto agregado 🛒",
        showConfirmButton: false,
        timer: 2000
      });
    });
  });
}

// ================= MOSTRAR CARRITO =================
function mostrarCarrito() {
  const carritoLista = document.getElementById("carritoLista");
  const totalCarrito = document.getElementById("totalCarrito");

  if (!carritoLista || !totalCarrito) return;

  carritoLista.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    carritoLista.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío</p>`;
    totalCarrito.textContent = "$0";
    return;
  }

  carrito.forEach((prod, index) => {
    const div = document.createElement("div");
    div.className = "carrito-item";

    div.innerHTML = `
      <div class="carrito-item-info">
        <span class="carrito-item-nombre">${prod.nombre}</span>
        <span class="carrito-item-cantidad">Cantidad: ${prod.cantidad}</span>
      </div>

      <span class="carrito-item-precio">
        $${prod.precio * prod.cantidad}
      </span>

      <button class="btn-eliminar">Eliminar</button>
    `;

    div.querySelector(".btn-eliminar").addEventListener("click", () => {
      Swal.fire({
        title: "¿Eliminar producto?",
        text: prod.nombre,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          carrito.splice(index, 1);
          guardarCarrito();
          mostrarCarrito();

          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Producto eliminado",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    });

    carritoLista.appendChild(div);
    total += prod.precio * prod.cantidad;
  });

  totalCarrito.textContent = `$${total}`;
}

// ================= FINALIZAR COMPRA =================
const btnFinalizar = document.getElementById("finalizarCompra");

if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Carrito vacío",
        text: "Agregá productos antes de finalizar la compra"
      });
      return;
    }

    Swal.fire({
      title: "¿Finalizar compra?",
      text: "Serás redirigido a WhatsApp",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡Listo!", "Redirigiendo a WhatsApp 📲", "success");
      }
    });
  });
}

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  mostrarCarrito();
});

// ================= REGISTRO EN INDEX =================
const formularioRegistro = document.getElementById("registrar-formulario");

if (formularioRegistro) {
  formularioRegistro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreApellido = document.getElementById("nombreApellido").value.trim();
    const edad = Number(document.getElementById("edad").value);

    if (nombreApellido === "") {
      Swal.fire({
        icon: "error",
        title: "Campo obligatorio",
        text: "Por favor ingresá tu nombre y apellido",
      });
      return;
    }

    if (isNaN(edad) || edad <= 0) {
      Swal.fire({
        icon: "error",
        title: "Edad inválida",
        text: "Ingresá una edad válida",
      });
      return;
    }

    Swal.fire({
      title: "¿Confirmás el registro?",
      html: `<b>Nombre:</b> ${nombreApellido}<br><b>Edad:</b> ${edad}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, registrarme",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const usuario = { nombre: nombreApellido, edad };
        localStorage.setItem("usuario", JSON.stringify(usuario));

        Swal.fire({
          icon: "success",
          title: `Bienvenido/a ${nombreApellido} 👋`,
          text: "Registro exitoso",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "./pages/pagina-ventas.html";
        });
      }
    });
  });
}
