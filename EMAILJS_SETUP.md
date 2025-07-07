# 📧 Configuración de EmailJS para Envío Real de Emails

Esta guía te mostrará cómo configurar EmailJS para enviar emails reales de confirmación de pedidos.

## 🚀 Paso 1: Crear Cuenta en EmailJS

1. Ve a [https://www.emailjs.com](https://www.emailjs.com)
2. Haz clic en **"Sign Up Free"**
3. Crea tu cuenta con email y contraseña
4. Verifica tu email

## 📧 Paso 2: Configurar Servicio de Email

1. **Ir a Email Services**:
   - En el dashboard, haz clic en **"Add New Service"**

2. **Seleccionar Gmail** (recomendado para pruebas):
   - Elige **"Gmail"** de la lista
   - Asigna un nombre: `dunedin-service`
   - **Conectar tu cuenta**: Haz clic en "Connect Account"
   - Autoriza EmailJS para usar tu Gmail

3. **Copiar Service ID**:
   - Una vez creado, copia el **Service ID** (ej: `service_abc123`)

## 📝 Paso 3: Crear Plantilla de Email

1. **Ir a Email Templates**:
   - Haz clic en **"Create New Template"**

2. **Configurar la plantilla**:
   - **Template Name**: `Confirmación de Pedido Dunedin`
   - **Template ID**: `dunedin_order_confirmation`

3. **Diseñar el email**:

### Subject (Asunto):
```
Confirmación de Pedido {{order_number}} - Dunedin
```

### Content (Contenido HTML):
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Confirmación de Pedido</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #27ae60, #2ecc71); padding: 20px; border-radius: 10px;">
        <h1 style="color: white; margin: 0; font-size: 2rem;">¡Gracias por tu pedido!</h1>
        <h2 style="color: white; margin: 10px 0 0 0; font-size: 1.2rem;">Dunedin - Productos para Repostería</h2>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h3 style="color: #2c3e50; margin-top: 0;">📋 Detalles del Pedido</h3>
        <p><strong>Número de Pedido:</strong> {{order_number}}</p>
        <p><strong>Fecha:</strong> {{order_date}}</p>
        <p><strong>Total:</strong> {{order_total}}</p>
        <p><strong>Método de Pago:</strong> {{payment_method}}</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h3 style="color: #2c3e50; margin-top: 0;">🚚 Información de Entrega</h3>
        <p><strong>Cliente:</strong> {{customer_name}}</p>
        <p><strong>Dirección:</strong> {{customer_address}}</p>
        <p><strong>Ciudad:</strong> {{customer_city}}</p>
        <p><strong>Código Postal:</strong> {{customer_postal}}</p>
        <p><strong>Teléfono:</strong> {{customer_phone}}</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h3 style="color: #2c3e50; margin-top: 0;">🛍️ Productos Pedidos</h3>
        <div style="white-space: pre-wrap; font-family: monospace; font-size: 14px; background: white; padding: 15px; border-radius: 5px;">{{order_items}}</div>
        
        <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #ddd;">
            <p style="margin: 5px 0;"><strong>Subtotal:</strong> ${{subtotal}}</p>
            <p style="margin: 5px 0;"><strong>Envío:</strong> ${{shipping}}</p>
            <p style="margin: 5px 0; font-size: 1.2rem; color: #27ae60;"><strong>Total:</strong> {{order_total}}</p>
        </div>
    </div>
    
    <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h3 style="color: #2c3e50; margin-top: 0;">📞 ¿Necesitas ayuda?</h3>
        <p>Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos:</p>
        <p><strong>Email:</strong> {{support_email}}</p>
        <p><strong>WhatsApp:</strong> +54 11 1234-5678</p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; color: #7f8c8d;">
        <p>Recibirás una notificación cuando tu pedido esté en camino.</p>
        <p><strong>¡Gracias por elegir {{company_name}}!</strong></p>
    </div>
    
</body>
</html>
```

4. **Configurar campos del email**:
   - **To Email**: `{{to_email}}`
   - **From Name**: `{{company_name}}`
   - **Reply-To**: `{{support_email}}`

5. **Guardar la plantilla** y copiar el **Template ID**

## 🔑 Paso 4: Obtener Public Key

1. Ve a **"Account"** en el menú
2. Copia tu **Public Key** (ej: `user_xxxxxxxxxxxxxxxxx`)

## 💻 Paso 5: Actualizar el Código

Abre el archivo `js/checkout.js` y reemplaza:

```javascript
// Línea ~15
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); 

// Línea ~265
const SERVICE_ID = 'YOUR_SERVICE_ID';  // ej: 'service_abc123'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // ej: 'template_xyz789'
```

Con tus valores reales:

```javascript
// Reemplazar con tu Public Key
emailjs.init("user_tu_public_key_aqui"); 

// Reemplazar con tus IDs
const SERVICE_ID = 'service_abc123';  // Tu Service ID real
const TEMPLATE_ID = 'dunedin_order_confirmation'; // Tu Template ID real
```

## 🧪 Paso 6: Probar el Sistema

1. **Iniciar el servidor**: `python -m http.server 8000`
2. **Ir al checkout**: Agregar productos al carrito
3. **Llenar formulario** con tu email real
4. **Confirmar pedido**
5. **Revisar tu email** - deberías recibir la confirmación

## 📊 Monitorear Envíos

En tu dashboard de EmailJS puedes:
- Ver historial de emails enviados
- Verificar tasas de entrega
- Configurar límites de envío

## 🆓 Límites del Plan Gratuito

- **200 emails/mes** gratis
- Perfecto para testing y proyectos pequeños
- Para más emails, considera un plan pago

## 🔧 Solución de Problemas

### Error: "Public Key not found"
- Verifica que el Public Key esté bien copiado
- Asegúrate de llamar `emailjs.init()` antes de enviar

### Error: "Service not found"
- Verifica el Service ID
- Asegúrate de que el servicio esté activo

### Error: "Template not found"
- Verifica el Template ID
- Asegúrate de que la plantilla esté guardada

### Email no llega
- Revisa la carpeta de spam
- Verifica que el email destino sea correcto
- Checa el historial en EmailJS dashboard

## 🎯 ¡Listo!

Una vez configurado correctamente, cada pedido confirmado enviará automáticamente un email profesional con todos los detalles del pedido al cliente.

---

**¿Necesitas ayuda?** Consulta la [documentación oficial de EmailJS](https://www.emailjs.com/docs/) 