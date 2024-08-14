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
        // Verificar si el usuario ya existe
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioExistente = usuarios.find(u => u.usuario === usuario);

        if (usuarioExistente) {
            alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
            return;
        }

        const nuevoUsuario = {
            id: generarId(),
            usuario,
            contrasena,
            telefono,
            direccion,
            dni
        };
        
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuario registrado exitosamente.');
        document.getElementById('formularioRegistro').reset();
        window.location.href = '../index.html';
    }
});
