# 🎯 TallerApp - Guía Rápida para Comenzar

## ¿Qué acabas de recibir?

Una **app web completa y funcional** lista para vender a talleres. Incluye:

- ✅ Frontend para clientes (solicitar turno, pagar)
- ✅ Panel de administración para talleres
- ✅ Base de datos en Supabase
- ✅ Integración con MercadoPago
- ✅ APIs completas
- ✅ Autenticación y seguridad básica
- ✅ Diseño profesional con Tailwind CSS

## ⚡ En 3 pasos tienes todo online

### 1️⃣ Crear cuentas (15 minutos)

**Supabase** (Base de datos)
- Ve a https://supabase.com
- Regístrate (puedes usar GitHub)
- Crea un proyecto gratuito
- Copia URL y API key

**MercadoPago** (Pagos)
- Ve a https://mercadopago.com.ar
- Regístrate y verifica identidad
- Obtén credenciales de sandbox

**Vercel** (Hosting)
- Ve a https://vercel.com
- Regístrate con GitHub (recomendado)

### 2️⃣ Configurar la app (10 minutos)

En tu computadora:
```bash
# 1. Descarga los archivos (git clone o ZIP)
cd taller-app

# 2. Instala dependencias
npm install

# 3. Copia .env.local y completa con tus credenciales
# NEXT_PUBLIC_SUPABASE_URL = ...
# NEXT_PUBLIC_SUPABASE_ANON_KEY = ...
# etc.

# 4. Crea las tablas en Supabase (copia/pega el SQL del archivo database.sql)

# 5. Prueba localmente
npm run dev
# Abre http://localhost:3000
```

### 3️⃣ Deployar en Vercel (5 minutos)

Opción A (si tienes GitHub):
- Sube los archivos a un repo GitHub
- En Vercel, conecta tu repo
- Agrega variables de entorno
- ¡Listo! Tu app está online

Opción B (desde la terminal):
```bash
npm install -g vercel
vercel
# Sigue los pasos
```

## 🎁 URLs que obtendrás

Después de deployar, tendrás:
- **Dashboard del taller**: `https://tuapp.vercel.app/login`
- **Link para clientes**: `https://tuapp.vercel.app/?taller_id=xyz`

## 💼 Cómo vender esto

### Cliente tipo: Taller mecánico, electricista, carpintería, etc.

**Propuesta:**
> "Te doy una plataforma para que tus clientes soliciten turnos online, te pidan cotizaciones y paguen sin necesidad de llamadas. Reduces tiempo, aumentas profesionalismo, recibís pagos online."

**Precios sugeridos:**
- $150-300 ARS/mes (suscripción básica)
- $500-1000 ARS/mes (con más funcionalidades)
- 5% de comisión por cada pago procesado

**Ventaja sobre competencia:**
- Completamente personalizable
- Sin comisiones extra (solo lo que acuerdes)
- Fácil de usar
- Soporte directo

## 🔧 Que puedes personalizar

**Fácil** (cambiar colores, textos):
- Colores: Edit `tailwind.config.js`
- Logo: Reemplaza en `pages/dashboard.js`
- Nombre: Busca "TallerApp" en los archivos

**Medio** (agregar funcionalidades):
- Más campos en formulario
- Nuevos métodos de pago
- Reportes y estadísticas
- Notificaciones por email

**Avanzado** (cambios profundos):
- Autenticación social (Google, Facebook)
- App móvil
- Sistema de calificaciones
- Multi-idioma

## 📊 Flujo de la app

**Cliente:**
1. Accede a link personal: `https://tuapp.vercel.app/?taller_id=123`
2. Completa formulario de solicitud
3. Recibe cotización por email
4. Acepta y paga
5. Obtiene confirmación de turno

**Taller:**
1. Se registra en `/login`
2. Ve panel con solicitudes pendientes
3. Envía cotización personalizada
4. Recibe confirmación de pago
5. Gestiona turnos confirmados

## ⚠️ IMPORTANTE: Antes de vender

- [ ] Configura seguridad real (hash de contraseñas con bcrypt)
- [ ] Prueba MercadoPago con tarjetas de prueba
- [ ] Configura emails automáticos (opcional pero recomendado)
- [ ] Prueba el flujo completo
- [ ] Agrega términos de servicio
- [ ] Valida en Supabase (Row Level Security)

## 🚀 Roadmap para monetizar

**Fase 1 (Ahora):**
- Vende a 5-10 talleres a precio bajo
- Recibe feedback
- Mejora según comentarios

**Fase 2 (1-2 meses):**
- Escala a 50+ talleres
- Automatiza onboarding
- Crea documentación/tutoriales

**Fase 3 (3+ meses):**
- Agrega más funcionalidades
- Sube precios
- Considera app móvil

## 📞 Recursos

- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- MercadoPago Dev: https://developers.mercadopago.com
- Tailwind CSS: https://tailwindcss.com/docs
- Vercel Docs: https://vercel.com/docs

## 🎯 Próximo paso

1. Lee `SETUP.md` paso a paso
2. Configura Supabase y MercadoPago
3. Prueba localmente
4. Despliega en Vercel
5. ¡Comienza a vender!

---

**¿Tienes dudas?** Lee los archivos `SETUP.md` y `README.md` que están en el proyecto.

¡Éxito con TallerApp! 🚀
