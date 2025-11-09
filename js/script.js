// VARIABLES: ES UN ESPACIO DE MEMORIA RESERVADO PARA ALMACENAR INFORMACION IMPORTANTE DEL PROGRAMA //

// DECLARACION:
//let cliente;

// ASIGNACION DE VALORES:
//cliente = "Cynthia" 

//console.log (cliente); //VERIFICA EN LA CONSOLA //

// INICIALIZAR VARIABLES:
//let edad = 35

//console.log (edad);

// CONSTANTE: ES UN VARIABLE CUYO VALOR NO PUEDE MODIFICARSE UNA VEZ QUE HA SIDO ASIGNADO //

//const nacimiento = 1990

//console.log (nacimiento)

document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("botonWhatsapp");

    boton.addEventListener("click", function (event) {
        event.preventDefault(); // Evita que el link se abra sin confirmación

        const confirmacion = confirm("¿Deseás salir y abrir WhatsApp?");

        if (confirmacion) {
            window.open("https://wa.me/5491176444703", "_blank");
        } else {
            alert("Perfecto, Segui comprando en SDY Herramientas.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
  const botonesCarrito = document.querySelectorAll(".btn-carrito");

  botonesCarrito.forEach(boton => {
    boton.addEventListener("click", function() {
      alert("✅ Producto agregado al carrito");
      window.location.href = "carrito.html";
    });
  });
});

