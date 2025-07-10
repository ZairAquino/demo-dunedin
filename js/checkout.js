// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutItems();
    setupPaymentMethods();
    setupFormValidation();
    updateCartIcon();
    initializeEmailJS();
});

// Inicializar EmailJS
function initializeEmailJS() {
    // Reemplaza con tu Public Key real de EmailJS
    emailjs.init("PbZdrZKZbD4DPuyem"); 
    
    // Para pruebas, puedes usar estas credenciales de ejemplo:
    // emailjs.init("user_xxxxxxxxxxxxxxxxx");
}

// Actualizar el icono del carrito
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.querySelector('.nav-icons a[data-count]');
    if (cartIcon) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIcon.setAttribute('data-count', totalItems);
    }
}

// Cargar items del carrito en el checkout
function loadCheckoutItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('checkout-subtotal');
    const totalElement = document.getElementById('checkout-total');
    const shippingElement = document.getElementById('checkout-shipping');
    
    let subtotal = 0;
    const shipping = 500; // Costo fijo de envío
    
    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = '<p class="empty-checkout">No hay productos en tu carrito.</p>';
        subtotalElement.textContent = '$0.00';
        totalElement.textContent = `$${shipping.toFixed(2)}`;
        return;
    }
    
    checkoutItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <div class="checkout-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="checkout-item-details">
                <h4>${item.name}</h4>
                <p class="checkout-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
                <p class="checkout-item-total">$${itemTotal.toFixed(2)}</p>
            </div>
        `;
        checkoutItemsContainer.appendChild(itemElement);
    });
    
    const total = subtotal + shipping;
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Configurar métodos de pago
function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const paymentForms = document.querySelectorAll('.payment-form');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Ocultar todos los formularios
            paymentForms.forEach(form => {
                form.classList.remove('active');
            });
            
            // Mostrar el formulario correspondiente
            const selectedForm = document.getElementById(this.value + '-form');
            if (selectedForm) {
                selectedForm.classList.add('active');
            }
        });
    });
}

// Configurar validación de formularios
function setupFormValidation() {
    // Formatear número de tarjeta
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Formatear fecha de vencimiento
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Solo números para CVV
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
}

// Validar formulario
function validateForm() {
    const requiredFields = document.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    // Validar método de pago específico
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (selectedPaymentMethod === 'credit-card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;
        
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            document.getElementById('cardNumber').classList.add('error');
            isValid = false;
        }
        
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            document.getElementById('expiryDate').classList.add('error');
            isValid = false;
        }
        
        if (cvv.length < 3 || cvv.length > 4) {
            document.getElementById('cvv').classList.add('error');
            isValid = false;
        }
        
        if (!cardName.trim()) {
            document.getElementById('cardName').classList.add('error');
            isValid = false;
        }
    }
    
    if (selectedPaymentMethod === 'bank-transfer') {
        const transferReference = document.getElementById('transferReference').value;
        if (!transferReference.trim()) {
            document.getElementById('transferReference').classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

// Procesar pedido
function placeOrder() {
    if (!validateForm()) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }
    
    const orderData = collectOrderData();
    
    // Simular procesamiento del pedido
    showNotification('Procesando tu pedido...', 'info');
    
    // Enviar email de confirmación
    sendConfirmationEmail(orderData)
        .then(() => {
            // Limpiar carrito
            localStorage.removeItem('cart');
            
            // Redirigir a página de confirmación
            redirectToConfirmation(orderData);
        })
        .catch((error) => {
            console.error('Error enviando email:', error);
            
            // Aún redirigir aunque falle el email
            localStorage.removeItem('cart');
            redirectToConfirmation(orderData);
        });
}

// Recopilar datos del pedido
function collectOrderData() {
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    return {
        customer: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postalCode').value
        },
        paymentMethod: selectedPaymentMethod,
        items: JSON.parse(localStorage.getItem('cart')) || [],
        total: document.getElementById('checkout-total').textContent,
        orderNumber: generateOrderNumber()
    };
}

// Generar número de pedido
function generateOrderNumber() {
    return 'DUN-' + Date.now().toString().slice(-8);
}

// Enviar email de confirmación
function sendConfirmationEmail(orderData) {
    return new Promise((resolve, reject) => {
        // Datos para EmailJS
        const emailData = {
            to_email: orderData.customer.email,
            to_name: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
            order_number: orderData.orderNumber,
            order_total: orderData.total,
            payment_method: getPaymentMethodName(orderData.paymentMethod),
            delivery_address: `${orderData.customer.address}, ${orderData.customer.city}`,
            customer_phone: orderData.customer.phone,
            order_items: formatOrderItems(orderData.items),
            order_date: new Date().toLocaleDateString('es-ES'),
            // Datos adicionales para la plantilla
            customer_name: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
            customer_address: orderData.customer.address,
            customer_city: orderData.customer.city,
            customer_postal: orderData.customer.postalCode,
            subtotal: calculateSubtotal(orderData.items),
            shipping: '500.00',
            company_name: 'Dunedin',
            support_email: 'soporte@dunedin.com'
        };
        
        console.log('📧 Enviando email de confirmación a:', emailData.to_email);
        console.log('📦 Datos del pedido:', emailData);
        
        // Configuración de EmailJS (reemplazar con tus valores reales)
        const SERVICE_ID = 'YOUR_SERVICE_ID';  // ej: 'service_abc123'
        const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // ej: 'template_xyz789'
        
        // Si las credenciales no están configuradas, simular el envío
        if (SERVICE_ID === 'YOUR_SERVICE_ID' || TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
            console.log('⚠️ EmailJS no configurado - usando simulación');
            console.log('📝 Para configurar EmailJS:');
            console.log('1. Ve a https://www.emailjs.com');
            console.log('2. Crea una cuenta y configura un servicio');
            console.log('3. Crea una plantilla de email');
            console.log('4. Reemplaza SERVICE_ID, TEMPLATE_ID y PUBLIC_KEY en el código');
            
            // Simular envío exitoso
            setTimeout(() => {
                resolve({ status: 200, text: 'Email simulado enviado exitosamente' });
            }, 1500);
            return;
        }
        
        // Envío real con EmailJS
        emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData)
            .then((response) => {
                console.log('✅ Email enviado exitosamente!', response.status, response.text);
                resolve(response);
            })
            .catch((error) => {
                console.error('❌ Error enviando email:', error);
                reject(error);
            });
    });
}

// Calcular subtotal
function calculateSubtotal(items) {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
}

// Formatear items del pedido para el email
function formatOrderItems(items) {
    return items.map(item => 
        `${item.name} - Cantidad: ${item.quantity} - Precio: $${item.price.toFixed(2)} - Total: $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
}

