# 🚀 Guía Rápida: Configurar EmailJS para Dunedin

## ⏱️ Tiempo estimado: 10-15 minutos

### 📋 **PASO 1: Crear Cuenta EmailJS**

1. Ve a → **[https://www.emailjs.com](https://www.emailjs.com)**
2. Clic en **"Sign Up Free"**
3. Llena el formulario:
   - Email
   - Contraseña
   - Acepta términos
4. **Verifica tu email** (revisa spam si no llega)

---

### 📧 **PASO 2: Configurar Servicio Gmail**

1. **En el dashboard** → **"Email Services"** 
2. **Clic** → **"Add New Service"**
3. **Seleccionar** → **"Gmail"** (primera opción)
4. **Llenar formulario**:
   - **Service Name**: `Dunedin Service`
   - **Service ID**: `dunedin_service` (automático)
5. **Clic** → **"Connect Account"**
6. **Autorizar Google** (ventana popup):
   - Selecciona tu Gmail
   - Acepta permisos
7. **Clic** → **"Create Service"**

✅ **IMPORTANTE**: Copia y guarda el **Service ID** (ej: `service_1a2b3c4d`)

---

### 📝 **PASO 3: Crear Plantilla Email**

1. **En el dashboard** → **"Email Templates"**
2. **Clic** → **"Create New Template"**
3. **Configurar template**:
   - **Template Name**: `Confirmación Pedido Dunedin`
   - **Template ID**: `dunedin_order_confirmation`

#### **3.1 Configurar Subject (Asunto)**
```
Confirmación de Pedido {{order_number}} - Dunedin
```

#### **3.2 Configurar Content (Contenido)**
1. **Cambiar a "Code Editor"** (arriba derecha)
2. **Borrar todo** el contenido existente
3. **Copiar TODO el contenido** del archivo `email-template.html`
4. **Pegar** en el editor

#### **3.3 Configurar Email Settings**
- **To Email**: `{{to_email}}`
- **From Name**: `Dunedin`
- **From Email**: ✅ Use default (tu Gmail)
- **Reply-To**: `{{support_email}}`
- **Bcc/Cc**: Dejar vacío

5. **Clic** → **"Save"**

✅ **IMPORTANTE**: Copia y guarda el **Template ID** (ej: `template_xyz789`)

---

### 🔑 **PASO 4: Obtener Public Key**

1. **En el dashboard** → **"Account"** (menú superior)
2. **Buscar sección** → **"API Keys"**
3. **Copiar** → **"Public Key"** (ej: `user_abc123def456`)

✅ **IMPORTANTE**: Guarda esta clave

---

### 💻 **PASO 5: Configurar el Código**

Ahora actualiza el archivo `js/checkout.js`:

#### **5.1 Buscar línea ~15**
```javascript
// CAMBIAR ESTO:
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); 

// POR ESTO (con tu clave real):
emailjs.init("user_abc123def456");
```

#### **5.2 Buscar líneas ~265-266**
```javascript
// CAMBIAR ESTO:
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

// POR ESTO (con tus IDs reales):
const SERVICE_ID = 'service_1a2b3c4d';
const TEMPLATE_ID = 'dunedin_order_confirmation';
```

---

### 🧪 **PASO 6: Probar el Sistema**

1. **Guardar cambios** en `js/checkout.js`
2. **Ir al navegador** → `http://localhost:8000`
3. **Agregar productos** al carrito
4. **Ir al checkout** → Llenar formulario
5. **Usar tu email real** en el campo email
6. **Confirmar pedido**
7. **Revisar tu email** (inbox y spam)

---

## 🎯 **Checklist Final**

- [ ] Cuenta EmailJS creada ✅
- [ ] Servicio Gmail conectado ✅  
- [ ] Plantilla HTML creada ✅
- [ ] Service ID copiado ✅
- [ ] Template ID copiado ✅
- [ ] Public Key copiado ✅
- [ ] Código actualizado ✅
- [ ] Prueba realizada ✅
- [ ] Email recibido ✅

---

## 🆘 **Solución de Problemas**

### **❌ Error: "Public Key not found"**
- Verifica que copiaste bien el Public Key
- Asegúrate que llamaste `emailjs.init()` antes

### **❌ Error: "Service not found"**  
- Verifica el Service ID
- Asegúrate que el servicio esté activo

### **❌ Error: "Template not found"**
- Verifica el Template ID
- Asegúrate que guardaste la plantilla

### **❌ Email no llega**
- Revisa carpeta de SPAM
- Verifica email destino correcto
- Checa historial en EmailJS dashboard

### **❌ Variables no aparecen**
- Verifica que usaste `{{variable}}` en la plantilla
- Asegúrate que el JavaScript envía esos datos

---

## 🎉 **¡Listo!**

Una vez configurado, cada pedido enviará automáticamente un email profesional con todos los detalles.

**Límite gratuito**: 200 emails/mes (perfecto para testing)

---

**¿Necesitas ayuda?** 
- [Documentación EmailJS](https://www.emailjs.com/docs/)
- Revisa la consola del navegador (F12) para errores 