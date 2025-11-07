## Propósito

Este repositorio es un sitio web estático multi-página (HTML/CSS/JS) sencillo. Estas instrucciones están hechas para que un agente AI sea productivo rápidamente al editar, mantener o extender el proyecto.

## Visión general (big picture)

- Estructura principal: archivos HTML en la raíz y en `pages/`, estilos en `css/`, scripts en `js/`, activos en `assets/`.
- No hay compilador ni empaquetador (no hay `package.json`, ni `webpack`, ni `vite`). El sitio se sirve abiertamente como contenido estático y usa Bootstrap vía CDN.
- Flujo de datos: no hay backend: formularios usan `action=""` y no hay endpoints. Cualquier comportamiento dinámico ocurre en `js/script.js` (vanilla JS).

## Convenciones del proyecto (específicas)

- Rutas relativas: las páginas en `pages/` usan `../css/style.css` para llegar al CSS global. Cuando agregues una nueva página, cuida la ruta relativa (por ejemplo, desde `pages/nueva.html` la hoja global está en `../css/style.css`).
- CSS: hay al menos dos hojas distintas usadas: `css/styleindex.css` (index) y `css/style.css` (páginas internas). Mantén estilos específicos de la página en la hoja que esa página referencia.
- Imágenes/activos: colócalos en `assets/` y referencia con rutas relativas desde la página que los usa (`./assets/imagen.jpg` o `../assets/imagen.jpg` según la ubicación).
- JavaScript: `js/script.js` contiene código vanilla y material de ejemplo; si añades funciones compartidas, agrégalas aquí y evita introducir bundlers.

## Reglas prácticas para el agente

1. No inventar servidores ni dependencias: este repo no contiene build tools; evita crear `package.json` a menos que el cambio lo requiera explícitamente.
2. Preservar referencias externas: mantener las etiquetas CDN de Bootstrap y sus atributos `integrity` y `crossorigin` a menos que se verifique la actualización de versión y se pruebe en navegador.
3. Rutas y enlaces: cuando modifiques o añadas enlaces en el menú (`index.html` dropdown), actualiza las rutas relativas correctamente (ejemplo: `./pages/quienes-somos.html` desde raíz; desde una página en `pages/` el enlace hacia `index.html` debe ser `../index.html`).
4. Formularios: actualmente no hay backend; si transformas un formulario para enviar datos, documenta el endpoint esperado y agrega validación del lado cliente en `js/script.js`.

## Ejemplos concretos (copiar/pegar)

- Añadir una nueva página `pages/nosotros.html` y enlazarla desde el menú en `index.html`:

  - En `pages/nosotros.html` usar: `<link rel="stylesheet" href="../css/style.css">` en el head.
  - En `index.html` agregar en el dropdown: `<li><a class="dropdown-item" href="./pages/nosotros.html">Nosotros</a></li>`

- Añadir una imagen `logo.png` que se use en `index.html`:

  - Colocar `logo.png` en `assets/` y referenciar desde `index.html` como `./assets/logo.png`.

## Flujos de trabajo (cómo probar cambios)

- Desarrollo rápido: abrir `index.html` en el navegador para cambios estáticos. Para simular un servidor HTTP (recomendado para rutas relativas y CORS), ejecutar un servidor HTTP simple desde la raíz del repo (p. ej. `python -m http.server 8000`) y abrir `http://localhost:8000`.
- Debugging: usar la consola del navegador (F12). Buscar errores de rutas (404) y errores de JS en `js/script.js`.

## Qué evitar / señales de alerta

- No rompas las rutas relativas al mover archivos sin actualizar los enlaces. Las referencias incorrectas a `../` son la fuente más común de errores.
- Evitar modificar la versión CDN de Bootstrap sin probar visualmente el sitio (puede cambiar estilos). Si actualizas, prueba menú/dropdown y componentes responsive.

## Archivos clave (referencias rápidas)

- `index.html` — menú principal y `styleindex.css`.
- `pages/contactanos.html`, `pages/quienes-somos.html`, `pages/ubicacion.html` — ejemplos de páginas internas que usan `css/style.css`.
- `css/style.css` y `css/styleindex.css` — hojas de estilos; agregar reglas específicas en la hoja usada por la página.
- `js/script.js` — punto único para JS; actualmente con ejemplos comentados.

Si algo en estas instrucciones queda poco claro o necesitas que añada reglas más detalladas (por ejemplo, un estilo de commit, testing o despliegue a GitHub Pages), dime qué quieres y actualizo este archivo.
