import Image from "next/image";
import Link from "next/link";
import "./page.css";
import { getSafeDbProducts } from "@/lib/curatedProducts";
import HomeProductSection from "@/components/HomeProductSection";

export const revalidate = 60;

export default async function Home() {
  const allProducts = await getSafeDbProducts();

  return (
    <main className="home-wrapper">
      {/* =========================================
          HERO SECTION - WARM MINIMALISM
          ========================================= */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Columna de Texto Editorial */}
          <div className="hero-editorial anim-fade-in-up">
            <span className="eyebrow-tag">ARTE TEXTIL & SLOW LIVING · HECHO EN COLOMBIA</span>
            <h1 className="hero-title">
              La serenidad de lo esencial, <span className="title-italic">anudada con el alma.</span>
            </h1>
            <p className="hero-description">
              Tapices murales de macramé, piezas de diseño y joyería textil creadas a mano con fibras de algodón 100% natural. Cada nudo es una historia de paciencia, calidez y armonía para tu hogar.
            </p>

            <div className="hero-actions">
              <Link href="/catalog" className="btn-primary">
                <span>Explorar Colección</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <Link href="/about" className="btn-secondary">
                Nuestra Historia
              </Link>
            </div>

            {/* Micro-insignias de confianza */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <span className="trust-dot"></span>
                <span>Fibras 100% naturales</span>
              </div>
              <div className="trust-item">
                <span className="trust-dot"></span>
                <span>Piezas únicas y bajo pedido</span>
              </div>
              <div className="trust-item">
                <span className="trust-dot"></span>
                <span>Envíos a todo el país</span>
              </div>
            </div>
          </div>

          {/* Columna Visual / Hero Showcase */}
          <div className="hero-visual anim-fade-in-up anim-delay-1">
            <div className="hero-main-card">
              <div className="hero-image-wrap">
                <Image
                  src="/images/feed_fullbleed/foto_13_gran_tapiz_macrame.jpg"
                  alt="Tapiz Macramé Monumental Elenvey"
                  width={680}
                  height={800}
                  priority
                  className="hero-img"
                />
              </div>

              {/* Badge flotante animada */}
              <div className="floating-badge-card">
                <div className="floating-badge-icon">🌿</div>
                <div>
                  <p className="floating-badge-label">Artesanía de Autor</p>
                  <p className="floating-badge-detail">Algodón Crudo & Madera Nativa</p>
                </div>
              </div>

              {/* Mini tarjeta flotante de detalle táctil */}
              <div className="floating-detail-card">
                <div className="mini-thumb">
                  <Image
                    src="/images/feed_fullbleed/foto_12_brazalete_micro_macrame.jpg"
                    alt="Detalle de joyería micro-macramé"
                    width={90}
                    height={90}
                  />
                </div>
                <div className="mini-content">
                  <p className="mini-tag">Micro-Macramé</p>
                  <p className="mini-title">Precisión milimétrica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          LOS CUATRO PILARES DE MARCA (MANIFIESTO)
          ========================================= */}
      <section className="pillars-section">
        <div className="container">
          <div className="pillars-header">
            <span className="eyebrow-tag">NUESTRA ESENCIA</span>
            <h2 className="pillars-main-title">Paciencia, textura y diseño consciente</h2>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <span className="pillar-num">01</span>
              <h3 className="pillar-title">Fibras Nobles</h3>
              <p className="pillar-desc">
                Seleccionamos hilos de algodón peinado 100% natural, lino crudo y maderas recuperadas sin barnices tóxicos ni procesos industriales invasivos.
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-num">02</span>
              <h3 className="pillar-title">Paciencia Manual</h3>
              <p className="pillar-desc">
                Rechazamos la prisa de la producción masiva. Cada tapiz o pulsera requiere horas o días de anudado manual punto por punto.
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-num">03</span>
              <h3 className="pillar-title">Piezas con Alma</h3>
              <p className="pillar-desc">
                Creaciones de edición limitada o piezas únicas pensadas para vestir paredes frías y convertirlas en rincones de paz y contemplación.
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-num">04</span>
              <h3 className="pillar-title">Empaque Consciente</h3>
              <p className="pillar-desc">
                Cada pedido viaja en cajas reciclables libres de plásticos, acompañado de notas personalizadas y suave aroma botánico natural.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          COLECCIÓN DINÁMICA & FILTROS INTERACTIVOS
          ========================================= */}
      <HomeProductSection products={allProducts} />

      {/* =========================================
          STORYTELLING / LIFESTYLE IN-SITU
          ========================================= */}
      <section className="story-section">
        <div className="container story-grid">
          <div className="story-image-box">
            <Image
              src="/images/feed_fullbleed/foto_01_atrapasuenos_7chakras.jpg"
              alt="Atrapasueños Sagrado Elenvey en ambiente minimalista"
              width={640}
              height={700}
              className="story-image"
            />
            <div className="story-image-tag">
              <span>Rincón de Sosiego · Casa Elenvey</span>
            </div>
          </div>

          <div className="story-content">
            <span className="eyebrow-tag">EL ARTE DE HABITAR CON CALMA</span>
            <h2 className="story-title">
              En un mundo apresurado, nosotros elegimos la lentitud del hilo.
            </h2>
            <p className="story-paragraph">
              Creemos firmemente que una casa no se llena de objetos, se viste de sensaciones. Un tapiz de macramé en tu pared o una pulsera tejida en tu muñeca es un recordatorio tangible de respirar, bajar el ritmo y reconectar con lo esencial y lo humano.
            </p>
            <p className="story-paragraph">
              Nacimos en Colombia con la firme convicción de que la artesanía no pertenece al pasado, sino al futuro del diseño con propósito y respeto por la materia prima.
            </p>

            <div className="story-signature">
              <p className="signature-quote">“Tejer es orar con las manos.”</p>
              <Link href="/about" className="story-link">
                Conoce más sobre nuestra filosofía y taller →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          INSTAGRAM LIFESTYLE SHOWCASE
          ========================================= */}
      <section className="instagram-section">
        <div className="container">
          <div className="instagram-header">
            <span className="eyebrow-tag">COMUNIDAD & PROCESO</span>
            <h2 className="instagram-title">Historias desde el taller</h2>
            <a 
              href="https://www.instagram.com/elenvey_creaciones/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="instagram-handle-link"
            >
              @elenvey_creaciones ↗
            </a>
          </div>

          <div className="instagram-grid">
            <a 
              href="https://www.instagram.com/elenvey_creaciones/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="insta-item group"
            >
              <Image 
                src="/images/feed_fullbleed/foto_03_bandana_margaritas_playa.jpg" 
                alt="Bandana tejida Elenvey" 
                width={400} 
                height={400} 
              />
              <div className="insta-overlay">
                <span>Ver en Instagram ↗</span>
              </div>
            </a>

            <a 
              href="https://www.instagram.com/elenvey_creaciones/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="insta-item group"
            >
              <Image 
                src="/images/feed_fullbleed/foto_06_clutch_granny_squares.jpg" 
                alt="Clutch de mano artesanal Elenvey" 
                width={400} 
                height={400} 
              />
              <div className="insta-overlay">
                <span>Ver en Instagram ↗</span>
              </div>
            </a>

            <a 
              href="https://www.instagram.com/elenvey_creaciones/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="insta-item group"
            >
              <Image 
                src="/images/feed_fullbleed/foto_08_porta_termo_macrame.jpg" 
                alt="Porta termo macramé Elenvey" 
                width={400} 
                height={400} 
              />
              <div className="insta-overlay">
                <span>Ver en Instagram ↗</span>
              </div>
            </a>

            <a 
              href="https://www.instagram.com/elenvey_creaciones/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="insta-item group"
            >
              <Image 
                src="/images/feed_fullbleed/foto_10_salida_bano_macrame.jpg" 
                alt="Pieza de autor macramé Elenvey" 
                width={400} 
                height={400} 
              />
              <div className="insta-overlay">
                <span>Ver en Instagram ↗</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================
          EL CÍRCULO ELENVEY (NEWSLETTER PRIVADO)
          ========================================= */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <span className="eyebrow-tag" style={{ justifyContent: 'center' }}>EL CÍRCULO ELENVEY</span>
            <h2 className="newsletter-title">Acceso prioritario a piezas únicas</h2>
            <p className="newsletter-desc">
              Debido a su naturaleza manual, muchas de nuestras creaciones se producen en lotes de una sola pieza. Únete a nuestro boletín para enterarte antes que nadie de nuevos lanzamientos y reflexiones sobre vida serena.
            </p>

            <form className="newsletter-form" action="#">
              <input 
                type="email" 
                placeholder="Tu correo electrónico..." 
                className="newsletter-input" 
                required 
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.8rem' }}>
                Unirme
              </button>
            </form>
            <p className="newsletter-note">Cero spam. Solo belleza, calma y notas artesanales.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
