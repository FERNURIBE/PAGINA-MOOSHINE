document.addEventListener('DOMContentLoaded', function() {
    const shopLink = document.getElementById('shopLink');
    const dropdownMenu = document.getElementById('dropdownMenu');

    dropdownMenu.style.display = 'none';

    shopLink.addEventListener('click', function(event) {
        event.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    document.addEventListener('click', function(event) {
        if (!shopLink.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    // Función para actualizar el carrito
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price; // Acumula el precio total
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <span class="remove-item" onclick="removeFromCart(${index})">Eliminar</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        totalPriceElement.innerText = `Total: $${total.toFixed(2)}`; // Formatea el total
        localStorage.setItem('cart', JSON.stringify(cart)); // Guarda en localStorage
    }

    // Función para añadir productos al carrito
    window.addToCart = function (product, productId) {
        cart.push({ ...product, id: productId }); // Agrega el data-id
        updateCart();
    };

    // Función para eliminar productos del carrito
    window.removeFromCart = function (index) {
        cart.splice(index, 1); // Elimina el item en la posición index
        updateCart();
    };

    // Mostrar y ocultar el carrito
    document.querySelector('.icon-cart').addEventListener('click', () => {
        cartModal.classList.toggle('active');
    });

    // Cerrar el carrito al hacer clic fuera
    window.addEventListener('click', (event) => {
        const isClickOnCartIcon = document.querySelector('.icon-cart').contains(event.target);
        const isClickInsideCart = cartModal.contains(event.target);
        const isClickOnDeleteButton = event.target.classList.contains('remove-item');

        if (!isClickOnCartIcon && !isClickInsideCart && !isClickOnDeleteButton) {
            cartModal.classList.remove('active');
        }
    });

    // Manejar el evento de agregar productos
    document.querySelectorAll('.shop-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const productCard = button.parentElement;
            const productName = productCard.querySelector('h3').innerText;
            const productPrice = parseFloat(productCard.querySelector('p').innerText.replace('$', '').replace('.', '').replace(',', '')) || 0; // Asegúrate de eliminar cualquier coma o punto
            const productId = button.getAttribute('data-id');

            addToCart({ name: productName, price: productPrice }, productId);
        });
    });

    // Funcionalidad del botón de comprar
    document.getElementById('checkoutBtn').addEventListener('click', async () => {
        if (cart.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
    
        try {
            // Realizamos la solicitud POST para procesar la compra
            const response = await fetch('/api/v1/orders/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    productos: cart.map(item => ({ id_producto: item.id, stock: item.stock || 1 })) 
                }) 
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Compra realizada con éxito.");
                localStorage.removeItem('cart'); // Limpiar el carrito en localStorage
                cart.length = 0; // Limpiar el carrito en la variable
                updateCart(); // Actualizar la interfaz
            } else {
                // Mostrar mensaje de error devuelto por el servidor
                alert("Hubo un problema con tu compra: " + (data.message || "Error desconocido"));
            }
        } catch (error) {
            // Manejo de errores en caso de problemas en la solicitud
            console.error("Error en la compra:", error);
            alert("Error en la compra. Intenta nuevamente.");
        }
    });
    
    

    // Actualizar el carrito al cargar la página
    updateCart();
});





document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Filter products
            const category = this.getAttribute('data-category');
            products.forEach(product => {
                if (category === 'all' || product.getAttribute('data-category') === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
});
