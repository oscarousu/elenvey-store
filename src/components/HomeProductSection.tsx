'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface Props {
  products: Product[];
}

export default function HomeProductSection({ products }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedId, setAddedId] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const categories = [
    { id: 'all', label: 'Todas las Piezas' },
    { id: 'Macramé Mural', label: 'Macramé Mural' },
    { id: 'Decoración Textil', label: 'Decoración' },
    { id: 'Pulseras & Joyería', label: 'Pulseras & Joyería' },
    { id: 'Indumentaria Artesanal', label: 'Indumentaria' },
    { id: 'Accesorios Textiles', label: 'Accesorios' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory || (selectedCategory === 'Macramé Mural' && p.category?.toLowerCase().includes('macramé')));

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="featured-section">
      <div className="container">
        {/* Encabezado de la Sección */}
        <div className="section-header">
          <span className="eyebrow-tag">COLECCIÓN DE AUTOR</span>
          <h2 className="section-title">Piezas con Alma & Textura</h2>
          <p className="section-subtitle">
            Cada creación es elaborada manualmente con hilos de algodón seleccionados, honrando la imperfección perfecta del arte textil.
          </p>

          {/* Filtros de Categorías */}
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cuadrícula de Productos */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card group">
              <Link href={`/product/${product.id}`} className="product-card-link">
                <div className="product-card-image-box">
                  {product.is_unique ? (
                    <span className="badge badge-unique product-card-badge">
                      Pieza Única
                    </span>
                  ) : (
                    <span className="badge badge-craft product-card-badge">
                      Hecho a Mano
                    </span>
                  )}

                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={600}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />

                  {/* Botón flotante de compra rápida */}
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className={`quick-add-btn ${addedId === product.id ? 'added' : ''}`}
                    aria-label={`Añadir ${product.name} al carrito`}
                  >
                    {addedId === product.id ? (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>¡Agregado!</span>
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M5 12h14"></path>
                        </svg>
                        <span>Añadir al Carrito</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="product-card-info">
                  <span className="product-card-category">{product.category || 'Artesanía'}</span>
                  <h3 className="product-card-title">{product.name}</h3>
                  <div className="product-card-price">
                    ${Number(product.price).toLocaleString('es-CO')} <span>COP</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <p>No se encontraron piezas en esta categoría por el momento.</p>
          </div>
        )}

        {/* Enlace al Catálogo Completo */}
        <div className="section-cta-wrap">
          <Link href="/catalog" className="btn-secondary">
            Ver Catálogo Completo ({products.length} Piezas) →
          </Link>
        </div>
      </div>
    </section>
  );
}
