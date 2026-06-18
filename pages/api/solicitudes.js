export default async function handler(req, res) {
  const { taller_id } = req.query

  if (req.method === 'GET') {
    try {
      // Simulación: devuelve solicitudes guardadas en memoria
      return res.status(200).json([])
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'POST') {
    const {
      cliente_nombre,
      cliente_email,
      cliente_telefono,
      descripcion,
      servicio_id,
      fecha_preferida,
      hora_preferida,
    } = req.body

    try {
      // Simulación: guarda la solicitud localmente
      const solicitud = {
        id: Date.now().toString(),
        taller_id,
        cliente_nombre,
        cliente_email,
        cliente_telefono,
        descripcion,
        servicio_id: servicio_id || null,
        fecha_preferida,
        hora_preferida,
        estado: 'pendiente',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      return res.status(201).json(solicitud)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'PUT') {
    const { id, ...updates } = req.body

    try {
      const solicitud = {
        id,
        ...updates,
        updated_at: new Date().toISOString(),
      }

      return res.status(200).json(solicitud)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  res.status(405).json({ error: 'Método no permitido' })
}