'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.cartQuantity, 0);

  return (
    <>
      {/* Barra de anuncio superior */}
      <div className="announcement-bar">
        <span>🌿 Envíos a toda Colombia</span>
        <span className="announcement-bullet">●</span>
        <span>Piezas únicas hechas a mano</span>
        <span className="announcement-bullet">●</span>
        <span>100% Algodón Crudo & Fibras Naturales</span>
      </div>

      {/* Navegación Principal */}
      <nav className="main-nav">
        <div className="container nav-content">
          <Link href="/" className="nav-logo-link" aria-label="Elenvey Inicio">
            <Image 
              src="/logo/elenvey-logo-horizontal.svg" 
              alt="Elenvey · Anudado con el Alma" 
              width={240} 
              height={50} 
              priority
              style={{ height: '48px', width: 'auto' }}
            />
          </Link>

          {/* Enlaces de escritorio */}
          <div className="nav-links">
            <Link 
              href="/" 
              className={`nav-link-item ${pathname === '/' ? 'active' : ''}`}
            >
              Inicio
            </Link>
            <Link 
              href="/catalog" 
              className={`nav-link-item ${pathname.startsWith('/catalog') ? 'active' : ''}`}
            >
              Catálogo
            </Link>
            <Link 
              href="/about" 
              className={`nav-link-item ${pathname === '/about' ? 'active' : ''}`}
            >
              Nosotros
            </Link>
            <Link href="/cart" className="nav-cart-btn" aria-label="Ver Carrito de Compras">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>Carrito</span>
              {mounted && totalItems > 0 && (
                <span className="cart-counter">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
