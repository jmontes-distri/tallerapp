import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Dashboard() {
  const router = useRouter()
  const [taller_id, setTaller_id] = useState(null)
  const [solicitudes, setSolicitudes] = useState([])
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSolicitud, setSelectedSolicitud] = useState(null)
  const [cotizacion, setCotizacion] = useState('')
  const [filtro, setFiltro] = useState('pendiente')
  const [showCotizarModal, setShowCotizarModal] = useState(false)
  const [showClienteModal, setShowClienteModal] = useState(false)
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
  })
  const [activeTab, setActiveTab] = useState('solicitudes') // 'solicitudes' o 'clientes'

  useEffect(() => {
    const id = localStorage.getItem('taller_id')
    if (!id) {
      router.push('/login')
    } else {
      setTaller_id(id)
      fetchSolicitudes(id)
      fetchClientes(id)
    }
  }, [])

  const fetchSolicitudes = async (id) => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/solicitudes?taller_id=${id}`)
      setSolicitudes(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchClientes = async (id) => {
    try {
      const stored = localStorage.getItem(`clientes-${id}`)
      if (stored) {
        setClientes(JSON.parse(stored))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleAgregarCliente = () => {
    if (!nuevoCliente.nombre || !nuevoCliente.email || !nuevoCliente.telefono) {
      toast.error('Completa al menos nombre, email y teléfono')
      return
    }

    const clienteConId = {
      id: Date.now().toString(),
      ...nuevoCliente,
      fechaAgregado: new Date().toISOString(),
    }

    const clientesActualizados = [...clientes, clienteConId]
    setClientes(clientesActualizados)
    localStorage.setItem(`clientes-${taller_id}`, JSON.stringify(clientesActualizados))

    toast.success('Cliente agregado exitosamente')
    setShowClienteModal(false)
    setNuevoCliente({
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      ciudad: '',
    })
  }

  const handleEliminarCliente = (id) => {
    const clientesActualizados = clientes.filter(c => c.id !== id)
    setClientes(clientesActualizados)
    localStorage.setItem(`clientes-${taller_id}`, JSON.stringify(clientesActualizados))
    toast.success('Cliente eliminado')
  }

  const handleCotizar = async (solicitud_id) => {
    if (!cotizacion || cotizacion <= 0) {
      toast.error('Ingresa una cotización válida')
      return
    }

    try {
      await axios.put(`/api/solicitudes?taller_id=${taller_id}`, {
        id: solicitud_id,
        estado: 'cotizado',
        monto_cotizado: parseFloat(cotizacion),
      })

      toast.success('Cotización enviada')
      setShowCotizarModal(false)
      setCotizacion('')
      setSelectedSolicitud(null)
      fetchSolicitudes(taller_id)
    } catch (error) {
      toast.error('Error al enviar cotización')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('taller_id')
    localStorage.removeItem('taller_nombre')
    router.push('/login')
  }

  const solicitudesFiltradas = solicitudes.filter(s =>
    filtro === 'todos' || s.estado === filtro
  )

  if (!taller_id || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {localStorage.getItem('taller_nombre')}
            </h1>
            <p className="text-gray-600 text-sm">Panel de control</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('solicitudes')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'solicitudes'
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📋 Solicitudes
          </button>
          <button
            onClick={() => setActiveTab('clientes')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'clientes'
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            👥 Clientes ({clientes.length})
          </button>
        </div>

        {/* Tab: Solicitudes */}
        {activeTab === 'solicitudes' && (
          <>
            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-teal-600">{solicitudes.length}</div>
                <div className="text-gray-600 text-sm">Total de solicitudes</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-yellow-600">
                  {solicitudes.filter(s => s.estado === 'pendiente').length}
                </div>
                <div className="text-gray-600 text-sm">Por cotizar</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-blue-600">
                  {solicitudes.filter(s => s.estado === 'cotizado').length}
                </div>
                <div className="text-gray-600 text-sm">En espera de pago</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-green-600">
                  {solicitudes.filter(s => s.estado === 'completado').length}
                </div>
                <div className="text-gray-600 text-sm">Completados</div>
              </div>
            </div>

            {/* Filtros */}
            <div className="mb-6 flex gap-2">
              {['pendiente', 'cotizado', 'aceptado', 'completado', 'todos'].map(estado => (
                <button
                  key={estado}
                  onClick={() => setFiltro(estado)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filtro === estado
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {estado.charAt(0).toUpperCase() + estado.slice(1)}
                </button>
              ))}
            </div>

            {/* Tabla de solicitudes */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cliente</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contacto</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fecha solicitada</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {solicitudesFiltradas.length > 0 ? (
                    solicitudesFiltradas.map(solicitud => (
                      <tr key={solicitud.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {solicitud.cliente_nombre}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div>{solicitud.cliente_email}</div>
                          <div>{solicitud.cliente_telefono}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {solicitud.descripcion}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            solicitud.estado === 'pendiente'
                              ? 'bg-yellow-100 text-yellow-800'
                              : solicitud.estado === 'cotizado'
                              ? 'bg-blue-100 text-blue-800'
                              : solicitud.estado === 'aceptado'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {solicitud.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {format(new Date(solicitud.created_at), 'dd/MM/yyyy', { locale: es })}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {solicitud.estado === 'pendiente' && (
                            <button
                              onClick={() => {
                                setSelectedSolicitud(solicitud)
                                setShowCotizarModal(true)
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium"
                            >
                              Cotizar
                            </button>
                          )}
                          {solicitud.estado === 'cotizado' && (
                            <span className="text-teal-600 font-medium">
                              ${solicitud.monto_cotizado}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        No hay solicitudes con este estado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Tab: Clientes */}
        {activeTab === 'clientes' && (
          <>
            <div className="mb-6">
              <button
                onClick={() => setShowClienteModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                + Agregar cliente
              </button>
            </div>

            {clientes.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Teléfono</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ciudad</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {clientes.map(cliente => (
                      <tr key={cliente.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{cliente.nombre}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{cliente.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{cliente.telefono}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{cliente.ciudad || '-'}</td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleEliminarCliente(cliente.id)}
                            className="text-red-600 hover:text-red-700 font-medium"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500 mb-4">No hay clientes registrados</p>
                <button
                  onClick={() => setShowClienteModal(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Agregar primer cliente
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal: Agregar cliente */}
      {showClienteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Agregar nuevo cliente</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={nuevoCliente.nombre}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Nombre del cliente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={nuevoCliente.email}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="cliente@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  value={nuevoCliente.telefono}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, telefono: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="+54 9 11 XXXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input
                  type="text"
                  value={nuevoCliente.direccion}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, direccion: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Calle y número"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                <input
                  type="text"
                  value={nuevoCliente.ciudad}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, ciudad: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Tu ciudad"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowClienteModal(false)
                  setNuevoCliente({
                    nombre: '',
                    email: '',
                    telefono: '',
                    direccion: '',
                    ciudad: '',
                  })
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleAgregarCliente}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Agregar cliente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Cotización */}
      {showCotizarModal && selectedSolicitud && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Enviar cotización</h2>

            <div className="bg-gray-50 p-4 rounded mb-4">
              <p className="text-sm text-gray-600"><strong>Cliente:</strong> {selectedSolicitud.cliente_nombre}</p>
              <p className="text-sm text-gray-600"><strong>Solicitud:</strong> {selectedSolicitud.descripcion.substring(0, 50)}...</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monto cotizado ($)
              </label>
              <input
                type="number"
                value={cotizacion}
                onChange={(e) => setCotizacion(e.target.value)}
                placeholder="Ej: 5000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCotizarModal(false)
                  setSelectedSolicitud(null)
                  setCotizacion('')
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleCotizar(selectedSolicitud.id)}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Enviar cotización
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}