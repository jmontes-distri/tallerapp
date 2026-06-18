import axios from 'axios'
import { supabase } from '@/lib/supabase'

const mercadoPagoApiUrl = 'https://api.mercadopago.com/v1'
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, solicitud_id, monto, metodo_pago, email } = req.body

    try {
      if (action === 'crear-pago') {
        if (metodo_pago === 'mercadopago') {
          // Crear preferencia de pago en MercadoPago
          const preference = {
            items: [
              {
                title: `Cotización - Solicitud ${solicitud_id}`,
                quantity: 1,
                currency_id: 'ARS',
                unit_price: parseFloat(monto),
              }
            ],
            payer: {
              email: email,
            },
            back_urls: {
              success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pago-exitoso`,
              failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pago-fallido`,
              pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pago-pendiente`,
            },
            auto_return: 'approved',
          }

          const response = await axios.post(
            `${mercadoPagoApiUrl}/checkout/preferences`,
            preference,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              }
            }
          )

          // Guardar pago pendiente
          await supabase
            .from('pagos')
            .insert([
              {
                solicitud_id,
                monto,
                metodo_pago: 'mercadopago',
                estado: 'pendiente',
                referencia_pago: response.data.id,
              }
            ])

          return res.status(200).json({
            success: true,
            init_point: response.data.init_point,
            preference_id: response.data.id,
          })
        } else {
          // Para otros métodos, solo crear registro
          const { data, error } = await supabase
            .from('pagos')
            .insert([
              {
                solicitud_id,
                monto,
                metodo_pago,
                estado: 'pendiente',
              }
            ])
            .select()
            .single()

          if (error) throw error

          return res.status(201).json({ success: true, pago: data })
        }
      }

      if (action === 'verificar-pago') {
        // Verificar estado del pago
        const { data, error } = await supabase
          .from('pagos')
          .select('*')
          .eq('referencia_pago', req.body.payment_id)
          .single()

        if (error || !data) {
          return res.status(404).json({ error: 'Pago no encontrado' })
        }

        return res.status(200).json(data)
      }

      return res.status(400).json({ error: 'Acción no válida' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  res.status(405).json({ error: 'Método no permitido' })
}
