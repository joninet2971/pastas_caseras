// Obtener referencias a elementos del DOM
var modalRegistro = document.getElementById("modalRegistro"); // Modal de registro
var btnRegistro = document.getElementById("abrirModal"); // Botón que abre el modal
var spanRegistro = document.getElementById("closeRegistro"); // Elemento "X" que cierra el modal

// Abrir el modal cuando se hace clic en el botón
btnRegistro.onclick = function () {
    console.log("Abrir modal");
    modalRegistro.style.display = "block"; // Mostrar el modal estableciendo su display a "block"
}

// Cerrar el modal cuando se hace clic en la "X"
spanRegistro.onclick = function () {
    console.log("Cerrar modal con X");
    modalRegistro.style.display = "none"; // Ocultar el modal estableciendo su display a "none"
}

// Cerrar el modal si se hace clic fuera del contenido del modal
window.onclick = function (event) {
    if (event.target == modalRegistro) {
        console.log("Cerrar modal por clic fuera");
        modalRegistro.style.display = "none"; // Ocultar el modal si se hace clic en cualquier parte fuera de él
    }
}

// Función para validar los datos del formulario de registro
const validarRegistro = (usuario, contrasena, telefono, direccion, dni) => {
    // Verificar si el nombre de usuario es válido (al menos 5 caracteres)
    if (!usuario || usuario.length < 5) {
        alert('El nombre de usuario debe tener al menos 5 caracteres.');
        return false; // Retornar false si la validación falla
    }

    // Verificar si la contraseña es válida (al menos 9 caracteres, con letras y números)
    const contrasenaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;
    if (!contrasenaRegex.test(contrasena)) {
        alert('La contraseña debe tener al menos 9 caracteres, incluyendo letras y números.');
        return false; // Retornar false si la validación falla
    }

    // Verificar que los campos de teléfono, dirección y DNI no estén vacíos
    if (!telefono || !direccion || !dni) {
        alert('Por favor, completa todos los campos.');
        return false; // Retornar false si la validación falla
    }

    // Si todas las validaciones son exitosas, retornar true
    return true;
}

// Función para generar un ID único para cada usuario
function generarId() {
    // Obtener el último ID almacenado en localStorage, o inicializar en '0' si no existe
    let id = localStorage.getItem('idUsuario') || '0';
    id = parseInt(id) + 1; // Incrementar el ID en 1
    localStorage.setItem('idUsuario', id.toString()); // Guardar el nuevo ID en localStorage
    return id; // Retornar el nuevo ID
}

// Manejar el envío del formulario de registro
document.getElementById('formularioRegistro').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío automático del formulario

    // Obtener los valores de los campos del formulario
    const usuario = document.getElementById('regUsuario').value;
    const contrasena = document.getElementById('regContrasena').value;
    const telefono = document.getElementById('regTelefono').value;
    const direccion = document.getElementById('regDireccion').value;
    const dni = document.getElementById('regDNI').value;

    // Validar los datos del formulario antes de proceder
    if (validarRegistro(usuario, contrasena, telefono, direccion, dni)) {
        // Verificar si el usuario ya existe en localStorage
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioExistente = usuarios.find(u => u.usuario === usuario);

        if (usuarioExistente) {
            alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
            return; // Detener el proceso si el nombre de usuario ya está en uso
        }

        // Crear un nuevo objeto de usuario con los datos ingresados
        const nuevoUsuario = {
            id: generarId(), // Generar un ID único para el usuario
            usuario,
            contrasena,
            telefono,
            direccion,
            dni
        };
        
        // Añadir el nuevo usuario a la lista de usuarios y guardarlo en localStorage
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Mostrar un mensaje de éxito, resetear el formulario y recargar la página
        alert('Usuario registrado exitosamente.');
        document.getElementById('formularioRegistro').reset(); // Resetear el formulario
        location.reload(); // Recargar la página para reflejar los cambios
    }
});
