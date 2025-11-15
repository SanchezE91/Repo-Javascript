//Así el JS espera a que cargue el HTML antes de leer los elementos.//
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("registrar-formulario");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita que recargue la página

        const nombreApellido = document.getElementById("nombreApellido").value.trim();
        const edad = parseInt(document.getElementById("edad").value);

        // Validaciones
        if (nombreApellido === "") {
            alert("Por favor ingresa tu nombre y apellido.");
            return;
        }

        if (isNaN(edad)) {
            alert("Por favor ingresa una edad válida.");
            return;
        }

        if (edad < 18) {
            alert("Debes ser mayor de 18 para ingresar a la página de ventas.");
            return;
        }

        // Todo OK → Bienvenida + redirección
        alert("Bienvenido " + nombreApellido);

        // Redirigir
        window.location.href = "./pages/pagina-ventas.html";
    });
});
