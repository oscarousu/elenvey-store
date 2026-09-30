'use client';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      className="btn-primary" 
      onClick={handleAdd}
      disabled={product.stock <= 0}
      style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
    >
      {product.stock <= 0 ? 'Agotado' : added ? '¡Agregado!' : 'Añadir al Carrito'}
    </button>
  );
}
