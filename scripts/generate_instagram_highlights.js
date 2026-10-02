const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const outputDir = path.join(__dirname, '../public/images/instagram_highlights');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 4 Portadas de Historias Destacadas (1080 x 1920 px)
// Centradas geométricamente en cx=540, cy=960 para calzar con el recorte circular de Instagram
const COVERS = [
  {
    id: 'cover_01_origen',
    title: 'ORIGEN',
    sub: 'EL TALLER',
    iconSvg: `
      <svg viewBox="0 0 160 160" width="130" height="130" fill="none" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 80,138 C 80,105 52,86 45,62 C 64,60 74,42 80,22 C 86,42 96,60 115,62 C 108,86 80,105 80,138 Z"/>
        <line x1="80" y1="138" x2="80" y2="48" stroke="#8C7661" stroke-width="2.5"/>
        <path d="M 80,78 C 92,71 100,68 105,65" stroke="#8C7661" stroke-width="2"/>
        <path d="M 80,98 C 68,91 60,88 55,85" stroke="#8C7661" stroke-width="2"/>
      </svg>
    `
  },
  {
    id: 'cover_02_bajo_pedido',
    title: 'BAJO PEDIDO',
    sub: 'SLOW CRAFT',
    iconSvg: `
      <svg viewBox="0 0 160 160" width="130" height="130" fill="none" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="42" y1="36" x2="118" y2="36" stroke="#8C7661" stroke-width="3"/>
        <line x1="42" y1="124" x2="118" y2="124" stroke="#8C7661" stroke-width="3"/>
        <path d="M 48,42 L 112,42 L 80,80 L 48,42 Z"/>
        <path d="M 48,118 L 112,118 L 80,80 L 48,118 Z"/>
        <circle cx="80" cy="100" r="4.5" fill="#8C7661" stroke="none"/>
        <circle cx="80" cy="60" r="3" fill="#8C7661" stroke="none"/>
      </svg>
    `
  },
  {
    id: 'cover_03_envios',
    title: 'ENVÍOS',
    sub: 'COLOMBIA',
    iconSvg: `
      <svg viewBox="0 0 160 160" width="130" height="130" fill="none" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="42" y="58" width="76" height="70" rx="4"/>
        <line x1="80" y1="58" x2="80" y2="128" stroke="#8C7661" stroke-width="2.8"/>
        <line x1="42" y1="92" x2="118" y2="92" stroke="#8C7661" stroke-width="2.8"/>
        <path d="M 80,58 C 70,36 48,36 60,58" stroke="#8C7661" stroke-width="3"/>
        <path d="M 80,58 C 90,36 112,36 100,58" stroke="#8C7661" stroke-width="3"/>
      </svg>
    `
  },
  {
    id: 'cover_04_tienda',
    title: 'TIENDA',
    sub: 'CÓMO COMPRAR',
    iconSvg: `
      <svg viewBox="0 0 160 160" width="130" height="130" fill="none" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 48,62 L 42,126 C 42,132 47,136 54,136 L 106,136 C 113,136 118,132 118,126 L 112,62 Z"/>
        <path d="M 62,62 C 62,40 98,40 98,62" stroke="#8C7661" stroke-width="3"/>
        <line x1="46" y1="62" x2="114" y2="62"/>
        <line x1="68" y1="95" x2="92" y2="95" stroke="#8C7661" stroke-width="2" stroke-dasharray="4 3"/>
      </svg>
    `
  }
];

