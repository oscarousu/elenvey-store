import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

os.makedirs('public/images/feed_republicar', exist_ok=True)
os.makedirs('public/images/feed_fullbleed', exist_ok=True)
os.makedirs('public/images/studio_editorial', exist_ok=True)

W, H = 1080, 1350
bg_color = (248, 247, 244) # Warm Alabaster
charcoal = (42, 42, 42)
taupe = (140, 118, 97)
pebble = (95, 94, 91)
border_col = (229, 227, 222)
line_col = (220, 218, 212)

font_logo = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 38)
font_slogan = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 13)
font_col = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 13)
font_title = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 28)
font_sub = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 15)
font_badge = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 12)

def draw_spaced_text(draw, text, x, y, font, fill, spacing=6, anchor='center'):
    total_w = sum(draw.textlength(c, font=font) + spacing for c in text) - spacing
    cur_x = x - total_w / 2 if anchor == 'center' else x
    for c in text:
        draw.text((cur_x, y), c, font=font, fill=fill)
        cur_x += draw.textlength(c, font=font) + spacing

def enhance_image(img, warm_boost=True, sharpness=1.5, contrast=1.10, color=1.08, denoise=0.20):
    img = img.convert('RGB')
    if denoise > 0:
        blurred = img.filter(ImageFilter.GaussianBlur(radius=0.5))
        img = Image.blend(img, blurred, denoise)
    if warm_boost:
        r, g, b = img.split()
        r = r.point(lambda i: min(255, int(i * 1.04)))
        g = g.point(lambda i: min(255, int(i * 1.01)))
        b = b.point(lambda i: max(0, int(i * 0.96)))
        img = Image.merge('RGB', (r, g, b))
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Color(img).enhance(color)
    img = img.filter(ImageFilter.UnsharpMask(radius=1.8, percent=int(sharpness * 100), threshold=3))
    return img

