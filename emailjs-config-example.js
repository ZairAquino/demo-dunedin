// 📧 CONFIGURACIÓN DE EMAILJS - EJEMPLO
// 
// Este archivo muestra cómo configurar EmailJS para enviar emails reales.
// Sigue estos pasos:

// 1. Ve a https://www.emailjs.com y crea una cuenta
// 2. Configura un servicio de email (Gmail recomendado)
// 3. Crea una plantilla de email 
// 4. Obtén tus credenciales y reemplaza los valores abajo

// ========================================
// PASO 1: INICIALIZAR EMAILJS
// ========================================
// Reemplaza "YOUR_EMAILJS_PUBLIC_KEY" con tu Public Key real
// Ejemplo: emailjs.init("user_abc123def456ghi789");

emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");

// ========================================
// PASO 2: CONFIGURAR SERVICE_ID Y TEMPLATE_ID
// ========================================
// En la función sendConfirmationEmail() del archivo js/checkout.js
// Reemplaza estos valores:

const SERVICE_ID = 'YOUR_SERVICE_ID';    // ej: 'service_gmail123'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ej: 'dunedin_order_confirmation'

// ========================================
// EJEMPLO DE CONFIGURACIÓN COMPLETA:
// ========================================

/*
// Ejemplo con credenciales reales (reemplaza con las tuyas):

emailjs.init("user_abc123def456ghi789");

const SERVICE_ID = 'service_gmail123';
const TEMPLATE_ID = 'dunedin_order_confirmation';

// El sistema automáticamente enviará emails usando estos datos:
const emailData = {
    to_email: 'cliente@ejemplo.com',
    to_name: 'Juan Pérez',
    order_number: 'DUN-2024-001',
    order_total: '$2,500.00',
    payment_method: 'Tarjeta de Crédito',
    customer_name: 'Juan Pérez',
    customer_address: 'Av. Corrientes 1234',
    customer_city: 'Buenos Aires',
    customer_postal: '1043',
    customer_phone: '+54 11 1234-5678',
    order_items: 'Productos del carrito...',
    order_date: '15/01/2024',
    subtotal: '2000.00',
    shipping: '500.00',
    company_name: 'Dunedin',
    support_email: 'soporte@dunedin.com'
};
*/

// ========================================
// VARIABLES DISPONIBLES EN LA PLANTILLA:
// ========================================

/*
En tu plantilla de EmailJS puedes usar estas variables:

{{to_email}}         - Email del cliente
{{to_name}}          - Nombre completo del cliente  
{{order_number}}     - Número de pedido
{{order_total}}      - Total del pedido
{{payment_method}}   - Método de pago
{{customer_name}}    - Nombre del cliente
{{customer_address}} - Dirección de entrega
{{customer_city}}    - Ciudad
{{customer_postal}}  - Código postal
{{customer_phone}}   - Teléfono
{{order_items}}      - Lista de productos
{{order_date}}       - Fecha del pedido
{{subtotal}}         - Subtotal
{{shipping}}         - Costo de envío
{{company_name}}     - Nombre de la empresa
{{support_email}}    - Email de soporte
*/

// ========================================
// TESTEAR EL SISTEMA:
// ========================================

/*
1. Configura tus credenciales arriba
2. Copia los valores a js/checkout.js
3. Haz un pedido de prueba con tu email
4. Revisa tu bandeja de entrada (y spam)
5. Verifica el historial en EmailJS dashboard
*/

// ========================================
// ALTERNATIVAS GRATUITAS:
// ========================================

/*
Si no quieres usar EmailJS, otras opciones gratuitas son:

1. Formspree (https://formspree.io/)
2. Netlify Forms (para sitios en Netlify)
3. Web3Forms (https://web3forms.com/)
4. EmailJS (recomendado - 200 emails/mes gratis)

Para proyectos más grandes considera:
- SendGrid, Mailgun, Amazon SES
*/ 