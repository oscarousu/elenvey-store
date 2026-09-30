const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const outputDir = path.join(__dirname, '../public/images/instagram_perfil');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Nodo orgánico de hilo / Isotipo de Elenvey
const KNOT_PATH = `M 30,95 C 50,95 65,92 78,85 C 92,76 108,52 132,42 C 152,34 172,42 166,66 C 158,96 116,132 86,132 C 60,132 46,112 56,92 C 66,72 98,64 126,74 C 154,84 174,106 186,104 C 196,102 202,88 195,78 C 188,68 174,72 176,86 C 178,98 194,104 206,94 C 214,86 216,72 210,64`;

// Opción 1: Imagotipo Calibrado de Alta Gama (Isotipo + Wordmark agrandado y sin textos microscópicos)
// ESTA ES LA RECOMENDACIÓN #1 DE LA INDUSTRIA (Máxima claridad en 150px y en Stories)
const svg1 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;display=swap');
      .brand-title {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 82px;
        font-weight: 500;
        letter-spacing: 0.28em;
        fill: #2A2A2A;
        text-anchor: middle;
      }
    </style>
  </defs>

  <!-- Fondo Lienzo Cálido (Pure Linen) -->
  <rect width="1080" height="1080" fill="#FCFCFC" />

  <!-- Anillo sutil armónico de referencia -->
  <circle cx="540" cy="540" r="460" stroke="#F0EDE8" stroke-width="2" fill="none" opacity="0.8" />

  <!-- Isotipo Centrado con grosor premium -->
  <g transform="translate(540, 420)">
    <g transform="translate(-250, -170) scale(2.1)">
      <path d="${KNOT_PATH}" 
            stroke="#2A2A2A" 
            stroke-width="4.8" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            fill="none" />
    </g>
  </g>

  <!-- Wordmark ELENVEY centrado con alta legibilidad -->
  <text x="555" y="675" class="brand-title">ELENVEY</text>
</svg>
`;

// Opción 2: Isotipo Puro Monograma Minimalista (Ultra-limpio, estilo Chanel / Loewe)
const svg2 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <!-- Fondo Warm Alabaster -->
  <rect width="1080" height="1080" fill="#F6F5F2" />

  <!-- Anillo concéntrico sutil -->
  <circle cx="540" cy="540" r="455" stroke="#EAE6DF" stroke-width="2.5" fill="none" />
  <circle cx="540" cy="540" r="445" stroke="#F0ECE5" stroke-width="1.5" fill="none" />

  <!-- Isotipo de gran presencia visual -->
  <g transform="translate(540, 535)">
    <g transform="translate(-360, -240) scale(3.0)">
      <path d="${KNOT_PATH}" 
            stroke="#2A2A2A" 
            stroke-width="3.8" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            fill="none" />
    </g>
  </g>
</svg>
`;

// Opción 3: Edición Nocturna Dark Charcoal (Alto Contraste y máxima sofisticación)
const svg3 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;display=swap');
      .brand-title-dark {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 82px;
        font-weight: 500;
        letter-spacing: 0.28em;
        fill: #FFFFFF;
        text-anchor: middle;
      }
    </style>
  </defs>

  <!-- Fondo Dark Charcoal profundo -->
  <rect width="1080" height="1080" fill="#222222" />

  <!-- Anillo perimetral sutil -->
  <circle cx="540" cy="540" r="460" stroke="#383634" stroke-width="2" fill="none" />

  <!-- Isotipo Blanco Nieve -->
  <g transform="translate(540, 420)">
    <g transform="translate(-250, -170) scale(2.1)">
      <path d="${KNOT_PATH}" 
            stroke="#FFFFFF" 
            stroke-width="4.8" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            fill="none" />
    </g>
  </g>

  <!-- Wordmark Blanco Nieve -->
  <text x="555" y="675" class="brand-title-dark">ELENVEY</text>
</svg>
`;

// Opción 4: Pure Wordmark Minimalista (Solo Marca Tipográfica — estilo Céline / Jacquemus)
const svg4 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;display=swap');
      .pure-wordmark {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 110px;
        font-weight: 500;
        letter-spacing: 0.32em;
        fill: #2A2A2A;
        text-anchor: middle;
      }
      .pure-tag {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 26px;
        font-weight: 600;
        letter-spacing: 0.38em;
        fill: #8C7661;
        text-anchor: middle;
        text-transform: uppercase;
      }
    </style>
  </defs>

  <!-- Fondo Lienzo Cálido -->
  <rect width="1080" height="1080" fill="#FCFCFC" />

  <!-- Anillo sutil -->
  <circle cx="540" cy="540" r="455" stroke="#EAE6DF" stroke-width="2" fill="none" />

  <text x="560" y="525" class="pure-wordmark">ELENVEY</text>
  <text x="540" y="585" class="pure-tag">COLOMBIA</text>
</svg>
`;

