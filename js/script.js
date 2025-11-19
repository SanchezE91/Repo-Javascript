// SDY HERRAMIENTAS - SIMULADOR INTERACTIVO

const productos = [
  { nombre: "Taladro", precio: 55000 },
  { nombre: "Amoladora", precio: 43000 },
  { nombre: "Juego de Llaves", precio: 25000 },
  { nombre: "Atornillador", precio: 30000 },
];

function buscarProductoPorNumero(numero) {
  if (numero >= 1 && numero <= productos.length) {
    return productos[numero - 1];
  }
  return null;
}

alert("Bienvenido a SDY Herramientas");

let nombreUsuario = prompt("Ingrese su nombre:");
console.log("Nombre ingresado:", nombreUsuario);

let lista = "PRODUCTOS DISPONIBLES:\n";

for (let i = 0; i < productos.length; i++) {
  lista = lista + (i + 1) + " - " + productos[i].nombre + " ($" + productos[i].precio + ")\n";
}

lista = lista + "\nIngrese el número del producto que desea cotizar:";

let seleccion = Number(prompt(lista));
console.log("Número de producto elegido:", seleccion);

let encontrado = buscarProductoPorNumero(seleccion);

if (encontrado) {
  alert("Elegiste: " + encontrado.nombre + "\nPrecio: $" + encontrado.precio);

  let cantidad = Number(prompt("¿Cuántas unidades desea comprar?"));
  console.log("Cantidad:", cantidad);

  let total = encontrado.precio * cantidad;
  console.log("Total:", total);

  let cuotas = confirm("¿Desea pagar en 3 cuotas?");
  console.log("Cuotas:", cuotas);

  if (cuotas) {
    let totalCuotas = total / 3;
    alert("Total: $" + total + "\nEn 3 cuotas de: $" + totalCuotas);
  } else {
    alert("Total final a pagar: $" + total);
  }
} else {
  alert("No tenemos ese producto.");
  console.log("Selección inválida");
}

alert("Gracias por visitar SDY Herramientas");
