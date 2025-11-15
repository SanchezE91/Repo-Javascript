alert("JS cargado!");


// --- VALIDACIONES SUPER BÁSICAS ---

// Validar que el nombre solo tenga letras
function soloLetras(texto) {
    // Recorro letra por letra
    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];

        // Si el caracter NO está entre a-z o A-Z y tampoco es un espacio → ERROR
        if (
            !(caracter >= "a" && caracter <= "z") &&
            !(caracter >= "A" && caracter <= "Z") &&
            caracter !== " "
        ) {
            return false; // Hay algo raro
        }
    }

    return true; // Todo bien
}

// Validar edad
function validarEdad(edadIngresada) {
    let edad = parseInt(edadIngresada);

    if (isNaN(edad)) {
        return "La edad debe ser un número.";
    }

    if (edad < 18) {
        return "Debes tener 18 años o más.";
    }

    return ""; // Todo OK
}


// --- FORMULARIO ---

let form = document.getElementById("registrar-formulario");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombreApellido").value.trim();
    let edad = document.getElementById("edad").value.trim();

    // Validar nombre
    if (!soloLetras(nombre)) {
        alert("El nombre solo puede contener letras.");
        return;
    }

    // Validar edad
    let errorEdad = validarEdad(edad);
    if (errorEdad !== "") {
        alert(errorEdad);
        return;
    }

    // SI TODO ESTÁ BIEN
    alert("Registro completado. ¡Bienvenido!");
    window.location.href = "../pages/pagina-ventas.html";
});