async function main() {
  const avatars = [
    { id: 'avatar_01_imagotipo_calibrado', title: 'Opción 1: Imagotipo Calibrado (Recomendada #1)', svg: svg1, tag: '★ Elección Recomendada', desc: 'Isotipo orgánico + nombre ELENVEY de alta escala sin textos microscópicos. Máxima legibilidad y equilibrio visual en cualquier tamaño de pantalla.' },
    { id: 'avatar_02_isotype_pure', title: 'Opción 2: Isotipo Monograma Puro', svg: svg2, tag: 'Minimalismo Puro', desc: 'El nudo continuo de la letra E a escala monumental. Reconocimiento visual instantáneo en aros de historias y comentarios pequeños.' },
    { id: 'avatar_03_dark_charcoal', title: 'Opción 3: Edición Nocturna Charcoal', svg: svg3, tag: 'Alto Contraste', desc: 'Fondo Dark Charcoal (#222222) con gráficos en blanco puro. Genera un contraste impactante y sofisticado sobre la interfaz clara de Instagram.' },
    { id: 'avatar_04_pure_wordmark', title: 'Opción 4: Tipografía Editorial Pura', svg: svg4, tag: 'Estilo Editorial Lujo', desc: 'Tipografía mayúscula espaciada con denominación de origen "COLOMBIA". Claridad de lectura total incluso a distancia.' },
  ];

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080, deviceScaleFactor: 2 } });

  console.log('🎨 Generando avatares perfeccionados para perfil de Instagram (1080 × 1080 px)...');

  const b64List = [];

  for (const item of avatars) {
    const svgPath = path.join(outputDir, `${item.id}.svg`);
    const pngPath = path.join(outputDir, `${item.id}.png`);
    const jpgPath = path.join(outputDir, `${item.id}.jpg`);

    fs.writeFileSync(svgPath, item.svg.trim());

    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { width: 1080px; height: 1080px; overflow: hidden; background: transparent; }
          </style>
        </head>
        <body>
          ${item.svg}
        </body>
      </html>
    `, { waitUntil: 'networkidle' });

    await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: 1080, height: 1080 } });
    await page.screenshot({ path: jpgPath, type: 'jpeg', quality: 96, clip: { x: 0, y: 0, width: 1080, height: 1080 } });

    const b64 = fs.readFileSync(pngPath).toString('base64');
    b64List.push({ ...item, b64 });

    console.log(`✅ Generado con éxito: ${item.id} (.svg, .png, .jpg)`);
  }

  // Generar hoja de comparación final
  console.log('📱 Generando hoja de previsualización final con simulación de Story Ring y feed...');
  const sheetHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background-color: #F8F7F4;
      padding: 50px 40px;
      color: #262626;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 {
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.01em;
      margin-bottom: 8px;
      color: #1A1A1A;
      text-align: center;
    }
    p.subtitle {
      font-size: 14px;
      color: #737373;
      margin-bottom: 40px;
      text-align: center;
      max-width: 680px;
      line-height: 1.6;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
      max-width: 1060px;
      width: 100%;
    }
    .card {
      background: #FFFFFF;
      border: 1px solid #EAE6DF;
      border-radius: 18px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    }
    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: #2A2A2A;
      margin-bottom: 6px;
    }
    .card-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;
      margin-bottom: 22px;
    }
    .badge-rec {
      background-color: #E8F5E9;
      color: #2F6F4E;
      border: 1px solid #C8E6C9;
    }
    .badge-alt {
      background-color: #F4F3F0;
      color: #8C7661;
      border: 1px solid #E5E0D8;
    }
    .preview-container {
      display: flex;
      align-items: center;
      gap: 28px;
      margin-bottom: 22px;
    }
    .story-ring {
      width: 148px;
      height: 148px;
      border-radius: 50%;
      background: linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4);
      padding: 3.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(221, 42, 123, 0.25);
    }
    .avatar-circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 3.5px solid #FFFFFF;
      overflow: hidden;
      background: #FFFFFF;
    }
    .avatar-circle img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .feed-mini {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .feed-mini-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      border: 1.5px solid #E5E5E5;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }
    .feed-mini-circle img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .mini-label {
      font-size: 11px;
      color: #8E8E8E;
      font-weight: 500;
    }
    .card-desc {
      font-size: 12.5px;
      color: #5F5E5B;
      line-height: 1.6;
      text-align: center;
      margin-top: 6px;
      max-width: 400px;
    }
  </style>
</head>
<body>
  <h1>Colección Oficial de Avatares para Instagram — @elenvey_creaciones</h1>
  <p class="subtitle">Diseñados a 1080 × 1080 px con estricto respeto a la zona segura circular (Safe Zone), escala óptica para legibilidad en Historias (150px) y comentarios (48px).</p>
  
  <div class="grid">
    ${b64List.map((av, idx) => `
      <div class="card">
        <span class="card-title">${av.title}</span>
        <span class="card-badge ${idx === 0 ? 'badge-rec' : 'badge-alt'}">${av.tag}</span>
        
        <div class="preview-container">
          <div class="story-ring">
            <div class="avatar-circle">
              <img src="data:image/png;base64,${av.b64}" alt="${av.title}">
            </div>
          </div>
          <div class="feed-mini">
            <div class="feed-mini-circle">
              <img src="data:image/png;base64,${av.b64}" alt="${av.title}">
            </div>
            <span class="mini-label">Comentarios (48px)</span>
          </div>
        </div>

        <p class="card-desc">${av.desc}</p>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

  await page.setViewportSize({ width: 1140, height: 1280 });
  await page.setContent(sheetHtml, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outputDir, 'preview_comparison_sheet.png'), fullPage: true });

  console.log('✅ Hoja de comparación final guardada en public/images/instagram_perfil/preview_comparison_sheet.png');
  await browser.close();
}

main().catch(console.error);
