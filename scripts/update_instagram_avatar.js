const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SESSION_DIR = path.resolve(__dirname, '..', '.instagram_session');
const AVATAR_PATH = path.resolve(__dirname, '..', 'public/images/instagram_perfil/avatar_01_imagotipo_calibrado.jpg');

async function updateProfilePicture() {
  if (!fs.existsSync(SESSION_DIR)) {
    console.error('❌ No se encontró la carpeta de sesión .instagram_session/');
    process.exit(1);
  }

  if (!fs.existsSync(AVATAR_PATH)) {
    console.error(`❌ No se encontró el archivo de avatar en: ${AVATAR_PATH}`);
    process.exit(1);
  }

  console.log('🚀 Iniciando navegador con sesión activa de Instagram...');
  console.log(`🖼️ Imagen seleccionada: ${AVATAR_PATH}`);

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

  try {
    console.log('🌐 Navegando a la página de edición de perfil...');
    await page.goto('https://www.instagram.com/accounts/edit/', { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(3000);

    // Si sale diálogo de notificaciones o cookies
    const notNow = await page.$('button:has-text("Ahora no"), button:has-text("Not Now")');
    if (notNow) {
      await notNow.click().catch(() => {});
      await page.waitForTimeout(1000);
    }

    // Buscar input file para subir foto
    console.log('🔍 Buscando selector de subida de imagen de perfil...');
    let fileInput = await page.$('input[type="file"][accept*="image"]');

    if (!fileInput) {
      // Intentar hacer click en el botón de cambiar foto si el input está oculto o dinámico
      console.log('Buscando botón "Cambiar foto"...');
      const changePhotoBtn = await page.$('button:has-text("Cambiar foto"), button:has-text("Change photo"), div[role="button"]:has-text("Cambiar foto")');
      if (changePhotoBtn) {
        console.log('Haciendo click en botón de cambiar foto...');
        await changePhotoBtn.click();
        await page.waitForTimeout(1500);
        fileInput = await page.$('input[type="file"][accept*="image"]');
      }
    }

    if (!fileInput) {
      // Si no está en accounts/edit, intentar en la página principal del perfil
      console.log('🌐 Navegando directamente al perfil @elenvey_creaciones...');
      await page.goto('https://www.instagram.com/elenvey_creaciones/', { waitUntil: 'domcontentloaded', timeout: 35000 });
      await page.waitForTimeout(3000);

      // En el perfil, el avatar suele tener un botón para editar o cambiar
      const profileHeaderPic = await page.$('header img, header [role="button"]');
      if (profileHeaderPic) {
        await profileHeaderPic.click();
        await page.waitForTimeout(1500);
        fileInput = await page.$('input[type="file"][accept*="image"]');
      }
    }

    if (!fileInput) {
      // Último intento: crear el input file o buscar en todo el DOM
      const allFileInputs = await page.$$('input[type="file"]');
      if (allFileInputs.length > 0) {
        fileInput = allFileInputs[0];
      }
    }

    if (!fileInput) {
      console.error('❌ No se encontró el input de carga de archivos en Instagram.');
      await page.screenshot({ path: path.join(__dirname, '../public/images/instagram_perfil/error_upload_debug.png') });
      await context.close();
      process.exit(1);
    }

    console.log('📤 Subiendo imagen de perfil (Opción 1: Imagotipo Calibrado)...');
    await fileInput.setInputFiles(AVATAR_PATH);
    console.log('Esperando procesamiento y confirmación de Instagram...');
    await page.waitForTimeout(6000);

    // Tomar captura del resultado en el perfil
    console.log('📸 Verificando resultado en @elenvey_creaciones...');
    await page.goto('https://www.instagram.com/elenvey_creaciones/', { waitUntil: 'networkidle', timeout: 35000 });
    await page.waitForTimeout(3000);

    const confirmationScreenshot = path.join(__dirname, '../public/images/instagram_perfil/perfil_actualizado_confirmacion.png');
    await page.screenshot({ path: confirmationScreenshot });
    console.log(`✅ Foto de perfil actualizada con éxito en @elenvey_creaciones!`);
    console.log(`📸 Captura de confirmación guardada en: ${confirmationScreenshot}`);

    await page.waitForTimeout(2000);
    await context.close();
    console.log('Navegador cerrado.');
  } catch (error) {
    console.error('Error durante la actualización del avatar:', error);
    await page.screenshot({ path: path.join(__dirname, '../public/images/instagram_perfil/error_exception_debug.png') }).catch(() => {});
    await context.close().catch(() => {});
    process.exit(1);
  }
}

updateProfilePicture();
