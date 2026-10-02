import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Nosotros & Filosofía | Elenvey Arte Textil',
  description: 'Conoce la historia, el proceso artesanal y la devoción por el macramé y las fibras naturales en Elenvey. Hecho a mano en Colombia.',
};

export default function AboutPage() {
  return (
    <main className="about-wrapper" style={{ padding: '3.5rem 0 7rem' }}>
      {/* Hero Editorial */}
      <section className="container" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto clamp(2.5rem, 5vw, 4.5rem)' }}>
        <span className="eyebrow-tag" style={{ justifyContent: 'center' }}>FILOSOFÍA & MANIFIESTO</span>
        <h1 style={{ fontSize: 'clamp(2.1rem, 6vw, 3.6rem)', marginTop: '0.8rem', marginBottom: '1.4rem', lineHeight: '1.15' }}>
          El santuario de la paciencia y el trabajo manual.
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          En una época regida por la inmediatez y lo desechable, <strong>Elenvey</strong> nace como una pausa. Un regreso consciente a la calidez de las manos, al silencio del taller y a la pureza del algodón crudo.
        </p>
      </section>

      {/* Galería Visual Lifestyle In-Situ */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)', aspectRatio: '4/5' }}>
            <Image 
              src="/images/feed_fullbleed/foto_13_gran_tapiz_macrame.jpg" 
              alt="Macramé monumental Elenvey" 
              width={600} 
              height={750} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)', aspectRatio: '4/5' }}>
            <Image 
              src="/images/feed_fullbleed/foto_01_atrapasuenos_7chakras.jpg" 
              alt="Tejido circular Elenvey" 
              width={600} 
              height={750} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)', aspectRatio: '4/5' }}>
            <Image 
              src="/images/feed_fullbleed/foto_12_brazalete_micro_macrame.jpg" 
              alt="Detalle de joyería micro macramé Elenvey" 
              width={600} 
              height={750} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Relato Narrativo Editorial */}
      <section className="container" style={{ maxWidth: '780px', margin: '0 auto 6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.1rem', lineHeight: '1.85', color: 'var(--text-secondary)' }}>
          <h2 style={{ fontSize: '2.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Nuestra Historia
          </h2>
          <p>
            Elenvey germinó en Colombia a partir de una profunda devoción por el arte textil tradicional: la capacidad infinita de una simple hebra de algodón para transformarse, a través de nudos pacientes, en una escultura viva cargada de serenidad y calidez.
          </p>
          <p>
            Detrás de cada pieza no hay una fábrica anónima ni cadenas de montaje industrial. Hay un solo par de manos: las de nuestra madre tejedora. En la intimidad de su taller en Colombia, cada obra es anudada con concentración absoluta, calibrando la tensión de cada cuerda y honrando la nobleza de las fibras naturales.
          </p>

          <div style={{ 
            backgroundColor: '#FAF8F5', 
            border: '1px solid #ECE7DF', 
            borderLeft: '4px solid var(--accent-color)', 
            padding: '2rem 2.2rem', 
            borderRadius: 'var(--radius-sm)',
            margin: '0.8rem 0'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
              El Arte de Crear Bajo Pedido (Slow Craft)
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.75', margin: 0 }}>
              Creemos firmemente en el consumo consciente y el respeto por los recursos naturales. Por eso, no almacenamos inventarios masivos en bodegas frías. Cada tapiz, atrapasueños o accesorio cobra vida <strong>únicamente cuando tú decides llevarlo a tu hogar</strong>. Dedicamos entre 3 y 5 días hábiles a confeccionar tu pieza exclusivamente para ti, garantizando que recibas una obra fresca, cuidada en cada nudo y elaborada con dedicación maternal.
            </p>
          </div>

          <blockquote style={{ 
            borderLeft: '2px solid var(--accent-color)', 
            paddingLeft: '1.8rem', 
            fontFamily: 'var(--font-serif)', 
            fontSize: '1.6rem', 
            fontStyle: 'italic', 
            color: 'var(--text-primary)',
            margin: '1.5rem 0'
          }}>
            “No buscamos la perfección geométrica de una máquina; buscamos la gracia sutil de la mano humana que respira en cada puntada.”
          </blockquote>
          <p>
            Al elegir una pieza de Elenvey, no solo adquieres una joya textil para vestir tu hogar; respaldas la artesanía familiar colombiana, la preservación de técnicas manuales y el compromiso de habitar espacios colmados de sosiego.
          </p>
        </div>
      </section>

      {/* Guía de Cuidado de las Fibras */}
      <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '5rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="eyebrow-tag" style={{ justifyContent: 'center' }}>GUÍA DE MANTENIMIENTO</span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '0.6rem' }}>Cómo cuidar tus piezas Elenvey</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.8rem' }}>
            <div style={{ backgroundColor: '#FCFCFC', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>✨</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>Limpieza Ligera</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Sacude tus tapices suavemente una vez al mes o pasa un plumero de microfibra para remover polvo ambiental.
              </p>
            </div>

            <div style={{ backgroundColor: '#FCFCFC', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>☀️</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>Luz Natural Difusa</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Prefiere ubicaciones con luz indirecta. El algodón natural sin químicos conserva su brillo y tono cálido lejos del sol abrasador.
              </p>
            </div>

            <div style={{ backgroundColor: '#FCFCFC', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>🌿</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>Humedad & Manchas</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                En caso de derrame, absorbe inmediatamente con un paño seco. Si es necesario, limpia con agua tibia y jabón neutro sin frotar con fuerza.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container" style={{ textAlign: 'center', marginTop: 'clamp(3.5rem, 6vw, 6rem)' }}>
        <h2 style={{ fontSize: 'clamp(1.9rem, 5.5vw, 2.6rem)', marginBottom: '1.2rem' }}>¿Listo para vestir tu hogar con calma?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
          Explora nuestras piezas disponibles o escríbenos para pedidos personalizados.
        </p>
        <Link href="/catalog" className="btn-primary">
          Ver Catálogo de Obras
        </Link>
      </section>
    </main>
  );
}
