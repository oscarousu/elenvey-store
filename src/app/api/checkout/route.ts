import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { supabase } from '@/lib/supabase/client';
import { ShippingInfo } from '@/types';

export async function POST(req: Request) {
  try {
    const { items, shippingInfo } = (await req.json()) as {
      items: Array<{ id: string; name: string; quantity: number; price: number }>;
      shippingInfo: ShippingInfo;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'El carrito no contiene artículos.' }, { status: 400 });
    }

    if (!shippingInfo || !shippingInfo.user_email || !shippingInfo.customer_name) {
      return NextResponse.json({ error: 'Faltan datos de envío obligatorios.' }, { status: 400 });
    }

    // Calcular monto total
    const totalAmount = items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

    // 1. Guardar la orden en Supabase (con ID resiliente)
    let orderId = `elenvey_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    try {
      const { data: dbOrder, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: shippingInfo.customer_name,
          user_email: shippingInfo.user_email,
          user_phone: shippingInfo.user_phone,
          shipping_address: shippingInfo.shipping_address,
          shipping_city: shippingInfo.shipping_city,
          shipping_department: shippingInfo.shipping_department,
          notes: shippingInfo.notes || null,
          status: 'pending',
          total_amount: totalAmount,
        })
        .select('id')
        .single();

      if (!orderError && dbOrder) {
        orderId = dbOrder.id;

        // Registrar los productos asociados a la orden
        const orderItems = items.map((item) => ({
          order_id: orderId,
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price_at_time: Number(item.price),
        }));

        await supabase.from('order_items').insert(orderItems);
      }
    } catch (dbErr) {
      console.warn('Nota: Creación de orden en base de datos continuará con fallback local:', dbErr);
    }

    // 2. Configurar MercadoPago
    const accessToken = process.env.MP_ACCESS_TOKEN || '';
    if (!accessToken || accessToken === 'AQUI_TU_ACCESS_TOKEN') {
      return NextResponse.json({
        error: 'El token de MercadoPago no está configurado en el servidor.',
      }, { status: 500 });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    // Separar nombre y apellido para MercadoPago
    const nameParts = (shippingInfo.customer_name || 'Cliente').trim().split(' ');
    const firstName = nameParts[0] || 'Cliente';
    const lastName = nameParts.slice(1).join(' ') || 'Elenvey';

    // Formatear items para MP
    const mpItems = items.map((item) => ({
      id: item.id,
      title: item.name,
      quantity: Number(item.quantity),
      unit_price: Number(item.price),
      currency_id: 'COP',
    }));

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // 3. Crear preferencia de pago oficial en MercadoPago
    const response = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name: firstName,
          surname: lastName,
          email: shippingInfo.user_email,
          phone: {
            area_code: '57',
            number: (shippingInfo.user_phone || '').replace(/\D/g, '').slice(-10),
          },
          address: {
            street_name: `${shippingInfo.shipping_address}, ${shippingInfo.shipping_city}, ${shippingInfo.shipping_department}`,
            zip_code: '',
          },
        },
        back_urls: {
          success: `${origin}/checkout/success`,
          failure: `${origin}/checkout/failure`,
          pending: `${origin}/checkout/pending`,
        },
        ...(origin.startsWith('https://') ? { auto_return: 'approved' as const } : {}),
        external_reference: String(orderId),
        statement_descriptor: 'ELENVEY',
        metadata: {
          order_id: String(orderId),
          city: shippingInfo.shipping_city,
          department: shippingInfo.shipping_department,
        },
      },
    });

    // Retornar punto de inicio oficial
    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
      order_id: orderId,
    });
  } catch (error: any) {
    console.error('Error detallado en checkout de MercadoPago:', error);
    return NextResponse.json({
      error: error?.message || 'Error al conectar con la pasarela de MercadoPago.',
    }, { status: 500 });
  }
}
