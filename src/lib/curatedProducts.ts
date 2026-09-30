import { Product } from "@/types";
import { supabase } from "./supabase/client";

export const CURATED_PRODUCTS: Product[] = [
  {
    id: "tapiz-mural-duna",
    name: "Tapiz Mural Monumental 'Duna'",
    description: "Pieza magistral de gran formato anudada con más de 400 metros de cordón de algodón crudo 100% natural sobre rama de madera pulida a mano. Su trama en cascada y nudos festón transmiten sosiego y serenidad a cualquier estancia.",
    price: 185000,
    image_url: "/images/feed_fullbleed/foto_13_gran_tapiz_macrame.jpg",
    stock: 1,
    is_unique: true,
    category: "Macramé Mural",
  },
  {
    id: "atrapasuenos-siete-chakras",
    name: "Atrapasueños Sagrado 'Siete Armonías'",
    description: "Composición circular con tejido concéntrico en algodón peinado natural, plumas artesanales tejidas e incrustaciones de cuentas minerales que evocan equilibrio y paz para el santuario del descanso.",
    price: 95000,
    image_url: "/images/feed_fullbleed/foto_01_atrapasuenos_7chakras.jpg",
    stock: 2,
    is_unique: true,
    category: "Decoración Textil",
  },
  {
    id: "brazalete-micro-macrame",
    name: "Brazalete Micro-Macramé 'Tierra Viva'",
    description: "Pulsera de micro-anudado de alta precisión en hilos encerados tonos tierra y terracota, adornada con cuentas doradas satinadas y piedras semipreciosas. Cierre deslizable adaptable y resistente.",
    price: 38000,
    image_url: "/images/feed_fullbleed/foto_12_brazalete_micro_macrame.jpg",
    stock: 6,
    is_unique: false,
    category: "Pulseras & Joyería",
  },
  {
    id: "mandala-estrella-pared",
    name: "Mandala Mural 'Constelación'",
    description: "Estructura geométrica de estrella anudada en macramé fino sobre aro metálico oculto. Una pieza escultórica para paredes que buscan textura táctil y pureza visual minimalista.",
    price: 120000,
    image_url: "/images/feed_fullbleed/foto_11_mandala_estrella_pared.jpg",
    stock: 1,
    is_unique: true,
    category: "Macramé Mural",
  },
  {
    id: "bandana-boho-crochet",
    name: "Bandana Boho 'Camel & Lino'",
    description: "Accesorio textil tejido en algodón transpirable color camel arena. Ligera, versátil y con amarre suave al cabello. Perfecta para días soleados y estética slow living.",
    price: 32000,
    image_url: "/images/feed_fullbleed/foto_07_bandana_crochet_camel.jpg",
    stock: 8,
    is_unique: false,
    category: "Accesorios Textiles",
  },
  {
    id: "porta-termo-nomada",
    name: "Porta-Termo & Botella 'Nómada'",
    description: "Funda tejida en resistente soga de algodón crudo con asa reforzada cruzada. Diseñada para acompañar tus caminatas y rituales diarios con practicidad orgánica y cero plásticos.",
    price: 45000,
    image_url: "/images/feed_fullbleed/foto_08_porta_termo_macrame.jpg",
    stock: 4,
    is_unique: false,
    category: "Accesorios Sostenibles",
  },
  {
    id: "bolso-clutch-granny",
    name: "Clutch de Mano 'Granny Chic'",
    description: "Cartera artesanal con técnica tradicional de cuadros granny square en paleta neutra de arcilla, marfil y salvia. Forro interior de lino crudo y broche magnético invisible.",
    price: 85000,
    image_url: "/images/feed_fullbleed/foto_06_clutch_granny_squares.jpg",
    stock: 2,
    is_unique: true,
    category: "Indumentaria Artesanal",
  },
  {
    id: "chaleco-granny-square",
    name: "Chaleco de Autor 'Flor Silvestre'",
    description: "Prenda de edición limitada tejida íntegramente a mano punto a punto. Calidez contemporánea y silueta relajada con terminaciones en hilo de algodón peinado hipoalergénico.",
    price: 160000,
    image_url: "/images/feed_fullbleed/foto_02_chaleco_granny_squares.jpg",
    stock: 1,
    is_unique: true,
    category: "Indumentaria Artesanal",
  },
];

export async function getSafeDbProducts(): Promise<Product[]> {
  try {
    const fetchPromise = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    const timeoutPromise = new Promise<{ data: null; error: Error }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: new Error('Database timeout') }), 800)
    );

    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

    if (!error && data && data.length > 0) {
      const dbIds = new Set(data.map((p: Product) => p.id));
      const complementary = CURATED_PRODUCTS.filter(p => !dbIds.has(p.id));
      return [...data, ...complementary];
    }
  } catch {
    // Graceful fallback to curated collection
  }
  return CURATED_PRODUCTS;
}

export async function getSafeDbProductById(id: string): Promise<Product | null> {
  try {
    const fetchPromise = supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    const timeoutPromise = new Promise<{ data: null; error: Error }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: new Error('Database timeout') }), 800)
    );

    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

    if (!error && data) {
      return data as Product;
    }
  } catch {
    // Fallback
  }
  return CURATED_PRODUCTS.find(p => p.id === id) || null;
}

export function findCuratedProduct(id: string): Product | undefined {
  return CURATED_PRODUCTS.find(p => p.id === id);
}
