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

async function publishSinglePostWorkflow(page, post, type = 'card') {
  const relativeImagePath = type === 'fullbleed' ? post.fullbleedImage : post.cardImage;
  const imagePath = path.resolve(ROOT_DIR, relativeImagePath);

  if (!fs.existsSync(imagePath)) {
    console.error(`❌ La imagen no existe en la ruta: ${imagePath}`);
    return false;
  }

  console.log(`\n======================================================`);
  console.log(`📸 PUBLICANDO: Post ${post.id.toString().padStart(2, '0')} - ${post.title}`);
  console.log(`🖼️ Formato: ${type === 'fullbleed' ? 'Full-Bleed 4:5 (Foto Limpia)' : 'Studio Card 4:5 (Galería de Autor)'}`);
  console.log(`======================================================\n`);

  try {
    // 0️⃣ Asegurar estado limpio de la página navegando al feed principal
    await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle', timeout: 35000 });
    await page.waitForTimeout(2500);

    const notNowBtn = await page.$('button:has-text("Ahora no"), button:has-text("Not Now")');
    if (notNowBtn) {
      await notNowBtn.click().catch(() => {});
      await page.waitForTimeout(1000);
    }

    // 1️⃣ Localizar el botón de "Crear" / "New post"
    console.log('1️⃣ Buscando botón "Crear"...');
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
        await el.click();
        createFound = true;
        console.log(`   ✓ Clic en botón Crear (${sel})`);
        break;
      }
    }

    if (!createFound) {
      console.log('   ⚠️ Botón Crear no encontrado en primera instancia. Recargando feed...');
      await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      const fallbackCreate = await page.$('svg[aria-label="Nueva publicación"], svg[aria-label="Crear"], span:text-is("Crear")');
      if (fallbackCreate) {
        await fallbackCreate.click();
        createFound = true;
      } else {
        throw new Error('No se pudo encontrar el botón "Crear".');
      }
    }

    await page.waitForTimeout(1500);

    // Submenú "Publicación" si aparece
    const subMenuPost = await page.$('span:text-is("Publicación"), span:text-is("Post")');
    if (subMenuPost) {
      await subMenuPost.click();
      console.log('   ✓ Clic en submenú "Publicación"');
      await page.waitForTimeout(1500);
    }

    // 2️⃣ Cargar la imagen
    console.log('2️⃣ Subiendo imagen...');
    const fileInput = await page.waitForSelector('input[type="file"]', { state: 'attached', timeout: 15000 });
    await fileInput.setInputFiles(imagePath);
    console.log('   ✓ Imagen cargada exitosamente.');
    await page.waitForTimeout(3500);

    // 3️⃣ Ajustar relación de aspecto a Original / 4:5
    console.log('3️⃣ Verificando relación de aspecto (4:5 vertical)...');
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
      console.log('   ℹ️ Ajuste de recorte ya óptimo.');
    }

    // 4️⃣ Avanzar paso de filtros
    console.log('4️⃣ Avanzando a filtros...');
    const nextBtn1 = await page.waitForSelector('div[role="button"]:has-text("Siguiente"), div[role="button"]:has-text("Next"), button:has-text("Siguiente"), button:has-text("Next")', { timeout: 15000 });
    await nextBtn1.click();
    console.log('   ✓ Filtros validados');
    await page.waitForTimeout(2500);

    // 5️⃣ Avanzar a pie de foto (verificando si ya está en la pantalla final de Compartir)
    console.log('5️⃣ Avanzando a pie de foto...');
    const shareReadyCheck = (await page.getByRole('button', { name: /^Compartir$|^Share$/i }).count()) > 0;
    if (!shareReadyCheck) {
      try {
        const nextBtn2 = await page.waitForSelector('div[role="button"]:has-text("Siguiente"), div[role="button"]:has-text("Next"), button:has-text("Siguiente"), button:has-text("Next")', { timeout: 5000 });
        if (nextBtn2) {
          await nextBtn2.click();
          console.log('   ✓ Paso de filtros avanzado a pie de foto');
          await page.waitForTimeout(2500);
        }
      } catch (_) {
        console.log('   ℹ️ Ya se encontraba en la pantalla de pie de foto.');
      }
    } else {
      console.log('   ✓ Ya se encuentra en la pantalla de pie de foto y compartir');
    }

    // 6️⃣ Escribir texto / pie de foto (Caption)
    console.log('6️⃣ Escribiendo pie de foto oficial de Elenvey...');
    const captionEditor = await page.waitForSelector(
      'div[aria-label="Escribe un pie de foto..."], div[aria-label="Write a caption..."], div[contenteditable="true"][role="textbox"]',
      { timeout: 15000 }
    );
    await captionEditor.click();
    await page.waitForTimeout(500);
    await captionEditor.fill(post.caption);
    console.log('   ✓ Copy y hashtags insertados correctamente');
    await page.waitForTimeout(2000);

    // 7️⃣ Clic en "Compartir" (Botón superior derecho del diálogo)
    console.log('7️⃣ Publicando en la cuenta @elenvey_creaciones...');
    const exactShare = page.getByRole('button', { name: /^Compartir$|^Share$/i });
    if (await exactShare.count() > 0) {
      await exactShare.first().click({ force: true });
      console.log('   ✓ Clic en "Compartir" realizado exitosamente (exact match)');
    } else {
      const headerShare = page.locator('div[role="dialog"] div[role="button"]:text-is("Compartir"), div[role="dialog"] button:text-is("Compartir")');
      await headerShare.first().click({ force: true });
      console.log('   ✓ Clic en "Compartir" realizado exitosamente (header dialog)');
    }

    // 8️⃣ Esperar confirmación
    console.log('8️⃣ Esperando confirmación de Instagram...');
    const successSelector = 'span:has-text("Se ha compartido tu publicación"), span:has-text("Your post has been shared"), img[alt*="Animación que indica que la publicación se ha compartido"], svg[aria-label="Animación que indica que la publicación se ha compartido"]';

    try {
      await page.waitForSelector(successSelector, { timeout: 60000 });
      console.log(`🎉 ¡POST ${post.id.toString().padStart(2, '0')} PUBLICADO CON ÉXITO!`);
    } catch (e) {
      console.log('⚠️ Esperando 10s extra para asegurar la subida en segundo plano...');
      await page.waitForTimeout(10000);
    }

    // 9️⃣ Cerrar la modal haciendo clic en "Listo" para el siguiente post
    const listoBtn = page.getByRole('button', { name: /^Listo$|^Done$/i });
    if (await listoBtn.count() > 0) {
      await listoBtn.first().click({ force: true }).catch(() => {});
      console.log('   ✓ Modal cerrada con "Listo"');
    } else {
      await page.keyboard.press('Escape');
    }
    await page.waitForTimeout(2000);
    return true;
  } catch (error) {
    console.error(`❌ Error publicando Post ${post.id}:`, error.message);
    const errScreenshot = path.resolve(ROOT_DIR, `public/images/debug_error_post_${post.id}.png`);
    await page.screenshot({ path: errScreenshot }).catch(() => {});
    return false;
  }
}

