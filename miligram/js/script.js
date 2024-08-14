document.querySelector('.menu-toggle').addEventListener('click', function() {
    const menu = document.querySelector('.menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  });

document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    let currentIndex = 0;
    let autoSlideInterval;

    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function goToNextSlide() {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }

    function goToPrevSlide() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(goToNextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    prevButton.addEventListener('click', function() {
        stopAutoSlide();
        goToPrevSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', function() {
        stopAutoSlide();
        goToNextSlide();
        startAutoSlide();
    });

    carouselInner.addEventListener('mouseenter', stopAutoSlide);
    carouselInner.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
});


//termina carousel aca.





document.addEventListener('DOMContentLoaded', function () {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    const loginLink = document.getElementById('login-link');
    const loginIcon = document.getElementById('login-icon');
    const loggedInUser = document.getElementById('logged-in-user');

    if (usuarioActual) {
       
        loginLink.textContent = 'Cerrar Sesión';
        loginLink.href = '#'; 

       
        loggedInUser.textContent = `  - Bienvenido - ${usuarioActual.usuario}`;
        loggedInUser.style.display = 'inline';

        // Configura el evento de cierre de sesión
        loginLink.addEventListener('click', function () {
            sessionStorage.removeItem('usuarioActual');
            alert('Has cerrado sesión.');
            window.location.href = 'index.html'; 
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.boton').forEach(button => {
        button.addEventListener('click', function () {
            const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));

            if (!usuarioActual) {
                alert('Debes iniciar sesión para agregar productos al carrito.');
                return;
            }

        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));

    const botonesAgregar = document.querySelectorAll('.boton');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function () {
           
            const productoCard = this.closest('.column');
            const nombreProducto = productoCard.querySelector('h3').textContent;
            const precioProducto = productoCard.querySelector('h2 b').textContent.replace('$', '').trim();
            const cantidadProducto = productoCard.querySelector('.input-cantidad').value;

            const producto = {
                nombre: nombreProducto,
                precio: parseFloat(precioProducto),
                cantidad: parseInt(cantidadProducto)
            };

            
            const claveCarrito = `carrito_${usuarioActual.usuario}`;
            let carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

            const productoExistente = carrito.find(item => item.nombre === producto.nombre);

            if (productoExistente) {
                productoExistente.cantidad += producto.cantidad;
            } else {
                carrito.push(producto);
            }

            localStorage.setItem(claveCarrito, JSON.stringify(carrito));

            alert(`${producto.cantidad} ${producto.nombre}(s) agregado(s) al carrito.`);
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    const carritoContainer = document.getElementById('carrito-container');
    const carritoDesplegable = document.getElementById('carrito-desplegable');
    const carritoLista = document.getElementById('carrito-lista');
    const totalCarrito = document.getElementById('total-carrito');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');

    carritoContainer.addEventListener('click', function () {
        if (carritoDesplegable.style.display === 'none' || carritoDesplegable.style.display === '') {
            carritoDesplegable.style.display = 'block';
            actualizarCarrito();
        } else {
            carritoDesplegable.style.display = 'none';
        }
    });

    function actualizarCarrito() {
        carritoLista.innerHTML = '';
        if (usuarioActual) {
            const claveCarrito = `carrito_${usuarioActual.usuario}`;
            const carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];
            let total = 0;

            if (carrito.length > 0) {
                carrito.forEach((producto, index) => {
                    const item = document.createElement('li');
                    item.innerHTML = `
                        ${producto.cantidad}x ${producto.nombre} - $${producto.precio * producto.cantidad}
                        <button class="boton-eliminar" data-index="${index}">Eliminar</button>
                    `;
                    carritoLista.appendChild(item);
                    total += producto.precio * producto.cantidad;
                });
                totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
            } else {
                carritoLista.innerHTML = '<li>El carrito está vacío.</li>';
                totalCarrito.textContent = 'Total: $0,00';
            }
        } else {
            carritoLista.innerHTML = '<li>No hay ningún usuario activo.</li>';
            totalCarrito.textContent = 'Total: $0,00';
        }

        
        document.querySelectorAll('.boton-eliminar').forEach(button => {
            button.addEventListener('click', function () {
                eliminarProducto(this.dataset.index);
            });
        });
    }

    function eliminarProducto(index) {
        const claveCarrito = `carrito_${usuarioActual.usuario}`;
        let carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];
        carrito.splice(index, 1); // Eliminar el producto del array
        localStorage.setItem(claveCarrito, JSON.stringify(carrito)); // Guardar el carrito actualizado
        actualizarCarrito(); // Actualizar la ventana desplegable
    }

    finalizarCompraBtn.addEventListener('click', function () {
        alert('Compra finalizada. Gracias por su compra.');
        const claveCarrito = `carrito_${usuarioActual.usuario}`;
        localStorage.removeItem(claveCarrito); // Vaciar el carrito
        actualizarCarrito(); // Actualizar la ventana desplegable
    });
});