// Generar HTML del email
function generateEmailHTML(data) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Confirmación de Pedido - Dunedin</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2c3e50;">¡Gracias por tu pedido!</h1>
                <h2 style="color: #3498db;">Dunedin - Productos para Repostería</h2>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h3 style="color: #2c3e50; margin-top: 0;">Detalles del Pedido</h3>
                <p><strong>Número de Pedido:</strong> ${data.order_number}</p>
                <p><strong>Fecha:</strong> ${data.order_date}</p>
                <p><strong>Total:</strong> ${data.order_total}</p>
                <p><strong>Método de Pago:</strong> ${data.payment_method}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h3 style="color: #2c3e50; margin-top: 0;">Información de Entrega</h3>
                <p><strong>Nombre:</strong> ${data.to_name}</p>
                <p><strong>Dirección:</strong> ${data.delivery_address}</p>
                <p><strong>Teléfono:</strong> ${data.customer_phone}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h3 style="color: #2c3e50; margin-top: 0;">Productos Pedidos</h3>
                <pre style="white-space: pre-wrap; font-size: 14px;">${data.order_items}</pre>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <p style="color: #7f8c8d;">Recibirás una notificación cuando tu pedido esté en camino.</p>
                <p style="color: #7f8c8d;">¡Gracias por elegir Dunedin!</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

// Mostrar confirmación del pedido
function showOrderConfirmation(orderData) {
    const confirmationHTML = `
        <div class="order-confirmation-overlay">
            <div class="order-confirmation">
                <div class="confirmation-header">
                    <i class="fas fa-check-circle"></i>
                    <h2>¡Pedido Confirmado!</h2>
                </div>
                <div class="confirmation-content">
                    <p><strong>Número de Pedido:</strong> ${orderData.orderNumber}</p>
                    <p><strong>Total:</strong> ${orderData.total}</p>
                    <p><strong>Método de Pago:</strong> ${getPaymentMethodName(orderData.paymentMethod)}</p>
                    <p>Recibirás un email de confirmación en <strong>${orderData.customer.email}</strong></p>
                    <p>Tu pedido será entregado en <strong>${orderData.customer.address}, ${orderData.customer.city}</strong></p>
                </div>
                <div class="confirmation-actions">
                    <button onclick="closeConfirmation()" class="btn-continue">Continuar Comprando</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmationHTML);
}

// Obtener nombre del método de pago
function getPaymentMethodName(method) {
    const methods = {
        'credit-card': 'Tarjeta de Crédito/Débito',
        'mercado-pago': 'Mercado Pago',
        'bank-transfer': 'Transferencia Bancaria',
        'cash-delivery': 'Pago Contra Entrega'
    };
    return methods[method] || method;
}

// Cerrar confirmación
function closeConfirmation() {
    const overlay = document.querySelector('.order-confirmation-overlay');
    if (overlay) {
        overlay.remove();
    }
    window.location.href = 'index.html';
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification toast-notification ${type}`;
    notification.textContent = message;
    const colors = {
        success: 'linear-gradient(45deg, #27ae60, #2ecc71)',
        error: 'linear-gradient(45deg, #e74c3c, #c0392b)',
        warning: 'linear-gradient(45deg, #f39c12, #e67e22)',
        info: 'linear-gradient(45deg, #3498db, #2980b9)'
    };
    notification.style.cssText = `
        position: fixed;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%) scale(0.95);
        background: ${colors[type] || colors.success};
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
    // Agregar estilos para animaciones y posición responsive solo una vez
    if (!document.querySelector('#toast-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-notification-styles';
        style.textContent = `
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
        document.head.appendChild(style);
    }
}

// Función para redirigir a la página de confirmación
function redirectToConfirmation(orderData) {
    // Guardar datos en localStorage como respaldo
    localStorage.setItem('lastOrderConfirmation', JSON.stringify(orderData));
    
    // Crear URL con parámetros
    const params = new URLSearchParams({
        orderNumber: orderData.orderNumber,
        total: orderData.total,
        paymentMethod: orderData.paymentMethod,
        email: orderData.customer.email,
        address: `${orderData.customer.address}, ${orderData.customer.city}`
    });
    
    // Redirigir a la página de confirmación
    window.location.href = `confirmacion.html?${params.toString()}`;
} 