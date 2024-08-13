const validarRegistro = (usuario, contrasena, telefono, direccion, dni) => {
    if (!usuario || usuario.length < 5) {
        alert('El nombre de usuario debe tener al menos 5 caracteres.');
        return false;
    }

    const contrasenaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;
    if (!contrasenaRegex.test(contrasena)) {
        alert('La contraseña debe tener al menos 9 caracteres, incluyendo letras y números.');
        return false;
    }

    if (!telefono || !direccion || !dni) {
        alert('Por favor, completa todos los campos.');
        return false;
    }

    return true;
}

function generarId() {
    let id = localStorage.getItem('idUsuario') || '0';
    id = parseInt(id) + 1;
    localStorage.setItem('idUsuario', id.toString());
    return id;
}
document.getElementById('formularioRegistro').addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = document.getElementById('regUsuario').value;
    const contrasena = document.getElementById('regContrasena').value;
    const telefono = document.getElementById('regTelefono').value;
    const direccion = document.getElementById('regDireccion').value;
    const dni = document.getElementById('regDNI').value;

    if (validarRegistro(usuario, contrasena, telefono, direccion, dni)) {
        const nuevoUsuario = {
            id: generarId(),
            usuario,
            contrasena,
            telefono,
            direccion,
            dni
        };
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuario registrado exitosamente.');
        document.getElementById('formularioRegistro').reset();
        window.location.href = 'login.html';
    }
});

document.getElementById('formularioInicioSesion').addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = document.getElementById('loginUsuario').value;
    const contrasena = document.getElementById('loginContrasena').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

    if (usuarioEncontrado) {
        sessionStorage.setItem('usuarioActual', JSON.stringify({ usuario }));
        alert('Inicio de sesión exitoso.');
        document.getElementById('formularioInicioSesion').reset();




        mostrarProductos();
        mostrarCarrito();
    } else {
        alert('Nombre de usuario o contraseña incorrectos.');
    }
});



// Productos
const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 },
    { id: 4, nombre: 'Producto 4', precio: 40 },
];

function mostrarProductos() {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

function agregarAlCarrito(idProducto) {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    if (!usuarioActual) {
        alert('Necesitas estar logueado para agregar productos al carrito.');
        return;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productos.find(p => p.id === idProducto);
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoDiv.innerHTML = carrito.map(p => `<p>${p.nombre} - $${p.precio}</p>`).join('');
}

function realizarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert('El carrito esta vacío.');
        return;
    }
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    alert(`Compra realizada por un total de $${total}.`);
    localStorage.removeItem('carrito');
    mostrarCarrito();
}

mostrarProductos();
if (sessionStorage.getItem('usuarioActual')) {
    mostrarCarrito();
}

