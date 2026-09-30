'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function FailureContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || '';
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573187238021';

  const whatsappMessage = encodeURIComponent(
    `Hola Elenvey 🌿! Tuve un problema al intentar pagar mi pedido ${orderId ? `#${orderId}` : ''} en la página web. ¿Podría pagar por Nequi o transferencia Bancolombia directamente?`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  return (
    <main className="container" style={{ padding: '4.5rem 1rem 7rem', maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{
        backgroundColor: '#FCFCFC',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '3.5rem 2rem',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(192, 57, 43, 0.12)',
          color: '#C0392B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '1.8rem'
        }}>
          ✕
        </div>

        <span className="eyebrow-tag" style={{ justifyContent: 'center', color: '#C0392B' }}>
          PAGO NO COMPLETADO
        </span>

        <h1 style={{ fontSize: '2.5rem', marginTop: '0.6rem', marginBottom: '1rem', lineHeight: '1.2' }}>
          El pago no pudo procesarse
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '2.2rem' }}>
          Es posible que tu tarjeta haya rechazado el débito o se haya interrumpido la comunicación con la entidad bancaria. Tus artículos siguen a salvo en tu carrito.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <Link href="/cart" className="btn-primary" style={{ width: '100%', maxWidth: '380px' }}>
            Intentar nuevamente desde el Carrito
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              padding: '0.85rem 1.8rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              width: '100%',
              maxWidth: '380px'
            }}
          >
            <span>💬 Pagar por Nequi o WhatsApp ↗</span>
          </a>

          <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Volver a la tienda
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutFailurePage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '5rem 0' }}>Cargando...</div>}>
      <FailureContent />
    </Suspense>
  );
}
