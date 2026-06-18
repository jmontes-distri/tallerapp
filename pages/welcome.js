import Link from 'next/link'

export default function Welcome() {
  const demo_taller_id = 'demo-taller-123' // Para demostración

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-400">
      <div className="container mx-auto px-4 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            TallerApp
          </h1>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            La solución completa para gestionar tu taller. Recibe solicitudes de turno, envía cotizaciones y procesa pagos en un solo lugar.
          </p>
        </div>

        {/* Características principales */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Solicitudes de turno</h3>
            <p className="text-gray-600">Tus clientes pueden solicitar turnos directamente desde la app, sin complicaciones.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cotizaciones</h3>
            <p className="text-gray-600">Envía cotizaciones personalizadas y recibe confirmación cuando el cliente la acepte.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pagos seguros</h3>
            <p className="text-gray-600">Integración con MercadoPago y múltiples métodos de pago para mayor flexibilidad.</p>
          </div>
        </div>

        {/* Llamadas a acción */}
        <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
          <Link
            href="/login"
            className="bg-white text-teal-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition text-center"
          >
            Panel de talleres
          </Link>
          <Link
            href={`/?taller_id=${demo_taller_id}`}
            className="border-2 border-white text-white hover:bg-white hover:text-teal-600 font-bold py-4 px-8 rounded-lg transition text-center"
          >
            Ver demostración
          </Link>
        </div>

        {/* Información adicional */}
        <div className="mt-20 text-center text-white">
          <p className="text-lg mb-2">¿Eres cliente y necesitas solicitar un turno?</p>
          <p className="text-teal-100 text-sm">Pídele a tu taller que te compartir el link de TallerApp</p>
        </div>
      </div>
    </div>
  )
}
