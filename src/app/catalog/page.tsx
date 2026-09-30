import { getSafeDbProducts } from "@/lib/curatedProducts";
import HomeProductSection from "@/components/HomeProductSection";

export const revalidate = 60;

export const metadata = {
  title: "Catálogo Completo | Elenvey Arte Textil",
  description: "Explora nuestra colección completa de macramé, tapices murales, pulseras tejidas y piezas de autor hechas a mano en Colombia.",
};

export default async function CatalogPage() {
  const allProducts = await getSafeDbProducts();

  return (
    <main className="catalog-wrapper" style={{ padding: '3.5rem 0 6rem' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="eyebrow-tag" style={{ justifyContent: 'center' }}>TIENDA & ARCHIVO DE PIEZAS</span>
        <h1 style={{ fontSize: '3.2rem', marginTop: '0.6rem', marginBottom: '1rem' }}>
          Colección Completa Elenvey
        </h1>
        <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
          Obras textiles contemporáneas anudadas a mano con paciencia infinita. Disponibles para envío inmediato o elaboradas bajo pedido con medidas personalizadas.
        </p>
      </div>

      <HomeProductSection products={allProducts} />
    </main>
  );
}
