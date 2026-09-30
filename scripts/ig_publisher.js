/**
 * 🌿 ELENVEY — Instagram Automated Publisher via Local Chrome
 *
 * Automatizador local con Playwright utilizando Google Chrome nativo de macOS.
 * Mantiene la sesión persistente en `.instagram_session/` de forma segura.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SESSION_DIR = path.resolve(__dirname, '..', '.instagram_session');
const ROOT_DIR = path.resolve(__dirname, '..');

// Catálogo de publicaciones
const POSTS = [
  {
    id: 1,
    title: 'Atrapasueños Sagrado 7 Chakras',
    cardImage: 'public/images/feed_republicar/post_01_atrapasuenos_7chakras.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_01_atrapasuenos_7chakras.jpg',
    caption: `Siete centros de energía, una sola intención: armonía para tu hogar. ✦

En la tradición ancestral, el tejido concéntrico del hilorama representa una ventana hacia la introspección y el equilibrio. En esta versión tejida a mano, cada nivel de hilo sigue una transición consciente de color sobre un aro de bambú natural seleccionado.

Una pieza que no solo decora tus paredes: transforma la energía de tu rincón de calma favorito.

🌿 Aro en bambú natural pulido · Borlas en algodón peinado con cuentas de madera.
🛍️ Disponible en nuestra tienda online (enlace directo en la bio) o por mensaje directo.

#OjoDeDiosColombia #SieteChakras #ArteTextilColombia #DecoracionConSentido #GeometriaSagrada #Elenvey #HechoEnCali #AnudadoConElAlma`
  },
  {
    id: 2,
    title: 'Chaleco Granny Squares Sol de Otoño',
    cardImage: 'public/images/feed_republicar/post_02_chaleco_granny_squares.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_02_chaleco_granny_squares.jpg',
    caption: `El encanto de los clásicos que nunca pasan de moda. 🧵🍂

Cada cuadro de este chaleco fue tejido individualmente a mano antes de ser ensamblado en una sola pieza armónica. Los tonos mostaza, oliva, terracota y lino rinden homenaje a la calidez de la tierra y al tejido slow fashion.

Una prenda ligera, versátil y con alma para acompañar tus días más luminosos.

🕊️ 100% hilado de algodón peinado · Edición limitada hecha en Cali.
✨ Descubre todas las piezas de indumentaria artesanal en el link de nuestro perfil.

#GrannySquareVest #CrochetColombia #ModaSostenible #SlowFashionColombia #ChalecoCrochet #HechoAManoEnColombia #Elenvey #AnudadoConElAlma`
  },
  {
    id: 3,
    title: 'Bandana Floral Brisa de Mar',
    cardImage: 'public/images/feed_republicar/post_03_bandana_margaritas_playa.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_03_bandana_margaritas_playa.jpg',
    caption: `Días de sol, sal marina y detalles tejidos con paciencia. 🌊🌼

Nuestra pañoleta floral une cuadros en relieve con margaritas centrales, diseñada para cuidar tu cabello con suavidad y aportar ese aire bohemio y fresco a tus escapadas.

Transpirable, suave al tacto y con amarre ajustable para cualquier ocasión.

🤍 Pídela en tu combinación de colores favorita.
🛍️ Tienda online con envíos a toda Colombia: enlace en la bio.

#CrochetBandana #ModaPlayeraColombia #AccesoriosArtesanales #BohoStyleColombia #Elenvey #HechoAMano #CaliCo #AnudadoConElAlma`
  },
  {
    id: 4,
    title: 'Chaleco Calado Duna en Hilo Crudo',
    cardImage: 'public/images/feed_republicar/post_04_chaleco_calado_verano.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_04_chaleco_calado_verano.jpg',
    caption: `La belleza de la simpleza: textura, caída y movimiento. 🌾

El chaleco 'Duna' celebra el punto abierto y la fluidez del hilo crudo con sutiles acentos en terracota y lino tostado. Una prenda pensada para sobreponer en looks frescos y naturales.

Tejido punto por punto, sin máquinas industriales ni producciones masivas.

📐 Talla estándar adaptable · Tejido bajo pedido.
📦 Envíos a todo el país desde nuestro taller en Cali.

#ChalecoCalado #ModaArtesanal #LinoYAlgodon #TextileArt #ConsumoConsciente #ElenveyCali #AnudadoConElAlma`
  },
  {
    id: 5,
    title: 'Top Campesino en Crochet Oliva',
    cardImage: 'public/images/feed_republicar/post_05_top_campesino_crochet.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_05_top_campesino_crochet.jpg',
    caption: `Cuando tus prendas cuentan una historia de dedicación. 🌿✨

Escote campesino con hombros descubiertos, rosetas centrales en relieve y mangas en red artesanal que caen con delicadeza. El verde oliva aporta serenidad y conexión botánica.

Hecho sobre medidas para abrazar tu silueta con comodidad.

🛍️ Conoce la colección completa en el enlace de nuestra biografía.

#TopCrochet #CrochetFashion #HechoAMedida #ArtesaniasDeAutor #VeranoBoho #ElenveyCreaciones #AnudadoConElAlma`
  },
  {
    id: 6,
    title: 'Clutch Flores de Cali con Borla',
    cardImage: 'public/images/feed_republicar/post_06_clutch_granny_squares.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_06_clutch_granny_squares.jpg',
    caption: `Ese toque de color artesanal que transforma cualquier conjunto neutro. 🌸👜

Nuestro bolso sobre combina el clásico motivo floral de granny squares con un forro interior suave, cremallera resistente y asa de muñeca para mayor comodidad. Rematado con borla sedosa en algodón natural.

El compañero perfecto para llevar tus esenciales con personalidad.

💌 Escríbenos por DM para personalizar la paleta de colores de tus flores.

#ClutchCrochet #BolsosArtesanales #GrannySquareBag #AccesoriosConAlma #ElenveyAccesorios #AnudadoConElAlma`
  },
  {
    id: 7,
    title: 'Bandana Tierra Cálida en Crochet',
    cardImage: 'public/images/feed_republicar/post_07_bandana_crochet_camel.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_07_bandana_crochet_camel.jpg',
    caption: `Reflejos de calidez: el tono camel y la textura del tejido manual. 🤎

Diseñada para quienes aprecian los pequeños detalles de la vida cotidiana. Su color tierra tostado combina con cualquier tono de cabello y conjunto veraniego o de entretiempo.

✨ Un regalo especial con empaque consciente disponible en nuestra web.

#BandanaCamel #CrochetLovers #ModaConsciente #SlowLivingColombia #Elenvey #AnudadoConElAlma`
  },
  {
    id: 8,
    title: 'Porta Termo Macramé Salvia',
    cardImage: 'public/images/feed_republicar/post_08_porta_termo_macrame.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_08_porta_termo_macrame.jpg',
    caption: `Lleva tu hidratación a todas partes con estilo y cero plásticos. 💧🌿

Malla elástica en cuerda de algodón resistente con correa cruzada reforzada para botellas y termos de agua. Diseñada para tus paseos, viajes y rutinas diarias.

Lavable, duradero y 100% biodegradable.

🕊️ Disponible en verde salvia, crudo y terracota en la tienda online.

#PortaBotellaMacrame #VidaSostenible #ZeroWasteColombia #MacrameUtility #ElenveyHogar #AnudadoConElAlma`
  },
  {
    id: 9,
    title: 'Chaleco Mini Floral Primer Abrazo',
    cardImage: 'public/images/feed_republicar/post_09_chaleco_bebe_floral.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_09_chaleco_bebe_floral.jpg',
    caption: `El primer abrigo de la vida debe estar lleno de ternura. 👶🌸

Tejido con hilados hipoalergénicos extrasuaves en tonos pastel, pensado especialmente para la piel delicada de los más pequeños. Una pieza de recuerdo que perdura en el tiempo de generación en generación.

🎁 El regalo de baby shower más especial. Listo en empaque de regalo.

#RopaDeBebeCrochet #ChalecoBebe #RegalosParaBebe #CrochetInfantil #HechoConAmor #ElenveyBaby #AnudadoConElAlma`
  },
  {
    id: 10,
    title: 'Falda y Salida de Baño en Macramé',
    cardImage: 'public/images/feed_republicar/post_10_salida_bano_macrame.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_10_salida_bano_macrame.jpg',
    caption: `Nudos calados y flecos que bailan con el viento. 🌊✨

Esta falda salida de baño en macramé es pura devoción por la técnica tradicional de anudado. Una pieza protagonista para lucir sobre tu traje de baño en días de playa y descanso.

Anudada a mano con cordón de algodón crudo que respeta el medio ambiente.

🛍️ Pieza de edición limitada. Agenda la tuya a través de WhatsApp o mensaje directo.

#MacrameSkirt #ResortWearColombia #SalidaDeBano #MacrameFashion #HechoAManoCali #Elenvey #AnudadoConElAlma`
  },
  {
    id: 11,
    title: 'Mandala Ojo de Dios Estrella Andina',
    cardImage: 'public/images/feed_republicar/post_11_mandala_estrella_pared.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_11_mandala_estrella_pared.jpg',
    caption: `La geometría sagrada en el corazón de tus espacios. ✦

Ocho puntas, capas concéntricas de hilos tensados a pulso y un centro que invita a la calma interior. Una escultura mural que llena de vida y presencia cualquier rincón.

📐 Diámetro: 45 cm · Estructura en madera noble.
🚚 Envíos seguros a toda Colombia.

#MandalaMural #OjoDeDios #HiloramaColombia #DecoracionParedes #ElenveyArte #AnudadoConElAlma`
  },
  {
    id: 12,
    title: 'Brazalete Tierra & Sándalo en Micro-Macramé',
    cardImage: 'public/images/feed_republicar/post_12_brazalete_micro_macrame.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_12_brazalete_micro_macrame.jpg',
    caption: `El lujo silencioso de un nudo milimétrico. 🪵✨

Hilos encerados de máxima resistencia entrelazados con cuentas de madera noble pulida. Resistente al agua, ligera y con cierre ajustable para acompañar tu día a día.

🛍️ Disponible en pack individual o dúo para compartir.

#JoyeriaTextil #MicroMacrame #PulserasHombreMujer #AccesoriosMinimalistas #Elenvey #AnudadoConElAlma`
  },
  {
    id: 13,
    title: 'Gran Tapiz Mural Santuario',
    cardImage: 'public/images/feed_republicar/post_13_gran_tapiz_macrame.jpg',
    fullbleedImage: 'public/images/feed_fullbleed/foto_13_gran_tapiz_macrame.jpg',
    caption: `El arte que viste tus paredes con calidez y silencio. 🌿🤍

Más de 300 metros de cuerda de algodón natural 100% colombiano anudados sobre madera noble recuperada. Su volumen aporta calidez visual y aislamiento acústico a salas y cabeceros de cama.

📐 Medidas: 90 cm de ancho × 110 cm de caída.

#TapizMacrame #JapandiHogar #DecoracionWarmMinimalism #ArteTextilMural #Elenvey #AnudadoConElAlma`
  }
];

async function launchBrowser() {
  if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true });
  }

  console.log(`\n🚀 Iniciando Google Chrome con sesión persistente en:`);
  console.log(`📁 ${SESSION_DIR}`);

  const context = await chromium.launchPersistentContext(SESSION_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1280, height: 900 },
    locale: 'es-ES',
    args: [
      '--no-default-browser-check',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  return { context, page };
}

async function isUserLoggedIn(page) {
  try {
    await page.goto('https://www.instagram.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Si encontramos botones de login o el input de username, no está logueado
    const loginInput = await page.$('input[name="username"]');
    if (loginInput) return false;

    // Si encontramos elementos típicos de la barra de navegación lateral
    const homeIcon = await page.$('svg[aria-label="Inicio"], svg[aria-label="Home"], svg[aria-label="Crear"], svg[aria-label="New post"]');
    if (homeIcon) return true;

    // Verificar si hay modal de guardar información o notificaciones
    const notNowBtn = await page.$('button:has-text("Ahora no"), button:has-text("Not Now")');
    if (notNowBtn) {
      await notNowBtn.click();
      await page.waitForTimeout(1000);
      return true;
    }

    return false;
  } catch (err) {
    console.error('Error verificando estado de login:', err.message);
    return false;
  }
}

async function handleLogin() {
  const { context, page } = await launchBrowser();

  console.log('\n🌐 Navegando a Instagram...');
  const loggedIn = await isUserLoggedIn(page);

  if (loggedIn) {
    console.log('\n✅ ¡Ya tienes una sesión activa en Instagram!');
    console.log('Puedes proceder a publicar directamente con: node scripts/ig_publisher.js --post 1');
    await page.waitForTimeout(2000);
    await context.close();
    process.exit(0);
  }

  console.log('\n======================================================');
  console.log('🔑 POR FAVOR INICIA SESIÓN EN LA VENTANA DE CHROME:');
  console.log('   1. Ingresa tu usuario y contraseña de Instagram.');
  console.log('   2. Si te pide código de seguridad o verificación, ingrésalo.');
  console.log('   3. Si te sale "¿Guardar información de inicio de sesión?", dale "Guardar información".');
  console.log('   4. Este script detectará automáticamente cuando hayas ingresado con éxito.');
  console.log('======================================================\n');

  // Esperar hasta que el usuario inicie sesión (hasta 5 minutos)
  const startTime = Date.now();
  const maxTimeout = 5 * 60 * 1000;

  while (Date.now() - startTime < maxTimeout) {
    try {
      await page.waitForTimeout(2000);

      // 1. Verificar cookies de sesión (la forma más confiable)
      const cookies = await context.cookies('https://www.instagram.com');
      const hasSession = cookies.some(c => c.name === 'sessionid' && c.value && c.value.length > 5);
      const hasUser = cookies.some(c => c.name === 'ds_user_id');

      if (hasSession || hasUser) {
        console.log('\n🎉 ¡SESIÓN DETECTADA CON ÉXITO (Cookies de autenticación confirmadas)!');
        console.log('Las cookies y estado de sesión han quedado guardados en .instagram_session/');
        await page.waitForTimeout(3000);
        await context.close();
        console.log('Navegador cerrado con éxito. Listo para publicar.');
        process.exit(0);
      }

      // 2. Revisar botones de descartar avisos
      const notNowBtn = await page.$('button:has-text("Ahora no"), button:has-text("Not Now")');
      if (notNowBtn) {
        try { await notNowBtn.click(); } catch (_) {}
      }

      // 3. Comprobar si ya apareció la barra de navegación o el botón Crear
      const createBtn = await page.$('svg[aria-label="Crear"], svg[aria-label="New post"], svg[aria-label="Nueva publicación"], a[href*="/direct/"]');
      if (createBtn) {
        console.log('\n🎉 ¡SESIÓN DETECTADA CON ÉXITO (Interfaz cargada)!');
        console.log('Las cookies y estado de sesión han quedado guardados en .instagram_session/');
        await page.waitForTimeout(3000);
        await context.close();
        console.log('Navegador cerrado con éxito. Listo para publicar.');
        process.exit(0);
      }
    } catch (err) {
      // Ignorar errores transitorios producidos por redirecciones de navegación
    }
  }

  console.log('\n⏱️ Tiempo de espera agotado. Vuelve a ejecutar el comando cuando estés listo.');
  await context.close();
  process.exit(1);
}

async function publishPost(postId, type = 'card') {
  const post = POSTS.find(p => p.id === postId);
  if (!post) {
    console.error(`❌ Post con ID ${postId} no encontrado en el catálogo.`);
    process.exit(1);
  }

  const relativeImagePath = type === 'fullbleed' ? post.fullbleedImage : post.cardImage;
  const imagePath = path.resolve(ROOT_DIR, relativeImagePath);

  if (!fs.existsSync(imagePath)) {
    console.error(`❌ La imagen no existe en la ruta: ${imagePath}`);
    process.exit(1);
  }

  console.log(`\n======================================================`);
  console.log(`📸 PUBLICANDO EN INSTAGRAM: Post ${post.id} - ${post.title}`);
  console.log(`🖼️ Imagen: ${relativeImagePath}`);
  console.log(`======================================================\n`);

  const { context, page } = await launchBrowser();

  try {
    console.log('1️⃣ Navegando a Instagram...');
    await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(3000);

    // Manejar popup de "Ahora no"
    const notNowBtn = await page.$('button:has-text("Ahora no"), button:has-text("Not Now")');
    if (notNowBtn) {
      await notNowBtn.click();
      await page.waitForTimeout(1000);
    }

    // 2️⃣ Localizar el botón de "Crear" / "New post"
    console.log('2️⃣ Buscando botón "Crear"...');
    const createSelectors = [
      'svg[aria-label="Crear"]',
      'svg[aria-label="Nueva publicación"]',
      'svg[aria-label="New post"]',
      'span:text-is("Crear")',
      'span:text-is("Create")'
    ];

    let createFound = false;
    for (const sel of createSelectors) {
      const el = await page.$(sel);
      if (el) {
        // Clic en el elemento o su contenedor clickable
        await el.click();
        createFound = true;
        console.log(`   ✓ Clic en botón Crear (${sel})`);
        break;
      }
    }

    if (!createFound) {
      throw new Error('No se encontró el botón "Crear". Verifica que hayas iniciado sesión.');
    }

    await page.waitForTimeout(2000);

    // Si se abre un submenú con "Publicación" / "Post", hacer clic
    const subMenuPost = await page.$('span:text-is("Publicación"), span:text-is("Post")');
    if (subMenuPost) {
      await subMenuPost.click();
      console.log('   ✓ Clic en submenú "Publicación"');
      await page.waitForTimeout(1500);
    }

    // 3️⃣ Cargar la imagen
    console.log('3️⃣ Subiendo imagen...');
    const fileInput = await page.waitForSelector('input[type="file"]', { state: 'attached', timeout: 15000 });
    await fileInput.setInputFiles(imagePath);
    console.log('   ✓ Imagen cargada exitosamente.');
    await page.waitForTimeout(3500);

    // 4️⃣ Ajustar relación de aspecto a Original / 4:5
    console.log('4️⃣ Ajustando relación de aspecto (4:5)...');
    try {
      const cropBtn = await page.$('button:has(svg[aria-label="Seleccionar recorte"]), button:has(svg[aria-label="Select crop"]), svg[aria-label="Seleccionar recorte"], svg[aria-label="Select crop"]');
      if (cropBtn) {
        await cropBtn.click();
        console.log('   ✓ Clic en selector de relación de aspecto');
        await page.waitForTimeout(1000);

        const ratioOptions = await page.$$('button, div[role="button"], span');
        for (const opt of ratioOptions) {
          const txt = (await opt.innerText().catch(() => '')).trim();
          if (txt === '4:5' || txt === 'Original') {
            await opt.click();
            console.log(`   ✓ Relación ajustada a "${txt}"`);
            await page.waitForTimeout(1000);
            break;
          }
        }
      }
    } catch (e) {
      console.log('   ℹ️ Ajuste de recorte omitido o ya predeterminado:', e.message);
    }

    // 5️⃣ Clic en "Siguiente" (paso de filtros)
    console.log('5️⃣ Avanzando a edición y filtros...');
    const nextBtn1 = await page.waitForSelector('div[role="button"]:has-text("Siguiente"), div[role="button"]:has-text("Next"), button:has-text("Siguiente"), button:has-text("Next")', { timeout: 15000 });
    await nextBtn1.click();
    console.log('   ✓ Primer paso "Siguiente" completado');
    await page.waitForTimeout(2500);

    // 6️⃣ Clic en "Siguiente" (paso a texto y pie de foto)
    console.log('6️⃣ Avanzando a pie de foto...');
    const nextBtn2 = await page.waitForSelector('div[role="button"]:has-text("Siguiente"), div[role="button"]:has-text("Next"), button:has-text("Siguiente"), button:has-text("Next")', { timeout: 15000 });
    await nextBtn2.click();
    console.log('   ✓ Segundo paso "Siguiente" completado');
    await page.waitForTimeout(2500);

    // 7️⃣ Escribir el texto / pie de foto (Caption)
    console.log('7️⃣ Escribiendo pie de foto oficial de Elenvey...');
    const captionEditor = await page.waitForSelector(
      'div[aria-label="Escribe un pie de foto..."], div[aria-label="Write a caption..."], div[contenteditable="true"][role="textbox"]',
      { timeout: 15000 }
    );
    await captionEditor.click();
    await page.waitForTimeout(500);

    // Escribir el caption
    await captionEditor.fill(post.caption);
    console.log('   ✓ Pie de foto y hashtags insertados correctamente');
    await page.waitForTimeout(2000);

    // 8️⃣ Clic en "Compartir" / "Share" (Botón superior derecho del diálogo)
    console.log('8️⃣ Publicando en la cuenta @elenvey_creaciones...');
    let shareClicked = false;

    const exactShare = page.getByRole('button', { name: /^Compartir$|^Share$/i });
    if (await exactShare.count() > 0) {
      await exactShare.first().click({ force: true });
      shareClicked = true;
      console.log('   ✓ Clic en "Compartir" realizado exitosamente (exact match)');
    } else {
      const headerShare = page.locator('div[role="dialog"] div[role="button"]:text-is("Compartir"), div[role="dialog"] button:text-is("Compartir"), div[role="dialog"] div[role="button"]:text-is("Share"), div[role="dialog"] button:text-is("Share")');
      await headerShare.first().click({ force: true });
      shareClicked = true;
      console.log('   ✓ Clic en "Compartir" realizado exitosamente (header dialog)');
    }

    // 9️⃣ Esperar confirmación
    console.log('9️⃣ Esperando confirmación de Instagram...');
    const successSelector = 'span:has-text("Se ha compartido tu publicación"), span:has-text("Your post has been shared"), img[alt*="Animación que indica que la publicación se ha compartido"], svg[aria-label="Animación que indica que la publicación se ha compartido"]';

    try {
      await page.waitForSelector(successSelector, { timeout: 60000 });
      console.log('\n🎉🎉🎉 ¡PUBLICACIÓN EXITOSA EN INSTAGRAM! 🎉🎉🎉');
      console.log(`El Post ${post.id} ya se encuentra publicado en el feed.`);
    } catch (e) {
      console.log('⚠️ Esperando 10s extra para asegurar la subida en segundo plano...');
      await page.waitForTimeout(10000);
      const screenshotPath = path.resolve(ROOT_DIR, `public/images/debug_post_${post.id}.png`);
      await page.screenshot({ path: screenshotPath });
      console.log(`📸 Captura de pantalla de verificación guardada en: ${screenshotPath}`);
    }

    await page.waitForTimeout(5000);
  } catch (error) {
    console.error('\n❌ ERROR DURANTE LA PUBLICACIÓN:', error.message);
    const errScreenshot = path.resolve(ROOT_DIR, `public/images/debug_error_post_${postId}.png`);
    await page.screenshot({ path: errScreenshot }).catch(() => {});
    console.log(`📸 Captura de pantalla del error guardada en: ${errScreenshot}`);
  } finally {
    console.log('Cerrando sesión del navegador...');
    await context.close();
  }
}

// Control de argumentos CLI
const args = process.argv.slice(2);

if (args.includes('--login')) {
  handleLogin();
} else if (args.includes('--list')) {
  console.log(`\n📋 CATÁLOGO EDITORIAL DE PUBLICACIONES DISPONIBLES:`);
  console.log(`======================================================`);
  POSTS.forEach(p => {
    console.log(`✦ Post [${p.id.toString().padStart(2, '0')}]: ${p.title}`);
    console.log(`  - Card:      ${p.cardImage}`);
    console.log(`  - Fullbleed: ${p.fullbleedImage}`);
  });
  console.log(`======================================================\n`);
} else if (args.includes('--post')) {
  const postIndex = args.indexOf('--post');
  const postId = parseInt(args[postIndex + 1], 10) || 1;
  const type = args.includes('--fullbleed') ? 'fullbleed' : 'card';
  publishPost(postId, type);
} else {
  console.log(`
🌿 Elenvey Instagram Automation CLI
Uso:
  node scripts/ig_publisher.js --login              Inicia Google Chrome para guardar tu sesión
  node scripts/ig_publisher.js --list               Muestra todos los posts disponibles en el catálogo
  node scripts/ig_publisher.js --post <id>          Publica el Post indicado (diseño Studio Card 4:5)
  node scripts/ig_publisher.js --post <id> --fullbleed Publica la foto limpia a sangre (Full-Bleed 4:5)
`);
}

