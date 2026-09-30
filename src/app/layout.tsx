import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elenvey | Arte Textil, Macramé Minimalista & Piezas de Autor",
  description: "Santuario digital de artesanía textil contemporánea, macramé minimalista y accesorios creados a mano con fibras naturales en Colombia.",
  icons: {
    icon: "/logo/elenvey-isotype.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable}`}>
      <body>
        <Navbar />
        {children}
        <footer className="main-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <Image 
                  src="/logo/elenvey-logo-horizontal.svg" 
                  alt="Elenvey · Anudado con el Alma" 
                  width={220} 
                  height={48} 
                  style={{ height: '42px', width: 'auto' }} 
                />
                <p>
                  Santuario de arte textil contemporáneo, macramé minimalista y piezas únicas anudadas con el alma. Honramos la paciencia del trabajo manual y la calidez del hogar.
                </p>
              </div>

              <div>
                <h4 className="footer-heading">Colecciones</h4>
                <ul className="footer-links">
                  <li><Link href="/catalog">Macramé Mural</Link></li>
                  <li><Link href="/catalog">Pulseras & Joyería</Link></li>
                  <li><Link href="/catalog">Accesorios Textiles</Link></li>
                  <li><Link href="/catalog">Piezas de Autor</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="footer-heading">Filosofía</h4>
                <ul className="footer-links">
                  <li><Link href="/about">Sobre Elenvey</Link></li>
                  <li><Link href="/about">Cuidado de las Fibras</Link></li>
                  <li><Link href="/about">Slow Living</Link></li>
                  <li><Link href="/cart">Mi Carrito</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="footer-heading">Comunidad</h4>
                <ul className="footer-links">
                  <li>
                    <a href="https://www.instagram.com/elenvey_creaciones/" target="_blank" rel="noopener noreferrer">
                      Instagram @elenvey_creaciones ↗
                    </a>
                  </li>
                  <li><span style={{ color: 'var(--text-muted)' }}>Envíos seguros en Colombia</span></li>
                  <li><span style={{ color: 'var(--text-muted)' }}>Pagos protegidos vía MercadoPago</span></li>
                </ul>
              </div>
            </div>

            <div className="footer-legal-bar">
              <p className="copyright-main">&copy; {new Date().getFullYear()} Elenvey. Todos los derechos reservados.</p>
              <p>
                Diseños artesanales, fotografías, textos y composiciones visuales son propiedad intelectual exclusiva de Elenvey.
                <br />
                Prohibida su reproducción, copia o distribución sin autorización previa por escrito.
                <br />
                Hecho a mano en Colombia con dedicación y paciencia.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
