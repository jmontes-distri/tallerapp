export default async function handler(req, res) {
  const { taller_id } = req.query

  if (req.method === 'GET') {
    try {
      // Simulación: devuelve servicios de ejemplo
      const servicios = [
        {
          id: '1',
          taller_id,
          nombre: 'Cambio de aceite',
          descripcion: 'Cambio de aceite y filtro',
          precio_estimado: 2500,
          tiempo_estimado_minutos: 30,
          activo: true,
        },
        {
          id: '2',
          taller_id,
          nombre: 'Revisión general',
          descripcion: 'Revisión completa del vehículo',
          precio_estimado: 5000,
          tiempo_estimado_minutos: 60,
          activo: true,
        },
        {
          id: '3',
          taller_id,
          nombre: 'Reparación de frenos',
          descripcion: 'Cambio de pastillas y revisión',
          precio_estimado: 8000,
          tiempo_estimado_minutos: 90,
          activo: true,
        },
      ]
      return res.status(200).json(servicios)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'POST') {
    const { nombre, descripcion, precio_estimado, tiempo_estimado_minutos } = req.body

    try {
      const servicio = {
        id: Date.now().toString(),
        taller_id,
        nombre,
        descripcion,
        precio_estimado,
        tiempo_estimado_minutos,
        activo: true,
      }

      return res.status(201).json(servicio)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  res.status(405).json({ error: 'Método no permitido' })
}