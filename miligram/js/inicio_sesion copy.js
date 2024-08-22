// Obtener referencias a los elementos del DOM
var modal = document.getElementById("modalInicioSesion"); // Modal de inicio de sesión
var btn = document.getElementById("abrirModalLogin"); // Botón que abre el modal
var span = document.getElementById("closeSesion"); // Elemento "X" que cierra el modal

// Abrir el modal cuando se hace clic en el botón
btn.onclick = function () {
    modal.style.display = "block"; // Mostrar el modal estableciendo su display a "block"
}

// Cerrar el modal cuando se hace clic en la "X"
span.onclick = function () {
    modal.style.display = "none"; // Ocultar el modal estableciendo su display a "none"
}

// Cerrar el modal si se hace clic fuera del contenido del modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"; // Ocultar el modal si se hace clic fuera de él
    }
}

// Manejar el envío del formulario de inicio de sesión
document.getElementById('formularioInicioSesion').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío automático del formulario

    // Obtener los valores de los campos de inicio de sesión
    const usuario = document.getElementById('loginUsuario').value;
    const contrasena = document.getElementById('loginContrasena').value;

    // Obtener la lista de usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    // Buscar un usuario que coincida con el nombre de usuario y la contraseña
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

    if (usuarioEncontrado) {
        // Guardar el usuario actual en sessionStorage si el inicio de sesión es exitoso
        sessionStorage.setItem('usuarioActual', JSON.stringify({ usuario }));
        alert('Inicio de sesión exitoso.');
        document.getElementById('formularioInicioSesion').reset(); // Resetear el formulario
        location.reload(); // Recargar la página para reflejar los cambios

    } else {
        alert('Nombre de usuario o contraseña incorrectos.');
    }
});

// Manejar el comportamiento del enlace de inicio de sesión o cierre de sesión al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    const loginLink = document.getElementById('abrirModalLogin');
    const loggedInUser = document.getElementById('logged-in-user');

    if (usuarioActual) {
        // Si hay un usuario activo, cambiar el enlace a "Cerrar Sesión"
        loginLink.textContent = 'Cerrar Sesión';
        loginLink.href = '#'; // Evitar que el enlace recargue la página

        // Mostrar un mensaje de bienvenida con el nombre del usuario
        loggedInUser.textContent = `  - Bienvenido - ${usuarioActual.usuario}`;
        loggedInUser.style.display = 'inline';

        // Configurar el evento de cierre de sesión
        loginLink.addEventListener('click', function () {
            sessionStorage.removeItem('usuarioActual'); // Eliminar el usuario actual del sessionStorage
            alert('Has cerrado sesión.');
            window.location.href = 'index.html'; // Recargar la página para reflejar los cambios
        });
    }
});

// Manejar el evento de clic en los botones que requieren inicio de sesión
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.boton').forEach(button => {
        button.addEventListener('click', function () {
            const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));

            // Verificar si hay un usuario activo antes de permitir la acción
            if (!usuarioActual) {
                alert('Debes iniciar sesión para agregar productos al carrito.');
                return; // Detener la ejecución si no hay un usuario activo
            }

            // Aquí se puede añadir la funcionalidad para manejar la acción del botón
        });
    });
});

// Manejar la adición de productos al carrito de compras
document.addEventListener('DOMContentLoaded', function () {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));

    // Obtener todos los botones de agregar al carrito
    const botonesAgregar = document.querySelectorAll('.boton');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function () {
            // Obtener la tarjeta del producto y extraer la información del producto
            const productoCard = this.closest('.column');
            const nombreProducto = productoCard.querySelector('h3').textContent;
            const precioProducto = productoCard.querySelector('h2 b').textContent.replace('$', '').trim();
            const cantidadProducto = productoCard.querySelector('.input-cantidad').value;

            // Crear un objeto con los detalles del producto
            const producto = {
                nombre: nombreProducto,
                precio: parseFloat(precioProducto),
                cantidad: parseInt(cantidadProducto)
            };

            // Construir la clave del carrito basada en el usuario actual
            const claveCarrito = `carrito_${usuarioActual.usuario}`;
            let carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

            // Verificar si el producto ya está en el carrito
            const productoExistente = carrito.find(item => item.nombre === producto.nombre);

            if (productoExistente) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                productoExistente.cantidad += producto.cantidad;
            } else {
                // Si no, agregar el producto al carrito
                carrito.push(producto);
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem(claveCarrito, JSON.stringify(carrito));

            // Mostrar una alerta confirmando la adición al carrito
            alert(`${producto.cantidad} ${producto.nombre}(s) agregado(s) al carrito.`);
        });
    });
});

// Manejar la visualización y actualización del carrito de compras
document.addEventListener('DOMContentLoaded', function () {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    const carritoContainer = document.getElementById('carrito-container');
    const carritoDesplegable = document.getElementById('carrito-desplegable');
    const carritoLista = document.getElementById('carrito-lista');
    const totalCarrito = document.getElementById('total-carrito');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');

    // Mostrar u ocultar el carrito desplegable cuando se hace clic en el ícono del carrito
    carritoContainer.addEventListener('click', function () {
        if (carritoDesplegable.style.display === 'none' || carritoDesplegable.style.display === '') {
            carritoDesplegable.style.display = 'block';
            actualizarCarrito(); // Actualizar la lista del carrito al desplegar
        } else {
            carritoDesplegable.style.display = 'none';
        }
    });

    // Función para actualizar la lista de productos en el carrito
    function actualizarCarrito() {
        carritoLista.innerHTML = ''; // Limpiar la lista del carrito
        if (usuarioActual) {
            const claveCarrito = `carrito_${usuarioActual.usuario}`;
            const carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];
            let total = 0;

            // Si hay productos en el carrito, mostrarlos en la lista
            if (carrito.length > 0) {
                carrito.forEach((producto, index) => {
                    const item = document.createElement('li');
                    item.innerHTML = `
                        ${producto.cantidad}x ${producto.nombre} - $${producto.precio * producto.cantidad}
                        <button class="boton-eliminar" data-index="${index}">Eliminar</button>
                    `;
                    carritoLista.appendChild(item);
                    total += producto.precio * producto.cantidad; // Calcular el total
                });
                totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
            } else {
                // Si el carrito está vacío, mostrar un mensaje
                carritoLista.innerHTML = '<li>El carrito está vacío.</li>';
                totalCarrito.textContent = 'Total: $0,00';
            }
        } else {
            // Si no hay usuario activo, mostrar un mensaje
            carritoLista.innerHTML = '<li>No hay ningún usuario activo.</li>';
            totalCarrito.textContent = 'Total: $0,00';
        }

        // Agregar eventos de eliminación a los botones de eliminar en la lista
        document.querySelectorAll('.boton-eliminar').forEach(button => {
            button.addEventListener('click', function () {
                eliminarProducto(this.dataset.index);
            });
        });
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(index) {
        const claveCarrito = `carrito_${usuarioActual.usuario}`;
        let carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];
        carrito.splice(index, 1); // Eliminar el producto del array
        localStorage.setItem(claveCarrito, JSON.stringify(carrito)); // Guardar el carrito actualizado
        actualizarCarrito(); // Actualizar la ventana desplegable
    }

    // Manejar la finalización de la compra
    finalizarCompraBtn.addEventListener('click', function () {
        alert('Compra finalizada. Gracias por su compra.');
        const claveCarrito = `carrito_${usuarioActual.usuario}`;
        localStorage.removeItem(claveCarrito); // Vaciar el carrito
        actualizarCarrito(); // Actualizar la ventana desplegable
    });
});
