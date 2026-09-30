import CartClient from './CartClient';

export const metadata = {
  title: 'Carrito | Elenvey',
};

export default function CartPage() {
  return (
    <main className="container" style={{ padding: 'var(--spacing-lg) var(--spacing-sm)' }}>
      <h1>Tu Carrito</h1>
      <CartClient />
    </main>
  );
}
