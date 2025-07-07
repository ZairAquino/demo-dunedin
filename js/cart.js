// Cart functionality
class ShoppingCart {
    constructor() {
        this.items = this.loadCartFromStorage();
        this.shippingCost = 15.00;
        this.taxRate = 0.08; // 8% tax
        this.init();
    }

    init() {
        this.displayCartItems();
        this.updateCartSummary();
        this.initializeVideoBackground();
    }

    loadCartFromStorage() {
        const savedCart = localStorage.getItem('dunedin_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCartToStorage() {
        localStorage.setItem('dunedin_cart', JSON.stringify(this.items));
    }

    displayCartItems() {
        const cartItemsList = document.getElementById('cart-items-list');
        const cartContent = document.querySelector('.cart-content');
        const emptyCart = document.getElementById('empty-cart');

        if (this.items.length === 0) {
            cartContent.style.display = 'none';
            emptyCart.style.display = 'block';
            return;
        }

        cartContent.style.display = 'block';
        emptyCart.style.display = 'none';

        cartItemsList.innerHTML = this.items.map((item, index) => `
            <div class="cart-item" data-index="${index}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-description">${item.description}</p>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="item-quantity">
                    <button class="qty-btn decrease" onclick="cart.updateQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="qty-btn increase" onclick="cart.updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="item-total">
                    <span class="total-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-btn" onclick="cart.removeItem(${index})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateQuantity(index, change) {
        if (this.items[index]) {
            this.items[index].quantity += change;
            if (this.items[index].quantity <= 0) {
                this.removeItem(index);
            } else {
                this.saveCartToStorage();
                this.displayCartItems();
                this.updateCartSummary();
            }
        }
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCartToStorage();
        this.displayCartItems();
        this.updateCartSummary();
        
        // Update cart icon count
        this.updateCartIcon();
    }

    updateCartSummary() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * this.taxRate;
        const total = subtotal + this.shippingCost + tax;

        document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('cart-shipping').textContent = subtotal > 50 ? 'Gratis' : `$${this.shippingCost.toFixed(2)}`;
        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    }

    updateCartIcon() {
        const cartIcon = document.querySelector('.nav-icons a[data-count]');
        if (cartIcon) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartIcon.setAttribute('data-count', totalItems);
        }
    }

    initializeVideoBackground() {
        const video = document.getElementById('hero-video');
        if (video) {
            video.addEventListener('loadeddata', () => {
                console.log('Video cargado correctamente');
            });

            video.addEventListener('error', (e) => {
                console.error('Error al cargar el video:', e);
                // Fallback: cambiar el fondo a color sólido
                document.querySelector('.cart-hero').style.backgroundColor = '#2c3e50';
            });
        }
    }
}

// Función para proceder al checkout
function proceedToCheckout() {
    if (cart.items.length === 0) {
        alert('Tu carrito está vacío. Agrega algunos productos antes de continuar.');
        return;
    }
    
    // Guardar el carrito en localStorage con el formato esperado por checkout.js
    localStorage.setItem('cart', JSON.stringify(cart.items));
    
    // Redirigir a la página de checkout
    window.location.href = 'checkout.html';
}

// Función para agregar productos al carrito (desde otras páginas)
function addToCart(product) {
    const existingItem = cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            ...product,
            quantity: 1
        });
    }
    
    cart.saveCartToStorage();
    cart.updateCartIcon();
    
    // Mostrar notificación
    showNotification('Producto agregado al carrito');
}

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Datos de ejemplo para productos (simulando productos agregados)
const sampleProducts = [
    {
        id: 'crema-batida',
        name: 'Crema Batida Premium',
        description: 'Crema batida de alta calidad, perfecta para tus postres favoritos',
        price: 12.99,
        image: 'imgs/crema-batida.svg?v=2'
    },
    {
        id: 'ganache-chocolate',
        name: 'Ganache de Chocolate',
        description: 'Ganache cremoso de chocolate belga, ideal para tortas y cupcakes',
        price: 18.50,
        image: 'imgs/ganache.svg?v=2'
    },
    {
        id: 'jarabe-tres-leches',
        name: 'Jarabe Tres Leches',
        description: 'Auténtico jarabe tres leches para el postre clásico latinoamericano',
        price: 15.75,
        image: 'imgs/jarabe-tres-leches.svg?v=2'
    }
];

// Inicializar el carrito
let cart;

// Agregar algunos productos de ejemplo al carrito si está vacío
document.addEventListener('DOMContentLoaded', () => {
    cart = new ShoppingCart();
    
    // Si el carrito está vacío, agregar productos de ejemplo para demostración
    if (cart.items.length === 0) {
        // Agregar productos de ejemplo solo en desarrollo
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('demo') === 'true') {
            sampleProducts.forEach(product => {
                cart.items.push({
                    ...product,
                    quantity: Math.floor(Math.random() * 3) + 1
                });
            });
            cart.saveCartToStorage();
            cart.displayCartItems();
            cart.updateCartSummary();
        }
    }
    
    cart.updateCartIcon();
});

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 