// Productos de Dunedin
const featuredProducts = [
    {
        id: 1,
        name: 'Crema Batida',
        price: 79.99,
        image: 'imgs/crema-top-vainilla-original.png',
        description: 'Crema batida lista para usar'
    },
    {
        id: 2,
        name: 'Crema Top Chocolate',
        price: 89.99,
        image: 'imgs/crema-top-chocolate-original.png',
        description: 'Deliciosa crema sabor chocolate para repostería'
    },
    {
        id: 3,
        name: 'Crema Top Nata',
        price: 89.99,
        image: 'imgs/crema-top-nata-original.png',
        description: 'Deliciosa crema sabor nata para repostería'
    },
    {
        id: 4,
        name: 'Crema Top Vainilla',
        price: 89.99,
        image: 'imgs/crema-top-vainilla-original.png',
        description: 'Deliciosa crema sabor vainilla para repostería'
    },
    {
        id: 5,
        name: 'Ganache',
        price: 99.99,
        image: 'imgs/ganache-original.png',
        description: 'Ganache de chocolate para decoración'
    },
    {
        id: 6,
        name: 'Jarabe 3 Leches',
        price: 69.99,
        image: 'imgs/jarabe-tres-leches-original.png',
        description: 'Jarabe especial para pasteles tres leches'
    },
    {
        id: 7,
        name: 'Leche Condensada Delice',
        price: 54.99,
        image: 'imgs/leche-condensada-premium-original.png',
        description: 'Leche condensada especial para repostería'
    },
    {
        id: 8,
        name: 'Leche Condensada Premium',
        price: 59.99,
        image: 'imgs/leche-condensada-premium-original.png',
        description: 'Leche condensada de alta calidad'
    },
    {
        id: 9,
        name: 'Mermeladas',
        price: 49.99,
        image: 'imgs/mermelada-original.png',
        description: 'Mermeladas de diversos sabores'
    }
];;

// Categorías de productos Dunedin
const categories = [
    {
        id: 1,
        name: 'Cremas',
        image: 'imgs/crema-top-vainilla-original.png'
    },
    {
        id: 2,
        name: 'Jarabes',
        image: 'imgs/jarabe-tres-leches-original.png'
    },
    {
        id: 3,
        name: 'Leche Condensada',
        image: 'imgs/leche-condensada-premium-original.png'
    },
    {
        id: 4,
        name: 'Mermeladas',
        image: 'imgs/mermelada-original.png'
    }
];;

