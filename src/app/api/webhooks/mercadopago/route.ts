import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    let paymentId: string | null = url.searchParams.get('data.id') || url.searchParams.get('id');

    // Si viene en el body JSON
    try {
      const body = await req.json();
      if (!paymentId && body?.data?.id) {
        paymentId = String(body.data.id);
      }
      if (!paymentId && body?.id) {
        paymentId = String(body.id);
      }
    } catch {
      // Body vacío o ya procesado
    }

    if (!paymentId) {
      // Responder 200 para que MercadoPago no reintente notificaciones vacías
      return NextResponse.json({ received: true, note: 'No payment ID detected' }, { status: 200 });
    }

    const accessToken = process.env.MP_ACCESS_TOKEN || '';
    if (!accessToken || accessToken === 'AQUI_TU_ACCESS_TOKEN') {
      console.warn('Webhook MP: Token no configurado.');
      return NextResponse.json({ received: true, warning: 'Token missing' }, { status: 200 });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const payment = new Payment(client);

    // Consultar el estado oficial del pago en MercadoPago
    const paymentInfo = await payment.get({ id: paymentId });

    if (paymentInfo && paymentInfo.external_reference) {
      const orderId = paymentInfo.external_reference;
      const status = paymentInfo.status; // 'approved', 'rejected', 'pending', 'cancelled'

      let orderStatus: 'paid' | 'pending' | 'cancelled' = 'pending';
      if (status === 'approved') {
        orderStatus = 'paid';
      } else if (status === 'rejected' || status === 'cancelled') {
        orderStatus = 'cancelled';
      }

      // Actualizar el estado de la orden en Supabase
      try {
        await supabase
          .from('orders')
          .update({
            status: orderStatus,
            mercadopago_id: String(paymentInfo.id),
          })
          .eq('id', orderId);

        // Si fue aprobado, actualizar stock de piezas únicas si aplica
        if (orderStatus === 'paid') {
          const { data: items } = await supabase
            .from('order_items')
            .select('product_id, quantity')
            .eq('order_id', orderId);

          if (items && items.length > 0) {
            for (const item of items) {
              try {
                await supabase.rpc('decrement_product_stock', {
                  p_id: item.product_id,
                  p_qty: item.quantity,
                });
              } catch {
                // RPC opcional si aún no está creada la función en Supabase
              }
            }
          }
        }
      } catch (dbErr) {
        console.warn('Webhook: Error actualizando Supabase:', dbErr);
      }
    }

    return NextResponse.json({ received: true, status: 'processed' }, { status: 200 });
  } catch (error: any) {
    console.error('Error procesando webhook de MercadoPago:', error);
    // Devolver 200 para evitar que MercadoPago reintente en bucle en caso de error interno
    return NextResponse.json({ received: true, error: error?.message }, { status: 200 });
  }
}

// Permitir verificación GET de MercadoPago
export async function GET(req: Request) {
  return NextResponse.json({ status: 'Webhook endpoint activo y funcionando' }, { status: 200 });
}
