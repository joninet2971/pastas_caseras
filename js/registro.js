document.getElementById('formularioRegistro').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('regUsuario').value;
    const contrasena = document.getElementById('regContrasena').value;
    const telefono = document.getElementById('regTelefono').value;
    const direccion = document.getElementById('regDireccion').value;
    const dni = document.getElementById('regDNI').value;

    // Aquí podrías agregar lógica para enviar los datos al servidor o almacenarlos
    console.log(`Registro: ${usuario}, ${telefono}, ${direccion}, ${dni}`);

    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
});