catalog = [
    {
        'card_out': 'public/images/feed_republicar/post_01_atrapasuenos_7chakras.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_01_atrapasuenos_7chakras.jpg',
        'src': 'public/images/instagram_originales/post_5_Photo_by_Elenvey_Creaciones_on_August_23.jpg',
        'crop': None,
        'collection': 'SERIE 7 CHAKRAS & ARMONIZACIÓN',
        'title': 'Atrapasueños Sagrado 7 Chakras',
        'subtitle': 'Hilorama en aro de bambú natural y borlas con cuentas de madera',
        'badge': '100% HECHO A MANO EN COLOMBIA · PIEZA DE AUTOR',
        'warm': True, 'sharpness': 1.6, 'contrast': 1.12, 'color': 1.10
    },
    {
        'card_out': 'public/images/feed_republicar/post_02_chaleco_granny_squares.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_02_chaleco_granny_squares.jpg',
        'src': 'public/images/instagram_originales/post_8_Photo_by_Elenvey_Creaciones_on_January_1.jpg',
        'crop': (0, 0, 480, 486),
        'collection': 'COLECCIÓN INDUMENTARIA DE AUTOR',
        'title': "Chaleco Granny Squares 'Sol de Otoño'",
        'subtitle': 'Tejido artesanal en cuadros vintage · Tonos oliva, mostaza y terracota',
        'badge': '100% ALGODÓN PEINADO · EDICIÓN LIMITADA',
        'warm': True, 'sharpness': 1.4, 'contrast': 1.10, 'color': 1.08
    },
    {
        'card_out': 'public/images/feed_republicar/post_03_bandana_margaritas_playa.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_03_bandana_margaritas_playa.jpg',
        'src': 'public/images/instagram_originales/post_6_Photo_by_Elenvey_Creaciones_on_March_23_.jpg',
        'crop': None,
        'collection': 'COMPLEMENTOS & ESTILO DE VIDA',
        'title': "Bandana Floral 'Brisa de Mar'",
        'subtitle': 'Pañoleta tejida a crochet con margaritas en relieve · Fibras ligeras',
        'badge': 'ACCESORIO DE AUTOR · HECHO A MANO EN COLOMBIA',
        'warm': True, 'sharpness': 1.5, 'contrast': 1.08, 'color': 1.06
    },
    {
        'card_out': 'public/images/feed_republicar/post_04_chaleco_calado_verano.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_04_chaleco_calado_verano.jpg',
        'src': 'public/images/instagram_originales/post_4_Photo_by_Elenvey_Creaciones_on_September.jpg',
        'crop': None,
        'collection': 'INDUMENTARIA & FIBRAS NATURALES',
        'title': "Chaleco Calado 'Duna' en Hilo Crudo",
        'subtitle': 'Punto abierto con franjas sutiles en lino y terracota · Caída fluida',
        'badge': 'TEJIDO CON PACIENCIA · DISEÑO ATEMPORAL',
        'warm': True, 'sharpness': 1.5, 'contrast': 1.12, 'color': 1.08
    },
    {
        'card_out': 'public/images/feed_republicar/post_05_top_campesino_crochet.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_05_top_campesino_crochet.jpg',
        'src': 'public/images/instagram_originales/post_11_Photo_by_Elenvey_Creaciones_on_November_.jpg',
        'crop': None,
        'collection': 'COLECCIÓN VERANO BOHEMIO',
        'title': 'Top Campesino en Crochet Oliva',
        'subtitle': 'Hombros descubiertos y mangas en red artesanal calada',
        'badge': 'DISEÑO EXCLUSIVO · HECHO SOBRE MEDIDAS',
        'warm': True, 'sharpness': 1.4, 'contrast': 1.10, 'color': 1.08
    },
    {
        'card_out': 'public/images/feed_republicar/post_06_clutch_granny_squares.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_06_clutch_granny_squares.jpg',
        'src': 'public/images/instagram_originales/post_12_Photo_by_Elenvey_Creaciones_on_November_.jpg',
        'crop': None,
        'collection': 'ACCESORIOS & BOLSOS DE MANO',
        'title': "Clutch 'Flores de Cali' con Borla",
        'subtitle': 'Bolso sobre en granny squares con forro interior y cremallera',
        'badge': 'ARTESANÍA URBANA · CIERRE DE ALGODÓN',
        'warm': True, 'sharpness': 1.4, 'contrast': 1.10, 'color': 1.08
    },
    {
        'card_out': 'public/images/feed_republicar/post_07_bandana_crochet_camel.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_07_bandana_crochet_camel.jpg',
        'src': 'public/images/instagram_originales/post_7_Photo_by_Elenvey_Creaciones_on_March_07_.jpg',
        'crop': None,
        'collection': 'COMPLEMENTOS & ESTILO DE VIDA',
        'title': "Bandana 'Tierra Cálida' en Crochet",
        'subtitle': 'Tono camel tostado con margarita central en relieve',
        'badge': 'TALLER TEXTIL · SANTIAGO DE CALI',
        'warm': True, 'sharpness': 1.4, 'contrast': 1.10, 'color': 1.08
    },
    {
        'card_out': 'public/images/feed_republicar/post_08_porta_termo_macrame.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_08_porta_termo_macrame.jpg',
        'src': 'public/images/instagram_originales/post_2_Photo_by_Elenvey_Creaciones_on_September.jpg',
        'crop': None,
        'collection': 'VIDA CONSCIENTE & HOGAR',
        'title': "Porta Termo Macramé 'Salvia'",
        'subtitle': 'Malla elástica tejida a mano con correa adaptable y base reforzada',
        'badge': 'SLOW LIVING · REUTILIZABLE Y RESISTENTE',
        'warm': True, 'sharpness': 1.5, 'contrast': 1.12, 'color': 1.08
    },
    {
        'card_out': 'public/images/feed_republicar/post_09_chaleco_bebe_floral.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_09_chaleco_bebe_floral.jpg',
        'src': 'public/images/instagram_originales/post_9_Photo_by_Elenvey_Creaciones_on_December_.jpg',
        'crop': None,
        'collection': 'LÍNEA INFANTIL & RECIÉN NACIDO',
        'title': "Chaleco Mini Floral 'Primer Abrazo'",
        'subtitle': 'Hilado hipoalergénico extrasuave en tonos pastel y flores en relieve',
        'badge': 'CUIDADO Y TERNURA · 100% ARTESANAL',
        'warm': True, 'sharpness': 1.3, 'contrast': 1.08, 'color': 1.06
    },
    {
        'card_out': 'public/images/feed_republicar/post_10_salida_bano_macrame.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_10_salida_bano_macrame.jpg',
        'src': 'public/images/instagram_originales/post_10_Video_by_Elenvey_Creaciones_on_November_.jpg',
        'crop': (0, 130, 361, 580),
        'collection': 'FERIA ARTESANAL & RESORT',
        'title': 'Salida de Baño y Falda en Macramé',
        'subtitle': 'Flecos largos de algodón y caída fluida tejida en nudos calados',
        'badge': 'CREACIONES DE AUTOR · CALI, COLOMBIA',
        'warm': True, 'sharpness': 1.6, 'contrast': 1.14, 'color': 1.10, 'denoise': 0.30
    },
    {
        'card_out': 'public/images/feed_republicar/post_11_mandala_estrella_pared.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_11_mandala_estrella_pared.jpg',
        'src': 'Productos_img/atrapasuenos de pared.png',
        'crop': None,
        'collection': 'ESCULTURAS MURALES & HILORAMA',
        'title': "Mandala Ojo de Dios 'Estrella Andina'",
        'subtitle': 'Estructura octogonal en madera con rombos concéntricos sagrados',
        'badge': 'PIEZA MURAL PROTAGONISTA · DECORACIÓN CONSCIENTE',
        'warm': False, 'sharpness': 1.2, 'contrast': 1.05, 'color': 1.02
    },
    {
        'card_out': 'public/images/feed_republicar/post_12_brazalete_micro_macrame.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_12_brazalete_micro_macrame.jpg',
        'src': 'public/images/bracelet.png',
        'crop': None,
        'collection': 'JOYERÍA TEXTIL & MICRO-MACRAMÉ',
        'title': "Brazalete 'Tierra & Sándalo'",
        'subtitle': 'Micro-nudos en algodón fino y cuentas de madera noble pulida',
        'badge': 'JOYERÍA DE AUTOR · CIERRE CORREDIZO AJUSTABLE',
        'warm': False, 'sharpness': 1.2, 'contrast': 1.05, 'color': 1.02
    },
    {
        'card_out': 'public/images/feed_republicar/post_13_gran_tapiz_macrame.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_13_gran_tapiz_macrame.jpg',
        'src': 'public/images/macrame.png',
        'crop': None,
        'collection': 'ARTE MURAL & INTERIORISMO',
        'title': "Gran Tapiz Mural 'Santuario'",
        'subtitle': 'Cuerda de algodón crudo anudada sobre rama de madera noble',
        'badge': 'WARM MINIMALISM · PIEZA DE COLECCIÓN',
        'warm': False, 'sharpness': 1.2, 'contrast': 1.05, 'color': 1.02
    },
    {
        'card_out': 'public/images/feed_republicar/post_14_miniatura_crochet_barbie.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_14_miniatura_crochet_barbie.jpg',
        'src': 'public/images/instagram_originales/post_3_Photo_by_Elenvey_Creaciones_on_September.jpg',
        'crop': None,
        'collection': 'MICRO-CROCHET & EDICIÓN CURIOSIDADES',
        'title': "Miniatura Textil 'Jardín Botánico'",
        'subtitle': 'Conjunto en crochet a escala milimétrica con punto calado',
        'badge': 'PRECISIÓN MANUAL · PASIÓN POR EL TEJIDO',
        'warm': True, 'sharpness': 1.5, 'contrast': 1.10, 'color': 1.08
    },
    {
        'card_out': 'public/images/feed_republicar/post_15_colgante_ornamental_paz.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_15_colgante_ornamental_paz.jpg',
        'src': 'public/images/instagram_originales/post_13_Photo_by_Elenvey_Creaciones_on_November_.jpg',
        'crop': (0, 180, 480, 640),
        'collection': 'DETALLES DE HOGAR & TRADICIÓN',
        'title': "Colgante Ornamental 'Paz y Luz'",
        'subtitle': 'Campana tejida a crochet con ribetes dorados y borla artesanal',
        'badge': 'DETALLES CON ALMA · TALLER ELENVEY',
        'warm': True, 'sharpness': 1.6, 'contrast': 1.15, 'color': 1.10, 'denoise': 0.30
    },
    {
        'card_out': 'public/images/feed_republicar/post_16_archivo_primer_tejido.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_16_archivo_primer_tejido.jpg',
        'src': 'public/images/instagram_originales/post_1_elenvey_creaciones_s_profile_picture.jpg',
        'crop': None,
        'collection': 'MEMORIA & RAÍCES DEL TALLER',
        'title': 'El Primer Tejido: El Origen de Elenvey',
        'subtitle': 'El atrapasueños fundacional con el que comenzó nuestro viaje textil',
        'badge': 'MEMORIA DE AUTOR · DESDE EL CORAZÓN',
        'warm': True, 'sharpness': 1.4, 'contrast': 1.10, 'color': 1.08
    },
    # Studio Editorial Alternatives
    {
        'card_out': 'public/images/feed_republicar/post_01b_atrapasuenos_origen_editorial.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_01b_atrapasuenos_origen_editorial.jpg',
        'src': 'public/images/studio_editorial/editorial_atrapasuenos_origen.jpg',
        'crop': None,
        'collection': 'ESCULTURAS MURALES & EDICIÓN ESTUDIO',
        'title': "Atrapasueños Ancestral 'Sol Naciente'",
        'subtitle': 'Hilorama sagrado en tonos terracota, ocre y magenta con cuentas de madera',
        'badge': 'QUIET LUXURY ARTESANAL · PIEZA DE COLECCIÓN',
        'warm': False, 'sharpness': 1.1, 'contrast': 1.02, 'color': 1.02
    },
    {
        'card_out': 'public/images/feed_republicar/post_10b_salida_bano_resort_editorial.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_10b_salida_bano_resort_editorial.jpg',
        'src': 'public/images/studio_editorial/editorial_falda_resort_macrame.jpg',
        'crop': None,
        'collection': 'COLECCIÓN RESORT & FERIA',
        'title': "Falda de Flecos & Clutch 'Brisa Marina'",
        'subtitle': 'Macramé en algodón crudo con clutch granny square artesanal',
        'badge': 'DISEÑO DE AUTOR · HECHO A MANO EN COLOMBIA',
        'warm': False, 'sharpness': 1.1, 'contrast': 1.02, 'color': 1.02
    },
    {
        'card_out': 'public/images/feed_republicar/post_14b_miniatura_crochet_editorial.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_14b_miniatura_crochet_editorial.jpg',
        'src': 'public/images/studio_editorial/editorial_miniatura_crochet.jpg',
        'crop': None,
        'collection': 'MICRO-CROCHET & EDICIÓN ESTUDIO',
        'title': "Miniatura de Autor 'Jardín Botánico'",
        'subtitle': 'Micro-tejido en hilo fino con soporte cerámico artesanal',
        'badge': 'DEVOCIÓN POR EL DETALLE · SANTIAGO DE CALI',
        'warm': False, 'sharpness': 1.1, 'contrast': 1.02, 'color': 1.02
    },
    {
        'card_out': 'public/images/feed_republicar/post_15b_campana_ornamental_editorial.jpg',
        'fb_out': 'public/images/feed_fullbleed/foto_15b_campana_ornamental_editorial.jpg',
        'src': 'public/images/studio_editorial/editorial_campana_ornamental.jpg',
        'crop': None,
        'collection': 'DETALLES DE HOGAR & ESTUDIO',
        'title': "Campana Ornamental 'Paz y Luz'",
        'subtitle': 'Crochet fino con hebra de oro y borla sedosa hecha a mano',
        'badge': '100% ARTESANAL · ANUDADO CON EL ALMA',
        'warm': False, 'sharpness': 1.1, 'contrast': 1.02, 'color': 1.02
    }
]

