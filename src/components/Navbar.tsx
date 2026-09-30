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

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Bloquear scroll de fondo cuando el cajón móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const totalItems = items.reduce((acc, item) => acc + item.cartQuantity, 0);

  return (
    <>
      {/* Barra de anuncio superior adaptativa */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span>🌿 Envíos a toda Colombia</span>
          <span className="announcement-bullet">●</span>
          <span className="announcement-hide-mobile">Piezas únicas hechas a mano</span>
          <span className="announcement-bullet announcement-hide-mobile">●</span>
          <span className="announcement-hide-mobile">100% Algodón Crudo & Fibras Naturales</span>
          <span className="announcement-show-mobile">Piezas Hechas a Mano</span>
        </div>
      </div>

      {/* Navegación Principal */}
      <nav className="main-nav">
        <div className="container nav-content">
          {/* Botón hamburguesa (Solo en dispositivos móviles) */}
          <button 
            type="button"
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileMenuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Logotipo Oficial Elenvey */}
          <Link href="/" className="nav-logo-link" aria-label="Elenvey Inicio">
            <Image 
              src="/logo/elenvey-logo-horizontal.svg" 
              alt="Elenvey · Anudado con el Alma" 
              width={220} 
              height={46} 
              priority
              className="nav-logo-img"
            />
          </Link>

          {/* Enlaces de escritorio */}
          <div className="nav-links desktop-only">
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

          {/* Botón Carrito Móvil (Acceso ergonómico en la esquina superior derecha) */}
          <Link 
            href="/cart" 
            className="mobile-cart-btn" 
            aria-label={`Ver Carrito de Compras (${totalItems} artículos)`}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {mounted && totalItems > 0 && (
              <span className="cart-counter-badge">{totalItems}</span>
            )}
          </Link>
        </div>
      </nav>

      {/* Cajón de Navegación Móvil (Drawer Slide-Over) */}
      <div 
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      >
        <aside 
          className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal móvil"
        >
          <div className="drawer-header">
            <div className="drawer-brand">
              <span className="drawer-brand-name">E L E N V E Y</span>
              <span className="drawer-brand-sub">ARTE TEJIDO & HECHO A MANO</span>
            </div>
            <button 
              type="button"
              className="drawer-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className="drawer-nav">
            <Link 
              href="/" 
              className={`drawer-link ${pathname === '/' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="drawer-link-text">Inicio</span>
              <span className="drawer-arrow">→</span>
            </Link>
            <Link 
              href="/catalog" 
              className={`drawer-link ${pathname.startsWith('/catalog') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="drawer-link-text">Catálogo Completo</span>
              <span className="drawer-arrow">→</span>
            </Link>
            <Link 
              href="/about" 
              className={`drawer-link ${pathname === '/about' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="drawer-link-text">Nuestra Historia</span>
              <span className="drawer-arrow">→</span>
            </Link>
            <Link 
              href="/cart" 
              className={`drawer-link drawer-cart-highlight ${pathname === '/cart' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="drawer-link-text" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Tu Carrito</span>
                {mounted && totalItems > 0 && (
                  <span className="cart-counter">{totalItems}</span>
                )}
              </span>
              <span className="drawer-arrow">→</span>
            </Link>
          </nav>

          <div className="drawer-footer">
            <div className="drawer-assistance-card">
              <span className="drawer-card-tag">ATENCIÓN CÁLIDA</span>
              <p className="drawer-card-p">¿Deseas una pieza personalizada o asesoría en medidas?</p>
              <a 
                href="https://wa.me/573133866879?text=Hola%20Elenvey,%20quiero%20información%20sobre%20una%20pieza%20personalizada" 
                target="_blank" 
                rel="noopener noreferrer"
                className="drawer-wa-btn"
              >
                <span>💬 Escríbenos a WhatsApp</span>
              </a>
            </div>

            <div className="drawer-meta-info">
              <span>🇨🇴 Despachos a toda Colombia</span>
              <span>© 2026 Elenvey · Anudado con el alma</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
