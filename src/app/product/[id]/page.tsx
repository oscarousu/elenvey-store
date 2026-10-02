import Image from "next/image";
import Link from "next/link";
import { getSafeDbProductById, CURATED_PRODUCTS } from "@/lib/curatedProducts";
import AddToCartButton from "@/components/AddToCartButton";
import "./product.css";

export const revalidate = 60;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getSafeDbProductById(resolvedParams.id);

  if (!product) {
    return (
      <main className="container not-found-wrapper">
        <span className="eyebrow-tag" style={{ justifyContent: 'center' }}>EXPLORAR ELENVEY</span>
        <h2>Pieza no encontrada</h2>
        <p>Es posible que esta pieza haya sido adquirida o reubicada en nuestro catálogo.</p>
        <Link href="/catalog" className="btn-primary" style={{ marginTop: '1.5rem' }}>
          Volver al Catálogo
        </Link>
      </main>
    );
  }

  const relatedProducts = CURATED_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <main className="product-page-wrapper">
      <div className="container">
        {/* Migas de Pan (Breadcrumbs) */}
        <nav className="breadcrumbs" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span className="separator">/</span>
          <Link href="/catalog">Catálogo</Link>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </nav>

        {/* Fila Principal de Detalle */}
        <div className="product-detail-grid">
          {/* Imagen Principal */}
          <div className="product-gallery-box">
            <div className="product-image-container">
              {product.is_unique ? (
                <span className="badge badge-unique detail-floating-badge">
                  Pieza Única
                </span>
              ) : (
                <span className="badge badge-craft detail-floating-badge">
                  Hecho a Mano
                </span>
              )}
              <Image 
                src={product.image_url} 
                alt={product.name} 
                width={800} 
                height={800} 
                priority
                className="main-image" 
              />
            </div>
            <div className="gallery-caption">
              <span>🌿 Algodón 100% natural hilado y anudado en Colombia</span>
            </div>
          </div>

          {/* Información y Compra */}
          <div className="product-info-panel">
            <span className="eyebrow-tag">{product.category || 'Artesanía Textil'}</span>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-price-row">
              <span className="price-value">${Number(product.price).toLocaleString('es-CO')}</span>
              <span className="price-currency">COP</span>
              <span className="price-note">· Impuestos incluidos</span>
            </div>

            <div className="product-story-desc">
              <p>{product.description}</p>
            </div>

            {/* Estado de Disponibilidad & Slow Craft Made-to-Order */}
            <div className="product-availability">
              <div className="avail-indicator">
                <span className="avail-dot"></span>
                <span className="avail-text">
                  {product.is_unique 
                    ? 'Pieza única de autor · Confeccionada y lista para despacho' 
                    : 'Pieza de autor · Elaborada bajo pedido exclusivamente para ti'}
                </span>
              </div>
            </div>

            {/* Tarjeta Informativa de Creación Consciente */}
            <div className="craft-timeline-card">
              <div className="timeline-header">
                <span className="timeline-icon">⏳</span>
                <div>
                  <strong className="timeline-title">Creación consciente por nuestra maestra artesana</strong>
                  <p className="timeline-desc">
                    {product.is_unique 
                      ? 'Esta obra ya fue tejida a mano con devoción. Se alista y empaca para despacho en 24-48 horas hábiles.' 
                      : 'Cada nudo se realiza pacientemente a mano tras tu compra. Tiempo de confección: 3 a 5 días hábiles antes del despacho nacional.'}
                  </p>
                </div>
              </div>
              <div className="timeline-perk-badge">
                <span>🌿 100% Hecho a Mano</span>
                <span className="badge-sep">·</span>
                <span>Cero sobreproducción</span>
                <span className="badge-sep">·</span>
                <span>Seguimiento por WhatsApp</span>
              </div>
            </div>

            {/* Botón de Carrito */}
            <AddToCartButton product={product} />

            {/* Puntos Clave de Confianza (SKILL.md) */}
            <div className="product-perks">
              <div className="perk-row">
                <span className="perk-icon">🧶</span>
                <div>
                  <strong>Hecho Bajo Pedido:</strong> Tu pieza no duerme en una bodega; nace exclusivamente para ti, cuidando cada detalle y la frescura de sus fibras.
                </div>
              </div>
              <div className="perk-row">
                <span className="perk-icon">📦</span>
                <div>
                  <strong>Envíos a toda Colombia:</strong> Despacho cuidadoso con número de seguimiento y seguro activo.
                </div>
              </div>
              <div className="perk-row">
                <span className="perk-icon">💳</span>
                <div>
                  <strong>Pago 100% Seguro:</strong> Procesado con cifrado bancario vía MercadoPago (Tarjetas, PSE, Nequi).
                </div>
              </div>
              <div className="perk-row">
                <span className="perk-icon">✨</span>
                <div>
                  <strong>Garantía Artesanal:</strong> Respaldamos la calidad de cada nudo y tejido de por vida.
                </div>
              </div>
            </div>

            {/* Acordeón de Cuidados & Materiales (SKILL.md Sec 8.4) */}
            <div className="product-accordion">
              <details className="accordion-item" open>
                <summary className="accordion-header">
                  <span>Materiales & Especificaciones</span>
                  <span className="accordion-arrow">↓</span>
                </summary>
                <div className="accordion-content">
                  <p>• <strong>Materia prima:</strong> Hilo de algodón crudo peinado 100% biodegradable.</p>
                  <p>• <strong>Soporte:</strong> Madera natural pulida o aro metálico según diseño.</p>
                  <p>• <strong>Técnica:</strong> Nudos planos, festón y alondra ejecutados a mano por nuestra artesana.</p>
                </div>
              </details>

              <details className="accordion-item">
                <summary className="accordion-header">
                  <span>Proceso de Creación & Despacho</span>
                  <span className="accordion-arrow">↓</span>
                </summary>
                <div className="accordion-content">
                  <p>• <strong>Tiempo de tejido:</strong> 3 a 5 días hábiles de anudado manual minucioso.</p>
                  <p>• <strong>Envíos nacionales:</strong> 2 a 4 días hábiles mediante Servientrega o Interrapidísimo.</p>
                  <p>• <strong>Acompañamiento personal:</strong> Te notificamos por WhatsApp cuando comencemos a tejer tu pieza y al momento de enviarla con foto previa.</p>
                </div>
              </details>

              <details className="accordion-item">
                <summary className="accordion-header">
                  <span>Cuidado de las Fibras</span>
                  <span className="accordion-arrow">↓</span>
                </summary>
                <div className="accordion-content">
                  <p>Sacudir periódicamente con plumero suave o secador con aire frío para remover partículas. En caso de mancha accidental, limpiar suavemente con un paño húmedo y jabón neutro. No lavar en lavadora.</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Piezas Relacionadas */}
        {relatedProducts.length > 0 && (
          <section className="related-section">
            <div className="related-header">
              <span className="eyebrow-tag">CONTINÚA EXPLORANDO</span>
              <h2 className="related-title">Otras Creaciones que te Podrían Gustar</h2>
            </div>
            <div className="product-grid" style={{ marginTop: '2rem' }}>
              {relatedProducts.map((rel) => (
                <Link href={`/product/${rel.id}`} key={rel.id} className="product-card group">
                  <div className="product-card-image-box">
                    {rel.is_unique && (
                      <span className="badge badge-unique product-card-badge">Pieza Única</span>
                    )}
                    <Image
                      src={rel.image_url}
                      alt={rel.name}
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="product-card-info">
                    <span className="product-card-category">{rel.category}</span>
                    <h3 className="product-card-title">{rel.name}</h3>
                    <div className="product-card-price">
                      ${Number(rel.price).toLocaleString('es-CO')} <span>COP</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Barra Flotante Adhesiva de Compra para Móviles (Conversion UX) */}
      <aside className="mobile-sticky-bar" aria-label="Acceso directo de compra rápida">
        <div className="mobile-sticky-info">
          <span className="mobile-sticky-title">{product.name}</span>
          <span className="mobile-sticky-price">
            ${Number(product.price).toLocaleString('es-CO')} <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>COP</span>
          </span>
        </div>
        <div className="mobile-sticky-cta">
          <AddToCartButton product={product} />
        </div>
      </aside>
    </main>
  );
}