for p in catalog:
    if not os.path.exists(p['src']):
        print(f"Skipping missing: {p['src']}")
        continue

    raw_img = Image.open(p['src'])
    if p['crop']:
        cropped_img = raw_img.crop(p['crop'])
    else:
        cropped_img = raw_img

    enhanced_img = enhance_image(
        cropped_img,
        warm_boost=p.get('warm', True),
        sharpness=p.get('sharpness', 1.4),
        contrast=p.get('contrast', 1.10),
        color=p.get('color', 1.08),
        denoise=p.get('denoise', 0.20)
    )

    # 1. EDITORIAL CARD (1080 x 1350)
    canvas = Image.new('RGB', (W, H), bg_color)
    draw = ImageDraw.Draw(canvas)
    draw.rectangle([32, 32, W - 32, H - 32], outline=line_col, width=1)

    draw_spaced_text(draw, 'E L E N V E Y', W // 2, 68, font_logo, charcoal, spacing=12, anchor='center')
    draw_spaced_text(draw, 'ANUDADO CON EL ALMA', W // 2, 122, font_slogan, taupe, spacing=4, anchor='center')
    draw.line([W // 2 - 100, 150, W // 2 + 100, 150], fill=line_col, width=1)
    draw.ellipse([W // 2 - 2, 149, W // 2 + 2, 153], fill=taupe)

    max_w, max_h = 880, 880
    ratio = min(max_w / enhanced_img.width, max_h / enhanced_img.height)
    new_w, new_h = int(enhanced_img.width * ratio), int(enhanced_img.height * ratio)
    img_fitted = enhanced_img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    card_x = (W - new_w) // 2
    card_y = 175 + (max_h - new_h) // 2

    shadow = Image.new('RGBA', (new_w + 30, new_h + 30), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rectangle([15, 15, new_w + 15, new_h + 15], fill=(0, 0, 0, 24))
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    canvas.paste(shadow, (card_x - 15, card_y - 8), shadow)

    canvas.paste(img_fitted, (card_x, card_y))
    draw.rectangle([card_x, card_y, card_x + new_w, card_y + new_h], outline=border_col, width=1)

    draw_spaced_text(draw, f"— {p['collection']} —", W // 2, 1100, font_col, taupe, spacing=3, anchor='center')
    draw.text((W // 2, 1145), p['title'], font=font_title, fill=charcoal, anchor='mm')
    draw.text((W // 2, 1188), p['subtitle'], font=font_sub, fill=pebble, anchor='mm')
    draw.line([W // 2 - 180, 1225, W // 2 + 180, 1225], fill=line_col, width=1)
    draw_spaced_text(draw, p['badge'], W // 2, 1245, font_badge, taupe, spacing=3, anchor='center')

    canvas.save(p['card_out'], 'JPEG', quality=95)

    # 2. FULL-BLEED 4:5 VERSION (1080 x 1350)
    fb_canvas = Image.new('RGB', (W, H), (244, 243, 240))
    fb_max_w, fb_max_h = 1080, 1350
    fb_ratio = min(fb_max_w / enhanced_img.width, fb_max_h / enhanced_img.height)
    fb_w, fb_h = int(enhanced_img.width * fb_ratio), int(enhanced_img.height * fb_ratio)
    fb_resized = enhanced_img.resize((fb_w, fb_h), Image.Resampling.LANCZOS)
    fb_x = (W - fb_w) // 2
    fb_y = (H - fb_h) // 2
    fb_canvas.paste(fb_resized, (fb_x, fb_y))

    fb_canvas.save(p['fb_out'], 'JPEG', quality=95)
    print(f"Generated: {p['card_out']} and {p['fb_out']}")

print("All master assets built successfully!")
