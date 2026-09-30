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
  metadataBase: new URL("https://elenvey-store.vercel.app"),
  title: {
    default: "Elenvey · Anudado con el Alma | Macramé & Arte Textil Contemporáneo",
    template: "%s | Elenvey",
  },
  description: "Santuario de arte textil contemporáneo, macramé minimalista y piezas únicas de autor elaboradas a mano con fibras 100% naturales en Colombia. Envíos a todo el país.",
  keywords: [
    "macramé colombia",
    "arte textil contemporáneo",
    "decoración japandi",
    "tapices de pared artesanales",
    "macramé minimalista",
    "elenvey",
    "anudado con el alma",
    "hecho a mano colombia",
    "comprar macrame medellin bogota"
  ],
  authors: [{ name: "Elenvey" }],
  creator: "Elenvey",
  publisher: "Elenvey",
  alternates: {
    canonical: "https://elenvey-store.vercel.app",
  },
  openGraph: {
    title: "Elenvey · Anudado con el Alma | Macramé & Arte Textil",
    description: "Artesanía textil contemporánea, macramé minimalista y piezas únicas de autor en fibras naturales. Envíos a toda Colombia y compras 100% seguras.",
    url: "https://elenvey-store.vercel.app",
    siteName: "Elenvey",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/images/og-elenvey.jpg",
        width: 1200,
        height: 630,
        alt: "Elenvey · Anudado con el Alma - Macramé Minimalista en Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elenvey · Anudado con el Alma",
    description: "Artesanía textil contemporánea y macramé minimalista hecho a mano en Colombia.",
    images: ["/images/og-elenvey.jpg"],
  },
  icons: {
    icon: "/logo/elenvey-isotype.svg",
    apple: "/logo/elenvey-isotype.svg",
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