// Cargar productos destacados
function loadFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="handleImageError(this)">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="description">${product.description}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Añadir al carrito</button>
        </div>
    `).join('');
}

// Cargar categorías
function loadCategories() {
    const categoryGrid = document.querySelector('.category-grid');
    if (!categoryGrid) return;

    categoryGrid.innerHTML = categories.map(category => `
        <div class="category-card" data-id="${category.id}">
            <img src="${category.image}" alt="${category.name}" loading="lazy" onerror="handleImageError(this)">
            <h3>${category.name}</h3>
        </div>
    `).join('');
}

// Carrito de compras
function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        // Cargar carrito actual del localStorage
        let cart = JSON.parse(localStorage.getItem('dunedin_cart') || '[]');
        
        // Verificar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        // Guardar en localStorage
        localStorage.setItem('dunedin_cart', JSON.stringify(cart));
        
        updateCartIcon();
        showModernNotification(`¡${product.name} agregado al carrito!`);
    }
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.nav-icons a[data-count]');
    if (cartIcon) {
        const cart = JSON.parse(localStorage.getItem('dunedin_cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIcon.setAttribute('data-count', totalItems);
    }
}

function showModernNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification toast-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%) scale(0.95);
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(46, 204, 113, 0.18);
        z-index: 10000;
        animation: toastIn 0.35s cubic-bezier(.4,0,.2,1);
        font-weight: 500;
        font-size: 1rem;
        max-width: 90vw;
        min-width: 180px;
        text-align: center;
        opacity: 0.98;
        pointer-events: none;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'toastOut 0.3s cubic-bezier(.4,0,.2,1)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2200);
}

// Estilos para las animaciones de notificación
if (!document.querySelector('#notification-styles')) {
    const notificationStyles = document.createElement('style');
    notificationStyles.id = 'notification-styles';
    notificationStyles.textContent = `
        @keyframes toastIn {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(40px) scale(0.95);
            }
            to {
                opacity: 0.98;
                transform: translateX(-50%) translateY(0) scale(1);
            }
        }
        @keyframes toastOut {
            from {
                opacity: 0.98;
                transform: translateX(-50%) translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(40px) scale(0.95);
            }
        }
        .toast-notification {
            left: 50% !important;
            right: auto !important;
            top: auto !important;
            bottom: 40px !important;
            transform: translateX(-50%) !important;
            pointer-events: none !important;
        }
        @media (min-width: 601px) {
            .toast-notification {
                left: auto !important;
                right: 40px !important;
                bottom: 40px !important;
                top: auto !important;
                transform: none !important;
            }
            @keyframes toastIn {
                from {
                    opacity: 0;
                    transform: translateY(40px) scale(0.95);
                }
                to {
                    opacity: 0.98;
                    transform: translateY(0) scale(1);
                }
            }
            @keyframes toastOut {
                from {
                    opacity: 0.98;
                    transform: translateY(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateY(40px) scale(0.95);
                }
            }
        }
        @media (max-width: 600px) {
            .toast-notification {
                font-size: 0.95rem !important;
                padding: 0.7rem 1.1rem !important;
                min-width: 120px !important;
            }
        }
    `;
    document.head.appendChild(notificationStyles);
}

// Newsletter
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        showNotification('¡Gracias por suscribirte!');
        emailInput.value = '';
    }
}

// Event Listeners
// Función para forzar la recarga de imágenes
function forceImageReload() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const currentSrc = img.src;
        img.src = '';
        img.src = currentSrc;
    });
}

// Función para manejar errores de carga de imágenes
function handleImageError(img) {
    console.error('Error al cargar la imagen:', img.src);
    // Intentar recargar la imagen
    const currentSrc = img.src.split('?')[0];
    img.src = `${currentSrc}?v=${Date.now()}`;
}

// Función para manejar el video del hero
function initHeroVideo() {
    const video = document.getElementById('hero-video');
    if (video) {
        // Manejar errores de carga del video
        video.addEventListener('error', () => {
            // El video se oculta automáticamente si no se puede cargar
            // y se muestra el background CSS como fallback
            video.style.display = 'none';
        });

        // Asegurar que el video se reproduzca cuando esté listo
        video.addEventListener('loadeddata', () => {
            video.play().catch(e => {
                // Reproducción automática bloqueada - normal en navegadores modernos
                // El usuario puede interactuar para reproducir
            });
        });

        // Aplicar transición suave cuando el video esté listo
        video.addEventListener('canplay', () => {
            video.style.transition = 'opacity 0.5s ease-in-out';
            video.style.opacity = '1';
        });

        // Si el video ya está cargado (cache), mostrarlo inmediatamente
        if (video.readyState >= 2) {
            video.style.opacity = '1';
        }
    }
}

// Efecto de transparencia del header con detección de fondo
function handleHeaderTransparency() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // No aplicar transparencia en la página del carrito
    if (document.body.classList.contains('cart-page')) {
        return;
    }
    
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 600;
    const featuredSection = document.querySelector('.featured-products');
    const categoriesSection = document.querySelector('.categories');
    const newsletterSection = document.querySelector('.newsletter');
    
    // Limpiar todas las clases
    header.classList.remove('transparent', 'white-bg');
    
    // Determinar qué sección está en la parte superior de la pantalla
    const headerHeight = header.offsetHeight;
    const viewportTop = scrollY + headerHeight;
    
    // Si estamos en el hero (video/fondo oscuro)
    if (scrollY < heroHeight * 0.8) {
        header.classList.add('transparent');
        return;
    }
    
    // Verificar si estamos sobre una sección con fondo blanco
    let isOverWhiteSection = false;
    
    if (featuredSection) {
        const sectionTop = featuredSection.offsetTop;
        const sectionBottom = sectionTop + featuredSection.offsetHeight;
        if (viewportTop >= sectionTop && viewportTop <= sectionBottom) {
            isOverWhiteSection = true;
        }
    }
    
    if (categoriesSection) {
        const sectionTop = categoriesSection.offsetTop;
        const sectionBottom = sectionTop + categoriesSection.offsetHeight;
        if (viewportTop >= sectionTop && viewportTop <= sectionBottom) {
            isOverWhiteSection = true;
        }
    }
    
    if (newsletterSection) {
        const sectionTop = newsletterSection.offsetTop;
        const sectionBottom = sectionTop + newsletterSection.offsetHeight;
        if (viewportTop >= sectionTop && viewportTop <= sectionBottom) {
            isOverWhiteSection = true;
        }
    }
    
    // Aplicar la clase correspondiente
    if (isOverWhiteSection) {
        header.classList.add('white-bg');
    } else {
        header.classList.add('transparent');
    }
}

// --- Búsqueda móvil ---
function initMobileSearchBar() {
    const searchBtn = document.getElementById('mobile-search-btn');
    const searchBar = document.getElementById('mobile-search-bar');
    const searchInput = document.getElementById('mobile-search-input');
    const closeBtn = document.getElementById('close-mobile-search');

    if (searchBtn && searchBar && searchInput && closeBtn) {
        // Mostrar barra
        searchBtn.addEventListener('click', function() {
            searchBar.classList.add('active');
            setTimeout(() => searchInput.focus(), 100);
        });
        // Cerrar barra
        closeBtn.addEventListener('click', function() {
            searchBar.classList.remove('active');
            searchInput.value = '';
        });
        // Cerrar con Escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchBar.classList.remove('active');
                searchInput.value = '';
            }
        });
        // Cerrar al perder foco (opcional, solo si no hay texto)
        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                if (!searchInput.value) searchBar.classList.remove('active');
            }, 150);
        });
    }
}

// --- Fin búsqueda móvil ---

document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    loadCategories();
    initHeroVideo();
    updateCartIcon(); // Actualizar contador del carrito al cargar la página
    initMobileMenu(); // Inicializar menú móvil
    initMobileSearchBar(); // Inicializar barra de búsqueda móvil
    
    // Inicializar transparencia del header
    handleHeaderTransparency();
    
    // Agregar event listener para el scroll
    window.addEventListener('scroll', handleHeaderTransparency);
    
    // Agregar manejadores de error a todas las imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = () => handleImageError(img);
    });

    // Forzar recarga de imágenes después de cargar el contenido
    setTimeout(forceImageReload, 100);

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Responsive menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navCategories = document.querySelector('.nav-categories');
    
    if (menuToggle && navCategories) {
        menuToggle.addEventListener('click', () => {
            navCategories.classList.toggle('active');
        });
    }
});

// Búsqueda de productos
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDescription = card.querySelector('.description').textContent.toLowerCase();

        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Menú hamburguesa móvil
function initMobileMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    
    if (hamburgerMenu && mobileMenu && closeMenu) {
        // Abrir menú
        hamburgerMenu.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            hamburgerMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
        
        // Cerrar menú
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        });
        
        // Cerrar al hacer clic fuera del menú
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Agregar event listener para la búsqueda
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
}