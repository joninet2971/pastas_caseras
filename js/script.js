document.addEventListener('DOMContentLoaded', function() {
    mostrarProductos();
    if (sessionStorage.getItem('usuarioActual')) {
        mostrarCarrito();
    }
});

const productos = [
    { id: 1, nombre: 'Fideos', precio: 1300, imagen: 'img/productos/fideos.jpg', descripcion: '1/2 kg. - 3 Porciones.' },
    { id: 2, nombre: 'Ñoquis', precio: 1300, imagen: 'img/productos/noquis.jpg', descripcion: '1/2 kg. - 3 Porciones.' },
    { id: 3, nombre: 'Ravioles', precio: 1300, imagen: 'img/productos/ravioles.jpg', descripcion: '16 Uni. - 2 Porciones.' },
    { id: 4, nombre: 'Capellettis', precio: 1300, imagen: 'img/productos/capelleti.jpg', descripcion: '16 Uni. - 2 Porciones.' },
    { id: 5, nombre: 'Pansotis', precio: 1300, imagen: 'img/productos/pansotis.jpg', descripcion: '16 Uni. - 2 Porciones.' },
    { id: 6, nombre: 'Sorrentinos', precio: 1300, imagen: 'img/productos/sorrentinos.jpg', descripcion: '16 Uni. - 2 Porciones.' },
    { id: 7, nombre: 'Salsa Bolognesa', precio: 1300, imagen: 'img/productos/bolognesa.jpg', descripcion: '200 gr. - p/ 3 Porciones.' },
    { id: 8, nombre: 'Salsa Champiñones', precio: 1300, imagen: 'img/productos/campi.jpg', descripcion: '200 gr. - p/ 3 Porciones.' },
    { id: 9, nombre: 'Salsa Pesto', precio: 1300, imagen: 'img/productos/pesto.jpg', descripcion: '200 gr. - p/ 3 Porciones.' },
    { id: 10, nombre: 'Salsa Pomodoro', precio: 1300, imagen: 'img/productos/pomodoro.jpg', descripcion: '200 gr. - p/ 3 Porciones.' }
];

function mostrarProductos() {
    const productosContenedor = document.getElementById('productos');
    productosContenedor.innerHTML = productos.map(producto => `
        <div class="column">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3><b>${producto.nombre}</b></h3>
            <p>${producto.descripcion}</p>
            <h2><b>$ ${producto.precio.toFixed(2)}</b></h2>
            <div class="contenedor-botones">
                <button class="boton" onclick="agregarAlCarrito(${producto.id})">
                    <span class="icono">Agregar al carrito</span>
                </button>
                <div class="formulario-cantidad">
                    <input type="number" min="1" value="1" class="input-cantidad">
                </div>
            </div>
        </div>
    `).join('');
}

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    const carritoTotal = document.getElementById('carritoTotal');
    carritoTotal.textContent = `${carrito.length} - $${total.toFixed(2)}`;
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContenedor = document.getElementById('carritoContenedor');
    carritoContenedor.innerHTML = carrito.map(producto => `
        <div class="carrito-item">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-imagen">
            <div class="carrito-info">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

document.getElementById('menu-toggle').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
});
function estaLogueado() {
    const usuarioLogueado = document.getElementById('usuarioLogueado');
    return usuarioLogueado && usuarioLogueado.dataset.logueado === 'true';
}

// Función para mostrar el modal de confirmación
// Función para mostrar el modal de confirmación
function confirmarCompra() {
    if (!estaLogueado()) {
        Swal.fire({
            title: 'Inicio de sesión requerido',
            text: 'Debes iniciar sesión para finalizar la compra.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    Swal.fire({
        title: '¿Quieres finalizar la compra?',
        text: "Una vez confirmada, no podrás modificar tu carrito.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, finalizar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Compra Finalizada',
                'Gracias por tu compra.',
                'success'
            );

            reiniciarCarrito();
        } else {
            Swal.fire(
                'Cancelado',
                'Tu compra no ha sido realizada.',
                'error'
            );
        }
    });
}

// Función para verificar si el usuario está logueado
function estaLogueado() {
    return sessionStorage.getItem('usuarioActual') !== null;
}

// Función para reiniciar el carrito
function reiniciarCarrito() {
    // Limpia el carrito en localStorage
    localStorage.removeItem('carrito');

    // Reinicia el contador visual
    document.getElementById('carritoTotal').innerText = '0 - $0.00';

    // Limpia la visualización del carrito si existe
    const carritoContenedor = document.getElementById('carritoContenedor');
    if (carritoContenedor) {
        carritoContenedor.innerHTML = '';
    }

    // Actualiza la visualización del carrito
    actualizarCarrito();
}

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    const carritoTotal = document.getElementById('carritoTotal');
    carritoTotal.textContent = `${carrito.length} - $${total.toFixed(2)}`;
}

// Asume que el botón de carrito tiene el id 'carritoIcono'
document.getElementById('carritoTotal').addEventListener('click', confirmarCompra);

// Asegúrate de que esta función sea llamada al cargar la página para mostrar los datos del carrito
window.addEventListener('load', actualizarCarrito);
