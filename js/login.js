document.getElementById('formularioInicioSesion').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('loginUsuario').value;
    const contrasena = document.getElementById('loginContrasena').value;

    // Aquí podrías agregar lógica para verificar las credenciales con el servidor
    // Por ejemplo, con un fetch o AJAX

    // Para demostración, simplemente almacenamos el usuario en sessionStorage
    sessionStorage.setItem('usuarioActual', usuario);

    alert('Inicio de sesión exitoso.');
    window.location.href = 'productos-copy.html'; // Redirigir a la página principal
});
