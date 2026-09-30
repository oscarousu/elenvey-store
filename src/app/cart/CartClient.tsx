'use client';

import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShippingInfo } from '@/types';
import './cart.css';

const COLOMBIA_DEPARTMENTS = [
  'Antioquia', 'Bogotá D.C.', 'Cundinamarca', 'Valle del Cauca', 'Santander',
  'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Cauca', 'Cesar', 'Córdoba',
  'Huila', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Quindío',
  'Risaralda', 'Tolima', 'Amazonas', 'Arauca', 'Caquetá', 'Casanare', 'Chocó',
  'Guainía', 'Guaviare', 'La Guajira', 'Putumayo', 'San Andrés y Providencia',
  'Sucre', 'Vaupés', 'Vichada'
];

export default function CartClient() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [shipping, setShipping] = useState<ShippingInfo>({
    customer_name: '',
    user_email: '',
    user_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_department: 'Antioquia',
    notes: '',
  });

  useEffect(() => {
    setMounted(true);
    // Recuperar datos guardados si existen
    const saved = localStorage.getItem('elenvey_shipping_info');
    if (saved) {
      try {
        setShipping(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  if (!mounted) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
        <p>Cargando tu santuario de compras...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1rem', maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.2rem' }}>🌿</div>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>Tu carrito está esperando por ti</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
          Aún no has agregado ninguna creación a tu pedido. Explora nuestras piezas textiles únicas hechas a mano.
        </p>
        <Link href="/catalog" className="btn-primary">
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  const validateForm = (): boolean => {
    if (!shipping.customer_name.trim()) {
      setFormError('Por favor ingresa tu nombre y apellido.');
      return false;
    }
    if (!shipping.user_phone.trim() || shipping.user_phone.trim().length < 7) {
      setFormError('Por favor ingresa un número de teléfono/WhatsApp válido.');
      return false;
    }
    if (!shipping.user_email.trim() || !shipping.user_email.includes('@')) {
      setFormError('Por favor ingresa un correo electrónico válido.');
      return false;
    }
    if (!shipping.shipping_city.trim()) {
      setFormError('Por favor ingresa tu ciudad o municipio de entrega.');
      return false;
    }
    if (!shipping.shipping_address.trim()) {
      setFormError('Por favor ingresa tu dirección completa (calle, número, apto/barrio).');
      return false;
    }
    return true;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setFormError(null);

    // Guardar para conveniencia del cliente
    localStorage.setItem('elenvey_shipping_info', JSON.stringify(shipping));

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.cartQuantity,
            price: item.price
          })),
          shippingInfo: shipping,
        })
      });

      const data = await response.json();

      if (data.init_point) {
        // Redirigir a MercadoPago oficial
        window.location.href = data.init_point;
      } else {
        setFormError(data.error || 'Hubo un error al preparar el checkout con MercadoPago.');
      }
    } catch (error) {
      console.error(error);
      setFormError('Hubo un error de conexión al procesar el pago.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-layout">
      {/* Columna Izquierda: Artículos + Formulario de Envío */}
      <div className="cart-items-section">
        {/* Lista de Artículos */}
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.2rem', fontFamily: 'var(--font-serif)' }}>
            1. Tus Obras Seleccionadas ({items.length})
          </h2>

          <div className="cart-items-list">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <Image src={item.image_url} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>
                
                <div className="cart-item-info">
                  <div>
                    <span className="eyebrow-tag" style={{ fontSize: '0.65rem' }}>{item.category || 'Artesanía Textil'}</span>
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">${Number(item.price).toLocaleString('es-CO')} COP</p>
                  </div>
                  
                  <div className="cart-actions">
                    <div className="qty-control">
                      <label htmlFor={`qty-${item.id}`}>Cant:</label>
                      <input 
                        id={`qty-${item.id}`}
                        type="number" 
                        min="1" 
                        max={item.stock || 10} 
                        value={item.cartQuantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="qty-input"
                      />
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="remove-btn"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario de Despacho en Colombia */}
        <div className="shipping-form-box">
          <div className="shipping-header">
            <span className="eyebrow-tag">ENTREGA SEGURA EN COLOMBIA</span>
            <h2>2. Datos de Envío & Destinatario</h2>
            <p>Necesitamos estos datos para coordinar la transportadora y enviarte el número de guía.</p>
          </div>

          {formError && (
            <div className="error-banner">
              <span>⚠️</span>
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleCheckout} id="checkout-form">
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="customer_name">Nombre y Apellidos *</label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  placeholder="Ej: Valentina Gómez"
                  value={shipping.customer_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user_phone">Celular / WhatsApp *</label>
                <input
                  type="tel"
                  id="user_phone"
                  name="user_phone"
                  placeholder="Ej: 310 123 4567"
                  value={shipping.user_phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="user_email">Correo Electrónico (para comprobante) *</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                placeholder="ejemplo@correo.com"
                value={shipping.user_email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="shipping_department">Departamento *</label>
                <select
                  id="shipping_department"
                  name="shipping_department"
                  value={shipping.shipping_department}
                  onChange={handleInputChange}
                  required
                >
                  {COLOMBIA_DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="shipping_city">Ciudad o Municipio *</label>
                <input
                  type="text"
                  id="shipping_city"
                  name="shipping_city"
                  placeholder="Ej: Medellín o Bogotá"
                  value={shipping.shipping_city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="shipping_address">Dirección Completa de Entrega *</label>
              <input
                type="text"
                id="shipping_address"
                name="shipping_address"
                placeholder="Ej: Calle 10 # 43E-12, Apto 402, Barrio El Poblado"
                value={shipping.shipping_address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Instrucciones Adicionales (Opcional)</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Ej: Dejar en portería, timbre que no funciona, o solicitar empaque de regalo..."
                value={shipping.notes || ''}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      </div>

      {/* Columna Derecha: Resumen del Pedido & CTA Fijo */}
      <div className="cart-summary">
        <h2>Resumen del Pedido</h2>
        
        <div className="summary-row">
          <span>Subtotal obras:</span>
          <span>${getTotal().toLocaleString('es-CO')} COP</span>
        </div>

        <div className="summary-row">
          <span>Envío nacional:</span>
          <span style={{ color: 'var(--accent-sage-dark)', fontWeight: 500 }}>A coordinar / Por cobrar</span>
        </div>

        <div className="summary-row summary-total">
          <span>Total a pagar:</span>
          <span>${getTotal().toLocaleString('es-CO')} COP</span>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button 
            type="submit"
            form="checkout-form"
            className="btn-primary" 
            disabled={loading}
            style={{ width: '100%', opacity: loading ? 0.75 : 1, padding: '1.05rem 1.5rem' }}
          >
            {loading ? 'Preparando Pago Seguro...' : 'Pagar con MercadoPago ↗'}
          </button>
        </div>

        <div className="checkout-guarantee">
          <div className="guarantee-item">
            <span>🔒</span>
            <span>Pago protegido con MercadoPago (Tarjetas, PSE, Nequi, Bancolombia o Efecty).</span>
          </div>
          <div className="guarantee-item">
            <span>🌿</span>
            <span>Empaque de algodón y cartón reciclable sin plásticos de un solo uso.</span>
          </div>
          <div className="guarantee-item">
            <span>💬</span>
            <span>Confirmación directa por WhatsApp tras el pago con número de guía.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
