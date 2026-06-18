import { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function ClienteDemo() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    cliente_nombre: '',
    cliente_email: '',
    cliente_telefono: '',
    descripcion: '',
    servicio_id: '',
    fecha_preferida: '',
    hora_preferida: '',
  })

  const servicios = [
    { id: '1', nombre: 'Cambio de aceite - $2500' },
    { id: '2', nombre: 'Revisión general - $5000' },
    { id: '3', nombre: 'Reparación de frenos - $8000' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.cliente_nombre || !formData.cliente_email || !formData.cliente_telefono || !formData.descripcion) {
      toast.error('Completa todos los campos')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`/api/solicitudes?taller_id=demo-123`, {
        ...formData,
        taller_id: 'demo-123',
      })

      toast.success('¡Solicitud enviada exitosamente!')
      setFormData({
        cliente_nombre: '',
        cliente_email: '',
        cliente_telefono: '',
        descripcion: '',
        servicio_id: '',
        fecha_preferida: '',
        hora_preferida: '',
      })
    } catch (error) {
      toast.error('Error al enviar solicitud')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Solicita tu turno</h1>
          <p className="text-gray-600">Completa el formulario y recibirás una cotización</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b-2 border-teal-200 pb-2">
              Tus datos
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input
                type="text"
                name="cliente_nombre"
                value={formData.cliente_nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="cliente_email"
                value={formData.cliente_email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                name="cliente_telefono"
                value={formData.cliente_telefono}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="+54 9 11 XXXX-XXXX"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b-2 border-teal-200 pb-2">
              Tu solicitud
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de servicio
              </label>
              <select
                name="servicio_id"
                value={formData.servicio_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map(servicio => (
                  <option key={servicio.id} value={servicio.id}>
                    {servicio.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Describe qué servicio necesitas..."
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha preferida
                </label>
                <input
                  type="date"
                  name="fecha_preferida"
                  value={formData.fecha_preferida}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora preferida
                </label>
                <input
                  type="time"
                  name="hora_preferida"
                  value={formData.hora_preferida}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            {loading ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      </div>
    </div>
  )
}