-- Tabla de Talleres
CREATE TABLE talleres (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  contraseña_hash VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  direccion TEXT,
  ciudad VARCHAR(100),
  logo_url TEXT,
  descripcion TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Tabla de Usuarios del Taller
CREATE TABLE usuarios_taller (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  taller_id UUID NOT NULL REFERENCES talleres(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  contraseña_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(50) DEFAULT 'empleado', -- 'admin', 'empleado'
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- Tabla de Servicios Predefinidos
CREATE TABLE servicios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  taller_id UUID NOT NULL REFERENCES talleres(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio_estimado DECIMAL(10, 2),
  tiempo_estimado_minutos INTEGER, -- tiempo aproximado de servicio
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Tabla de Solicitudes de Turno/Cotización
CREATE TABLE solicitudes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  taller_id UUID NOT NULL REFERENCES talleres(id) ON DELETE CASCADE,
  cliente_nombre VARCHAR(255) NOT NULL,
  cliente_email VARCHAR(255) NOT NULL,
  cliente_telefono VARCHAR(20) NOT NULL,
  descripcion TEXT NOT NULL,
  servicio_id UUID REFERENCES servicios(id) ON DELETE SET NULL,
  fecha_preferida DATE,
  hora_preferida TIME,
  estado VARCHAR(50) DEFAULT 'pendiente', -- 'pendiente', 'cotizado', 'aceptado', 'rechazado', 'completado'
  monto_cotizado DECIMAL(10, 2),
  notas TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Tabla de Pagos
CREATE TABLE pagos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  solicitud_id UUID NOT NULL REFERENCES solicitudes(id) ON DELETE CASCADE,
  monto DECIMAL(10, 2) NOT NULL,
  metodo_pago VARCHAR(50) NOT NULL, -- 'mercadopago', 'transferencia', 'tarjeta', 'efectivo'
  estado VARCHAR(50) DEFAULT 'pendiente', -- 'pendiente', 'pagado', 'cancelado'
  referencia_pago VARCHAR(255), -- ID de transacción MercadoPago u otro
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Tabla de Turnos Confirmados
CREATE TABLE turnos (
  id UUID PRIMARYKey DEFAULT uuid_generate_v4(),
  solicitud_id UUID NOT NULL REFERENCES solicitudes(id) ON DELETE CASCADE,
  taller_id UUID NOT NULL REFERENCES talleres(id) ON DELETE CASCADE,
  fecha_turno DATE NOT NULL,
  hora_turno TIME NOT NULL,
  estado VARCHAR(50) DEFAULT 'confirmado', -- 'confirmado', 'completado', 'cancelado'
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Índices para mejorar performance
CREATE INDEX idx_solicitudes_taller ON solicitudes(taller_id);
CREATE INDEX idx_solicitudes_estado ON solicitudes(estado);
CREATE INDEX idx_servicios_taller ON servicios(taller_id);
CREATE INDEX idx_usuarios_taller ON usuarios_taller(taller_id);
CREATE INDEX idx_pagos_solicitud ON pagos(solicitud_id);
CREATE INDEX idx_turnos_taller ON turnos(taller_id);
