'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function PendingContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || '';
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573187238021';

  const whatsappMessage = encodeURIComponent(
    `Hola Elenvey 🌿! Acabo de generar el pago de mi pedido ${orderId ? `#${orderId}` : ''} por Efecty/Bancolombia en MercadoPago y está en proceso de validación. Quedo atento a la confirmación.`
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
          backgroundColor: 'rgba(230, 162, 60, 0.14)',
          color: '#E6A23C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '1.8rem'
        }}>
          ⏳
        </div>

        <span className="eyebrow-tag" style={{ justifyContent: 'center', color: '#E6A23C' }}>
          VALIDACIÓN EN CURSO
        </span>

        <h1 style={{ fontSize: '2.5rem', marginTop: '0.6rem', marginBottom: '1rem', lineHeight: '1.2' }}>
          Tu pago está en proceso
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '2.2rem' }}>
          Si seleccionaste pago en efectivo (Efecty) o transferencia diferida, tu pago tardará unas horas en acreditarse. Apenas MercadoPago lo confirme, comenzaremos el empaque de tu pedido.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
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
              padding: '0.9rem 1.8rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              width: '100%',
              maxWidth: '380px'
            }}
          >
            <span>💬 Avisar por WhatsApp ↗</span>
          </a>

          <Link href="/" className="btn-secondary" style={{ width: '100%', maxWidth: '380px' }}>
            Volver a la Tienda
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPendingPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '5rem 0' }}>Cargando...</div>}>
      <PendingContent />
    </Suspense>
  );
}
