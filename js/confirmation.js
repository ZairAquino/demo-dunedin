// Confirmation page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadOrderDetails();
    animateSuccess();
});

// Cargar detalles del pedido
function loadOrderDetails() {
    // Intentar obtener datos desde URL params primero
    const urlParams = new URLSearchParams(window.location.search);
    
    let orderData = {};
    
    // Si hay parámetros en la URL, usarlos
    if (urlParams.has('orderNumber')) {
        orderData = {
            orderNumber: urlParams.get('orderNumber'),
            total: urlParams.get('total'),
            paymentMethod: urlParams.get('paymentMethod'),
            customerEmail: urlParams.get('email'),
            deliveryAddress: urlParams.get('address')
        };
    } else {
        // Si no hay parámetros, intentar desde localStorage
        const savedOrderData = localStorage.getItem('lastOrderConfirmation');
        if (savedOrderData) {
            orderData = JSON.parse(savedOrderData);
        } else {
            // Datos por defecto si no hay información
            orderData = {
                orderNumber: 'DUN-' + Date.now().toString().slice(-8),
                total: '$0.00',
                paymentMethod: 'No especificado',
                customerEmail: 'No especificado',
                deliveryAddress: 'No especificada'
            };
        }
    }
    
    // Actualizar los elementos de la página
    updateOrderDisplay(orderData);
    
    // Limpiar datos guardados después de mostrarlos
    localStorage.removeItem('lastOrderConfirmation');
}

// Actualizar la visualización del pedido
function updateOrderDisplay(orderData) {
    // Número de pedido
    const orderNumberElement = document.getElementById('order-number');
    if (orderNumberElement) {
        orderNumberElement.textContent = orderData.orderNumber || 'DUN-12345678';
    }
    
    // Total
    const orderTotalElement = document.getElementById('order-total');
    if (orderTotalElement) {
        orderTotalElement.textContent = orderData.total || '$0.00';
    }
    
    // Método de pago
    const paymentMethodElement = document.getElementById('payment-method');
    if (paymentMethodElement) {
        paymentMethodElement.textContent = getPaymentMethodName(orderData.paymentMethod) || 'No especificado';
    }
    
    // Dirección de entrega
    const deliveryAddressElement = document.getElementById('delivery-address');
    if (deliveryAddressElement) {
        deliveryAddressElement.textContent = orderData.deliveryAddress || 'No especificada';
    }
    
    // Email del cliente
    const customerEmailElement = document.getElementById('customer-email');
    if (customerEmailElement) {
        customerEmailElement.textContent = orderData.customerEmail || 'No especificado';
    }
}

// Convertir código de método de pago a nombre legible
function getPaymentMethodName(method) {
    const methods = {
        'credit-card': 'Tarjeta de Crédito/Débito',
        'mercado-pago': 'Mercado Pago',
        'bank-transfer': 'Transferencia Bancaria',
        'cash-delivery': 'Pago Contra Entrega'
    };
    return methods[method] || method || 'No especificado';
}

// Animación del checkmark de éxito
function animateSuccess() {
    const checkmarkCircle = document.querySelector('.checkmark-circle');
    if (checkmarkCircle) {
        // Añadir clase para animación después de un pequeño delay
        setTimeout(() => {
            checkmarkCircle.classList.add('animate');
        }, 500);
    }
    
    // Animar las tarjetas de detalles secuencialmente
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, 1000 + (index * 200));
    });
    
    // Animar los siguientes pasos
    const nextStepsItems = document.querySelectorAll('.next-steps li');
    nextStepsItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-in');
        }, 2000 + (index * 300));
    });
}

// Función para redirigir desde el checkout
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