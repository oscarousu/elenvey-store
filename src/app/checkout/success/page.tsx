'use client';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

function SuccessContent() {
  const clearCart = useCartStore((state) => state.clearCart);
  const searchParams = useSearchParams();

  const orderId = searchParams.get('order_id') || searchParams.get('external_reference') || 'ELENVEY-' + Math.floor(1000 + Math.random() * 9000);
  const paymentId = searchParams.get('payment_id') || searchParams.get('collection_id') || '';
  const customerName = searchParams.get('customer_name') || 'Cliente';
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573187238021';

  useEffect(() => {
    // Vaciar el carrito en el navegador tras pago confirmado
    clearCart();
  }, [clearCart]);

  // Mensaje pre-redactado para WhatsApp
  const whatsappMessage = encodeURIComponent(
    `Hola Elenvey 🌿! Acabo de pagar mi pedido #${orderId} por MercadoPago.\n\n` +
    `• Nombre: ${customerName}\n` +
    (paymentId ? `• Ref. MercadoPago: ${paymentId}\n` : '') +
    `Quedo muy atento a la confirmación y al número de guía de mi despacho. ¡Muchas gracias!`
  );

  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  return (
    <main className="container" style={{ padding: '4.5rem 1rem 7rem', maxWidth: '720px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: '#FCFCFC',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        boxShadow: 'var(--shadow-card)'
      }}>
        {/* Icono de Check Artesanal */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(47, 111, 78, 0.12)',
          color: '#2F6F4E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '1.8rem'
        }}>
          ✓
        </div>

        <span className="eyebrow-tag" style={{ justifyContent: 'center', color: '#2F6F4E' }}>
          TRANSACCIÓN APROBADA · MERCADOPAGO
        </span>

        <h1 style={{ fontSize: '2.8rem', marginTop: '0.6rem', marginBottom: '1rem', lineHeight: '1.15' }}>
          ¡Gracias por valorar el arte hecho a mano!
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 2.5rem' }}>
          Hola <strong>{customerName}</strong>, tu pago ha sido procesado de forma segura. Tu pedido ya está registrado en nuestro taller para comenzar su preparación cuidadosa.
        </p>

        {/* Ficha de Detalles de la Orden */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem 1.8rem',
          textAlign: 'left',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          fontSize: '0.92rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Número de Pedido Elenvey:</span>
            <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>#{orderId}</strong>
          </div>

          {paymentId && (
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>ID de Pago MercadoPago:</span>
              <span style={{ color: 'var(--text-muted)' }}>{paymentId}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Estado:</span>
            <span style={{ color: '#2F6F4E', fontWeight: 600 }}>Aprobado & Registrado</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Empaque:</span>
            <span>Caja ecológica 100% libre de plásticos</span>
          </div>
        </div>

        {/* Botón Principal de WhatsApp */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              padding: '1rem 2.2rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.92rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              boxShadow: '0 6px 20px rgba(37, 211, 102, 0.3)',
              width: '100%',
              maxWidth: '420px',
              transition: 'transform var(--transition-fast), background-color var(--transition-fast)'
            }}
          >
            <span>💬 Notificar Pedido por WhatsApp</span>
            <span style={{ fontSize: '1.1rem' }}>↗</span>
          </a>

          <Link href="/" className="btn-secondary" style={{ width: '100%', maxWidth: '420px' }}>
            Volver a la Tienda
          </Link>
        </div>

        {/* Qué sigue */}
        <div style={{ marginTop: '3rem', paddingTop: '1.8rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.6rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
            ¿Qué sucede a continuación?
          </h3>
          <p style={{ lineHeight: '1.6', marginBottom: '0.4rem' }}>
            1. <strong>Preparación:</strong> Si tu pieza es de stock, se empaca de inmediato; si es por encargo, comenzamos el anudado manual con hilos de algodón peinado.
          </p>
          <p style={{ lineHeight: '1.6' }}>
            2. <strong>Despacho:</strong> Apenas entreguemos tu paquete a la transportadora, te compartiremos el número de guía a tu WhatsApp y correo.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <p>Cargando confirmación de compra...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
