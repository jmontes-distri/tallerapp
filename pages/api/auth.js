export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, email, contraseña, nombre, telefono, direccion, ciudad } = req.body

    try {
      if (action === 'login') {
        // Simulación: si es admin@test.com / 123 → funciona
        if (email === 'admin@test.com' && contraseña === '123') {
          return res.status(200).json({ 
            success: true, 
            taller: {
              id: 'taller-demo-123',
              nombre: 'Taller Demo',
              email: email,
              telefono: '1234567890',
              direccion: 'Calle 123',
            }
          })
        }
        return res.status(401).json({ error: 'Email o contraseña incorrecta' })
      }

      if (action === 'register') {
        // Simulación: siempre registra con éxito
        return res.status(201).json({ 
          success: true, 
          taller: {
            id: 'taller-' + Date.now(),
            nombre,
            email,
            telefono,
            direccion,
            ciudad,
          }
        })
      }

      return res.status(400).json({ error: 'Acción no válida' })
    } catch (error) {
      return res.status(500).json({ error: 'Error del servidor' })
    }
  }

  res.status(405).json({ error: 'Método no permitido' })
}