async function publishBatch(targets, type = 'card') {
  let targetIds = [];
  if (Array.isArray(targets)) {
    targetIds = targets;
  } else if (typeof targets === 'object' && targets.start && targets.end) {
    for (let id = targets.start; id <= targets.end; id++) targetIds.push(id);
  } else {
    for (let id = 2; id <= 13; id++) targetIds.push(id);
  }

  const postsToPublish = POSTS.filter(p => targetIds.includes(p.id));

  console.log(`\n======================================================`);
  console.log(`🚀 INICIANDO PUBLICACIÓN SECUENCIAL AUTOMATIZADA`);
  console.log(`📦 Posts a publicar: ${postsToPublish.length} (${postsToPublish.map(p => `Post ${p.id}`).join(', ')})`);
  console.log(`📐 Formato: ${type === 'fullbleed' ? 'Full-Bleed 4:5' : 'Studio Card 4:5 (Elenvey Luxury Passe-partout)'}`);
  console.log(`⏱️ Intervalo de seguridad entre posts: 25 segundos`);
  console.log(`======================================================\n`);

  const { context, page } = await launchBrowser();

  try {
    let successCount = 0;
    for (let i = 0; i < postsToPublish.length; i++) {
      const post = postsToPublish[i];
      console.log(`\n------------------------------------------------------`);
      console.log(`📊 [${i + 1}/${postsToPublish.length}] Procesando Post ${post.id}: ${post.title}`);
      console.log(`------------------------------------------------------`);

      const success = await publishSinglePostWorkflow(page, post, type);
      if (success) {
        successCount++;
      }

      if (i < postsToPublish.length - 1) {
        console.log(`\n⏳ Pausa segura de 25 segundos antes del siguiente post (anti-spam Meta)...`);
        await page.waitForTimeout(25000);
      }
    }

    console.log(`\n======================================================`);
    console.log(`🎉 PROCESO FINALIZADO EXITOSAMENTE`);
    console.log(`✅ Posts publicados: ${successCount} de ${postsToPublish.length}`);
    console.log(`======================================================\n`);
  } catch (err) {
    console.error('Error general durante la ejecución en lote:', err.message);
  } finally {
    console.log('Cerrando sesión del navegador...');
    await context.close();
  }
}

async function publishPost(postId, type = 'card') {
  await publishBatch([postId], type);
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
} else if (args.includes('--ids')) {
  const idsIdx = args.indexOf('--ids');
  const idsStr = args[idsIdx + 1] || '';
  const parsedIds = idsStr.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
  const type = args.includes('--fullbleed') ? 'fullbleed' : 'card';
  publishBatch(parsedIds, type);
} else if (args.includes('--all')) {
  const type = args.includes('--fullbleed') ? 'fullbleed' : 'card';
  publishBatch({ start: 2, end: 13 }, type);
} else if (args.includes('--from') && args.includes('--to')) {
  const fromIdx = args.indexOf('--from');
  const toIdx = args.indexOf('--to');
  const startId = parseInt(args[fromIdx + 1], 10) || 2;
  const endId = parseInt(args[toIdx + 1], 10) || 13;
  const type = args.includes('--fullbleed') ? 'fullbleed' : 'card';
  publishBatch({ start: startId, end: endId }, type);
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
  node scripts/ig_publisher.js --ids 3,5,7,9        Publica la lista específica de IDs
  node scripts/ig_publisher.js --all                Publica todos los posts del catálogo (2 al 13)
  node scripts/ig_publisher.js --from 2 --to 5      Publica un rango específico de posts
  node scripts/ig_publisher.js --post <id>          Publica el Post individual indicado
  --fullbleed                                       Bandera opcional para usar foto a sangre limpia
`);
}