function generateCoverHtml(cover) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1080px;
      height: 1920px;
      background-color: #F8F6F2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
    }
    /* Anillo exterior de referencia circular (diámetro 480px centrado a x=540, y=960) */
    .circle-target {
      width: 480px;
      height: 480px;
      border-radius: 50%;
      background-color: #FCFCFC;
      border: 1.5px solid #EAE6DF;
      box-shadow: 0 12px 45px rgba(140, 118, 97, 0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .inner-dashed {
      position: absolute;
      width: 430px;
      height: 430px;
      border-radius: 50%;
      border: 1px dashed #D6CEC3;
      pointer-events: none;
    }
    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      z-index: 2;
    }
    .cover-title {
      font-family: 'Inter', sans-serif;
      font-size: 21px;
      font-weight: 700;
      letter-spacing: 0.28em;
      color: #2A2A2A;
      text-transform: uppercase;
      z-index: 2;
    }
    .cover-sub {
      margin-top: 6px;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.22em;
      color: #8C7661;
      text-transform: uppercase;
      z-index: 2;
    }
    .brand-foot {
      position: absolute;
      bottom: 220px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px;
      letter-spacing: 0.24em;
      color: #8C7661;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="circle-target">
    <div class="inner-dashed"></div>
    <div class="icon-wrap">
      ${cover.iconSvg}
    </div>
    <span class="cover-title">${cover.title}</span>
    <span class="cover-sub">${cover.sub}</span>
  </div>
  <span class="brand-foot">E L E N V E Y</span>
</body>
</html>
  `;
}

// 9 Historias de Contenido Editorial (1080 x 1920 px)
const STORIES = [
  // 1. CARPETA ORIGEN
  {
    id: 'story_01_origen_manos',
    folder: '01_ORIGEN',
    tag: 'FILOSOFÍA & TRADICIÓN',
    title: 'Una sola mujer.<br>Un par de manos pacientes.',
    quote: '“No tejemos contra el reloj; tejemos para acompañar los momentos de paz de un hogar.”',
    body: 'Elenvey no es una fábrica masiva ni una bodega de producción en serie. Es el taller íntimo de nuestra madre tejedora en Colombia.<br><br>Cada tapiz, cada atrapasueños y cada pulsera nace de su concentración absoluta, anudando hilo a hilo sin prisa ni atajos.',
    footer: 'E L E N V E Y · ARTE TEXTIL DE AUTOR'
  },
  {
    id: 'story_02_origen_materiales',
    folder: '01_ORIGEN',
    tag: 'MATERIAS PRIMAS NOBLES',
    title: 'Fibras naturales<br>& algodón 100% colombiano.',
    quote: '“La nobleza del diseño comienza en la pureza de su origen.”',
    body: 'Trabajamos exclusivamente con <strong>cuerdas de algodón peinado</strong> sin blanqueadores químicos agresivos, maderas nativas caídas recuperadas del bosque y fibras vegetales biodegradables.<br><br>El resultado es una textura suave al tacto y cálida a la vista que respeta la tierra.',
    footer: 'CALIDAD ARTESANAL CONSCIENTE'
  },

  // 2. CARPETA BAJO PEDIDO (MADE TO ORDER)
  {
    id: 'story_03_bajopedido_filosofia',
    folder: '02_BAJO_PEDIDO',
    tag: 'CREACIÓN CONSCIENTE',
    title: '¿Por qué creamos<br>únicamente bajo pedido?',
    quote: '“El verdadero lujo contemporáneo no es la inmediatez; es saber que alguien dedicó días de su vida a crear una obra exclusivamente para ti.”',
    body: 'En un mundo saturado de fast fashion y objetos plásticos desechables, en Elenvey practicamos el <strong>Slow Craft</strong>.<br><br>Tu pieza no duerme en una estantería acumulando polvo; sus hilos comienzan a ser anudados en el momento exacto en que confirmas tu orden.',
    footer: 'HECHO A MEDIDA · SIN SOBREPRODUCCIÓN'
  },
  {
    id: 'story_04_bajopedido_tiempos',
    folder: '02_BAJO_PEDIDO',
    tag: 'TIEMPOS DE TEJIDO',
    title: 'La paciencia detrás<br>de cada puntada.',
    quote: '“Lo bueno toma su tiempo. Y lo hecho con el alma, aún más.”',
    body: '• <strong>Piezas pequeñas</strong> (Pulseras / Bandanas): 2 a 3 días hábiles.<br>• <strong>Obras medianas</strong> (Atrapasueños / Tapices murales): 3 a 5 días hábiles.<br>• <strong>Obras monumentales</strong> (Gran Tapiz Santuario): 5 a 8 días hábiles.<br><br>Te notificamos por WhatsApp en cada fase: cuando iniciamos tu pieza, cuando está terminada y con el número de guía de envío.',
    footer: 'TRANSPARENCIA TOTAL & CUIDADO'
  },
  {
    id: 'story_05_bajopedido_personalizacion',
    folder: '02_BAJO_PEDIDO',
    tag: 'PIEZAS PERSONALIZADAS',
    title: 'Tu espacio es único.<br>Tu pieza también puede serlo.',
    quote: '“¿Tienes una pared con medidas especiales o sueñas con una combinación de tonos de tu casa?”',
    body: 'Al ser fabricadas una a una por nuestra artesana, podemos adaptar las dimensiones, la paleta cromática (crudo, terracota, oliva, mostaza) o crear un diseño a la medida de tu sala, habitación o estudio.<br><br>Escríbenos directamente a WhatsApp y lo soñamos juntos.',
    footer: 'ASESORÍA DIRECTA EN WHATSAPP'
  },

  // 3. CARPETA ENVÍOS & CUIDADOS
  {
    id: 'story_06_envios_empaque',
    folder: '03_ENVIOS',
    tag: 'EXPERIENCIA DE UNBOXING',
    title: 'Empacado para proteger<br>y para emocionar.',
    quote: '“Queremos que abrir tu caja se sienta como recibir un regalo de ti para ti.”',
    body: 'Cada obra viaja cuidadosamente peinada y protegida con papel vegetal crudo, sellada con cinta textil de lino y rociada con una esencia suave de lavanda.<br><br>Incluye su certificado de autenticidad artesanal y una guía ilustrada de cuidados para sus fibras.',
    footer: 'LISTO PARA REGALAR O DISFRUTAR'
  },
  {
    id: 'story_07_envios_cobertura',
    folder: '03_ENVIOS',
    tag: 'DESPACHOS SEGUROS',
    title: 'Envíos asegurados<br>a toda Colombia.',
    quote: '“Desde nuestro taller en el Valle del Cauca directo a la puerta de tu hogar.”',
    body: 'Despachamos con número de rastreo activo a Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Eje Cafetero y todo el territorio nacional a través de empresas aliadas seguras (Servientrega / Interrapidísimo / Envía).',
    footer: 'COBERTURA NACIONAL CONFIABLE'
  },

  // 4. CARPETA CÓMO COMPRAR
  {
    id: 'story_08_comprar_tienda_web',
    folder: '04_TIENDA',
    tag: 'COMPRA ONLINE FÁCIL',
    title: 'Pide tu pieza en<br>3 simples pasos.',
    quote: '“Seguro, transparente y sin complicaciones.”',
    body: '<strong>1.</strong> Ingresa a nuestra tienda oficial: <strong>elenvey-store.vercel.app</strong> (enlace directo en la biografía).<br><br><strong>2.</strong> Elige tu creación favorita y añade tus datos de envío.<br><br><strong>3.</strong> Paga seguro con <strong>Nequi, PSE, Tarjeta de Crédito o Débito</strong> a través de MercadoPago.',
    footer: 'PAGOS 100% PROTEGIDOS'
  },
  {
    id: 'story_09_comprar_whatsapp',
    folder: '04_TIENDA',
    tag: 'ATENCIÓN HUMANA DIRECTA',
    title: '¿Prefieres conversar<br>con nosotros antes?',
    quote: '“Estamos a un mensaje de distancia para resolver cualquier duda.”',
    body: 'Toca el enlace de WhatsApp en nuestro perfil (+57 313 386 6879).<br><br>Con gusto te asesoramos con fotos en tiempo real de los tonos de algodón, medidas sugeridas y opciones de pago directas.',
    footer: 'E L E N V E Y · ANUDADO CON EL ALMA'
  }
];

function generateStoryHtml(story) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1080px;
      height: 1920px;
      background: linear-gradient(180deg, #FAF8F5 0%, #F1ECE5 100%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 160px 95px 140px;
      font-family: 'Inter', sans-serif;
      position: relative;
      overflow: hidden;
    }
    .border-frame {
      position: absolute;
      top: 48px;
      left: 48px;
      right: 48px;
      bottom: 48px;
      border: 1px solid rgba(140, 118, 97, 0.25);
      pointer-events: none;
    }
    .header-box {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .tag {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.28em;
      color: #8C7661;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .tag::before {
      content: "";
      display: inline-block;
      width: 38px;
      height: 2px;
      background-color: #8C7661;
    }
    .title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 66px;
      font-weight: 500;
      line-height: 1.15;
      color: #242424;
      letter-spacing: -0.01em;
      margin-top: 6px;
    }
    .content-middle {
      display: flex;
      flex-direction: column;
      gap: 40px;
      margin: 20px 0;
    }
    .quote-box {
      background-color: #FFFFFF;
      border-left: 4px solid #8C7661;
      padding: 38px 44px;
      border-radius: 6px;
      box-shadow: 0 10px 35px rgba(0, 0, 0, 0.04);
      border: 1px solid #ECE7E0;
      border-left-width: 4px;
    }
    .quote-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: 34px;
      font-style: italic;
      color: #383838;
      line-height: 1.4;
    }
    .body-box {
      font-size: 26px;
      line-height: 1.82;
      color: #4C4A45;
      font-weight: 400;
      max-width: 890px;
    }
    .body-box strong {
      color: #1F1F1F;
      font-weight: 600;
    }
    .footer-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 35px;
      border-top: 1px solid #E2DCD3;
    }
    .footer-brand {
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.26em;
      color: #8C7661;
      text-transform: uppercase;
    }
    .footer-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #2F6F4E;
    }
  </style>
</head>
<body>
  <div class="border-frame"></div>

  <div class="header-box">
    <span class="tag">${story.tag}</span>
    <h1 class="title">${story.title}</h1>
  </div>

  <div class="content-middle">
    <div class="quote-box">
      <p class="quote-text">${story.quote}</p>
    </div>
    <div class="body-box">
      <p>${story.body}</p>
    </div>
  </div>

  <div class="footer-box">
    <span class="footer-brand">${story.footer}</span>
    <div class="footer-dot"></div>
  </div>
</body>
</html>
  `;
}

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920, deviceScaleFactor: 1.5 } });

  console.log('🎨 1. Generando 4 Portadas de Historias Destacadas (1080 × 1920 px)...');
  for (const cover of COVERS) {
    const html = generateCoverHtml(cover);
    await page.setContent(html, { waitUntil: 'networkidle' });
    const pngPath = path.join(outputDir, `${cover.id}.png`);
    const jpgPath = path.join(outputDir, `${cover.id}.jpg`);
    await page.screenshot({ path: pngPath });
    await page.screenshot({ path: jpgPath, type: 'jpeg', quality: 96 });
    console.log(`✅ Portada generada: ${cover.id} (.png y .jpg)`);
  }

  console.log('\n📖 2. Generando 9 Historias de Contenido Editorial (1080 × 1920 px)...');
  for (const story of STORIES) {
    const html = generateStoryHtml(story);
    await page.setContent(html, { waitUntil: 'networkidle' });
    const pngPath = path.join(outputDir, `${story.id}.png`);
    const jpgPath = path.join(outputDir, `${story.id}.jpg`);
    await page.screenshot({ path: pngPath });
    await page.screenshot({ path: jpgPath, type: 'jpeg', quality: 96 });
    console.log(`✅ Historia generada: [${story.folder}] ${story.id}`);
  }

  // Generar hoja de resumen visual de las 4 carpetas con sus historias
  console.log('\n📸 Generando hoja de catálogo de Highlights para revisión...');
  const coversB64 = COVERS.map(c => ({
    ...c,
    b64: fs.readFileSync(path.join(outputDir, `${c.id}.png`)).toString('base64')
  }));

  const sheetHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      background-color: #F8F7F4;
      padding: 60px 50px;
      color: #262626;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 { font-size: 28px; font-weight: 700; color: #1E1E1E; margin-bottom: 8px; text-align: center; }
    p.sub { font-size: 15px; color: #707070; margin-bottom: 45px; text-align: center; max-width: 700px; }
    .covers-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 25px;
      max-width: 1140px;
      width: 100%;
      margin-bottom: 50px;
    }
    .cover-card {
      background: #FFFFFF;
      border-radius: 16px;
      padding: 24px 20px;
      border: 1px solid #EAE6DF;
      box-shadow: 0 4px 18px rgba(0,0,0,0.04);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .circle-preview {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 2px solid #8C7661;
      padding: 3px;
      margin-bottom: 16px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .circle-preview img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      transform: scale(3.5);
    }
    .cover-name { font-size: 14px; font-weight: 700; color: #2A2A2A; letter-spacing: 0.12em; text-transform: uppercase; }
    .cover-meta { font-size: 12px; color: #8C7661; margin-top: 4px; }
  </style>
</head>
<body>
  <h1>Suite de Carpetas Destacadas — @elenvey_creaciones</h1>
  <p class="sub">Portadas oficiales optimizadas para el recorte circular de Instagram y alineadas con la filosofía de Creación Consciente & Hecho Bajo Pedido.</p>
  <div class="covers-grid">
    ${coversB64.map(c => `
      <div class="cover-card">
        <div class="circle-preview">
          <img src="data:image/png;base64,${c.b64}">
        </div>
        <span class="cover-name">${c.title}</span>
        <span class="cover-meta">${c.sub}</span>
      </div>
    `).join('')}
  </div>
</body>
</html>
  `;

  await page.setViewportSize({ width: 1200, height: 600 });
  await page.setContent(sheetHtml, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outputDir, 'highlights_overview_sheet.png'), fullPage: true });

  console.log('✅ Hoja de vista general guardada en public/images/instagram_highlights/highlights_overview_sheet.png');

  await browser.close();
}

main().catch(console.error);
