# 🚀 TallerApp - Guía de Instalación y Configuración

Una solución completa de software para talleres. Gestiona solicitudes de turno, cotizaciones y pagos.

## 📋 Requisitos previos

- Node.js 16+ instalado
- Cuenta en Supabase (gratis)
- Cuenta en MercadoPago (para pagos)
- Cuenta en Vercel (para hosting)

## 🔧 Paso 1: Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita
2. Crea un nuevo proyecto
3. En el panel, ve a "SQL Editor" y copia el contenido completo de `database.sql`
4. Ejecuta el SQL para crear todas las tablas
5. Ve a "Settings" → "API" y copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 💳 Paso 2: Configurar MercadoPago

1. Ve a [mercadopago.com.ar](https://mercadopago.com.ar)
2. Crea una cuenta y verifica tu identidad
3. Ve a "Credenciales" y obtén:
   - `Public Key` → `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`
   - `Access Token` → `MERCADOPAGO_ACCESS_TOKEN`

## ⚙️ Paso 3: Configurar variables de entorno

1. Copia `.env.local` en la raíz del proyecto
2. Completa todas las variables con los datos obtenidos arriba:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=tu_public_key_aqui
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_aqui
NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
```

## 🚀 Paso 4: Instalar y ejecutar localmente

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en navegador
# http://localhost:3000
```

## 📤 Paso 5: Deployar en Vercel

### Opción A: Desde GitHub (recomendado)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Conecta tu repositorio GitHub
4. Vercel detectará que es un proyecto Next.js
5. Agrega las variables de entorno en "Environment Variables"
6. Haz clic en "Deploy"

### Opción B: Desde la terminal

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deployar
vercel

# Seguir las instrucciones
```

## 📱 Cómo funciona

### Para clientes:
1. El taller comparte su link personal: `https://tuapp.vercel.app/?taller_id=xyz`
2. Cliente completa solicitud de turno/cotización
3. Cliente recibe cotización por email
4. Cliente paga y confirma turno

### Para talleres:
1. Se registran en `/login`
2. Van al dashboard para ver solicitudes
3. Envían cotizaciones a clientes
4. Gestionan turnos confirmados
5. Reciben reportes de pagos

## 🔑 Estructura de la app

```
├── pages/
│   ├── index.js              # Página principal cliente
│   ├── login.js              # Login/registro taller
│   ├── dashboard.js          # Panel de control taller
│   ├── _app.js              # Configuración global
│   └── api/
│       ├── auth.js           # Autenticación
│       ├── solicitudes.js    # Gestión de solicitudes
│       ├── pagos.js          # Integración MercadoPago
│       └── servicios.js      # Servicios predefinidos
├── lib/
│   ├── supabase.js          # Cliente de Supabase
│   └── store.js             # Store global (Zustand)
├── styles/
│   └── globals.css          # Estilos globales
├── database.sql             # Schema de BD
├── package.json
└── .env.local              # Variables de entorno
```

## 💡 Funcionalidades del MVP

✅ Solicitud de turno sin login
✅ Servicios predefinidos por taller
✅ Cotizaciones personalizadas
✅ Panel de control del taller
✅ Múltiples usuarios por taller
✅ Integración MercadoPago
✅ Métodos de pago alternativos
✅ Historial de solicitudes
✅ Estados de solicitud

## 🎯 Próximas mejoras sugeridas

- Email automáticos (SendGrid/Mailgun)
- SMS de confirmación
- Disponibilidad horaria automática
- Reportes y analytics
- App móvil
- Sistema de reseñas
- Recordatorios automáticos

## 🆘 Troubleshooting

**Error: "Faltan variables de entorno"**
- Revisa que `.env.local` tenga todas las variables
- Reinicia el servidor: `npm run dev`

**Error: "No se conecta a Supabase"**
- Verifica que las URLs y keys sean correctas
- Asegúrate de que Supabase esté en modo "online"

**MercadoPago no funciona**
- Verifica que estés en modo sandbox (desarrollo)
- Usa tarjetas de prueba de MercadoPago

## 📞 Soporte

- Documentación Supabase: [supabase.com/docs](https://supabase.com/docs)
- Documentación MercadoPago: [developers.mercadopago.com](https://developers.mercadopago.com)
- Documentación Next.js: [nextjs.org/docs](https://nextjs.org/docs)

---

¡Listo! Ya tienes tu app funcionando. Ahora a vender TallerApp a talleres 🚀
