python3 -c "
import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

os.makedirs('public/images/feed_republicar', exist_ok=True)

posts_meta = [
    {
        'src': 'public/images/instagram_originales/post_5_Photo_by_Elenvey_Creaciones_on_August_23.jpg',
        'out': 'public/images/feed_republicar/post_01_atrapasuenos_7chakras.jpg',
        'collection': 'SERIE 7 CHAKRAS & ARMONIZACIÓN',
        'title': 'Atrapasueños Sagrado 7 Chakras',
        'subtitle': 'Hilorama en aro de bambú natural y borlas con cuentas de madera',
        'badge': 'HECHO A MANO EN CALI · PIEZA DE AUTOR'
    },
    {
        'src': 'public/images/instagram_originales/post_8_Photo_by_Elenvey_Creaciones_on_January_1.jpg',
        'out': 'public/images/feed_republicar/post_02_chaleco_granny_squares.jpg',
        'collection': 'COLECCIÓN INDUMENTARIA DE AUTOR',
        'title': 'Chaleco Granny Squares \'Sol de Otoño\'',
        'subtitle': 'Tejido artesanal en cuadros vintage · Tonos oliva, mostaza y terracota',
        'badge': '100% ALGODÓN PEINADO · EDICIÓN LIMITADA'
    },
    {
        'src': 'public/images/instagram_originales/post_6_Photo_by_Elenvey_Creaciones_on_March_23_.jpg',
        'out': 'public/images/feed_republicar/post_03_bandana_margaritas_playa.jpg',
        'collection': 'COMPLEMENTOS & ESTILO DE VIDA',
        'title': 'Bandana Floral \'Brisa de Mar\'',
        'subtitle': 'Pañoleta tejida a crochet con margaritas en relieve',
        'badge': 'ACCESORIO DE AUTOR · LIGERA Y TRANSPIRABLE'
    },
    {
        'src': 'public/images/instagram_originales/post_4_Photo_by_Elenvey_Creaciones_on_September.jpg',
        'out': 'public/images/feed_republicar/post_04_chaleco_calado_verano.jpg',
        'collection': 'INDUMENTARIA & FIBRAS NATURALES',
        'title': 'Chaleco Calado \'Duna\' en Hilo Crudo',
        'subtitle': 'Punto abierto con franjas sutiles en lino y terracota',
        'badge': 'TEJIDO CON PACIENCIA · DISEÑO ATEMPORAL'
    },
    {
        'src': 'public/images/instagram_originales/post_11_Photo_by_Elenvey_Creaciones_on_November_.jpg',
        'out': 'public/images/feed_republicar/post_05_top_campesino_crochet.jpg',
        'collection': 'COLECCIÓN VERANO BOHEMIO',
        'title': 'Top Campesino en Crochet Oliva',
        'subtitle': 'Hombros descubiertos y mangas en red artesanal calada',
        'badge': 'DISEÑO EXCLUSIVO · HECHO SOBRE MEDIDAS'
    },
    {
        'src': 'public/images/instagram_originales/post_12_Photo_by_Elenvey_Creaciones_on_November_.jpg',
        'out': 'public/images/feed_republicar/post_06_clutch_granny_squares.jpg',
        'collection': 'ACCESORIOS & BOLSOS DE MANO',
        'title': 'Clutch \'Flores de Cali\' con Borla',
        'subtitle': 'Bolso sobre en granny squares con forro interior y cremallera',
        'badge': 'ARTESANÍA URBANA · CIERRE DE ALGODÓN'
    },
    {
        'src': 'public/images/instagram_originales/post_7_Photo_by_Elenvey_Creaciones_on_March_07_.jpg',
        'out': 'public/images/feed_republicar/post_07_bandana_crochet_camel.jpg',
        'collection': 'COMPLEMENTOS & ESTILO DE VIDA',
        'title': 'Bandana \'Tierra Cálida\' en Crochet',
        'subtitle': 'Tono camel tostado con margarita central tejida',
        'badge': 'TALLER TEXTIL · SANTIAGO DE CALI'
    },
    {
        'src': 'public/images/instagram_originales/post_2_Photo_by_Elenvey_Creaciones_on_September.jpg',
        'out': 'public/images/feed_republicar/post_08_porta_termo_macrame.jpg',
        'collection': 'VIDA CONSCIENTE & HOGAR',
        'title': 'Porta Termo Macramé \'Salvia\'',
        'subtitle': 'Malla elástica tejida a mano con correa adaptable',
        'badge': 'SLOW LIVING · REUTILIZABLE Y RESISTENTE'
    },
    {
        'src': 'public/images/instagram_originales/post_9_Photo_by_Elenvey_Creaciones_on_December_.jpg',
        'out': 'public/images/feed_republicar/post_09_chaleco_bebe_floral.jpg',
        'collection': 'LÍNEA INFANTIL & RECIÉN NACIDO',
        'title': 'Chaleco Mini Floral \'Primer Abrazo\'',
        'subtitle': 'Hilado hipoalergénico extrasuave en tonos pastel y flores en relieve',
        'badge': 'CUIDADO Y TERNURA · 100% ARTESANAL'
    },
    {
        'src': 'public/images/instagram_originales/post_10_Video_by_Elenvey_Creaciones_on_November_.jpg',
        'out': 'public/images/feed_republicar/post_10_salida_bano_macrame.jpg',
        'collection': 'FERIA ARTESANAL & RESORT',
        'title': 'Salida de Baño y Falda en Macramé',
        'subtitle': 'Flecos largos y caída fluida tejida en nudos calados',
        'badge': 'CREACIONES DE AUTOR · CALI, COLOMBIA'
    },
    {
        'src': 'Productos_img/atrapasuenos de pared.png',
        'out': 'public/images/feed_republicar/post_11_mandala_estrella_pared.jpg',
        'collection': 'ESCULTURAS MURALES & HILORAMA',
        'title': 'Mandala Ojo de Dios \'Estrella Andina\'',
        'subtitle': 'Estructura octogonal en madera con rombos concéntricos sagrados',
        'badge': 'PIEZA MURAL PROTAGONISTA · DECORACIÓN CONSCIENTE'
    },
    {
        'src': 'public/images/bracelet.png',
        'out': 'public/images/feed_republicar/post_12_brazalete_micro_macrame.jpg',
        'collection': 'JOYERÍA TEXTIL & MICRO-MACRAMÉ',
        'title': 'Brazalete \'Tierra & Sándalo\'',
        'subtitle': 'Micro-nudos en algodón fino y cuentas de madera pulida',
        'badge': 'JOYERÍA DE AUTOR · CIERRE CORREDIZO AJUSTABLE'
    },
    {
        'src': 'public/images/macrame.png',
        'out': 'public/images/feed_republicar/post_13_gran_tapiz_macrame.jpg',
        'collection': 'ARTE MURAL & INTERIORISMO',
        'title': 'Gran Tapiz Mural \'Santuario\'',
        'subtitle': 'Cuerda de algodón crudo anudada sobre rama de madera noble',
        'badge': 'WARM MINIMALISM · PIEZA DE COLECCIÓN'
    }
]

W, H = 1080, 1350
bg_color = (248, 247, 244) # #F8F7F4 Pure Canvas
card_border_color = (226, 224, 218)
header_color = (42, 42, 42)
accent_color = (140, 118, 97)
muted_color = (100, 98, 95)
line_color = (220, 218, 212)

font_logo = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 38)
font_col = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 13)
font_title = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 28)
font_sub = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 15)
font_badge = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 12)

def draw_spaced_text(draw, text, x, y, font, fill, spacing=6, anchor='center'):
    # compute total width
    total_w = sum(draw.textlength(c, font=font) + spacing for c in text) - spacing
    cur_x = x - total_w / 2 if anchor == 'center' else x
    for c in text:
        draw.text((cur_x, y), c, font=font, fill=fill)
        cur_x += draw.textlength(c, font=font) + spacing

for idx, p in enumerate(posts_meta):
    if not os.path.exists(p['src']):
        print(f'Warning: {p[\"src\"]} not found, skipping.')
        continue
    
    # 1. Base Canvas
    canvas = Image.new('RGB', (W, H), bg_color)
    draw = ImageDraw.Draw(canvas)
    
    # Subtle outer frame
    draw.rectangle([30, 30, W - 30, H - 30], outline=line_color, width=1)
    
    # 2. Header Section
    # Logo text with generous tracking
    draw_spaced_text(draw, 'ELENVEY', W // 2, 70, font_logo, header_color, spacing=10, anchor='center')
    draw_spaced_text(draw, 'TALLER TEXTIL · SANTIAGO DE CALI', W // 2, 128, font_col, accent_color, spacing=4, anchor='center')
    
    # Divider line
    draw.line([W // 2 - 120, 160, W // 2 + 120, 160], fill=line_color, width=1)
    draw.ellipse([W // 2 - 2, 159, W // 2 + 2, 163], fill=accent_color)
    
    # 3. Product Photo Card
    # Viewport size: 920w x 860h
    card_x, card_y = 80, 190
    card_w, card_h = 920, 860
    
    img = Image.open(p['src']).convert('RGB')
    
    # Enhance photo for studio look: boost contrast, subtle color and sharpness
    enhancer_con = ImageEnhance.Contrast(img)
    img = enhancer_con.enhance(1.14)
    enhancer_col = ImageEnhance.Color(img)
    img = enhancer_col.enhance(1.08)
    enhancer_sha = ImageEnhance.Sharpness(img)
    img = enhancer_sha.enhance(1.3)
    
    # Crop / Fit to card viewport with center crop
    src_ratio = img.width / img.height
    target_ratio = card_w / card_h
    if src_ratio > target_ratio:
        # source is wider
        new_h = img.height
        new_w = int(img.height * target_ratio)
        left = (img.width - new_w) // 2
        img_cropped = img.crop((left, 0, left + new_w, new_h))
    else:
        # source is taller
        new_w = img.width
        new_h = int(img.width / target_ratio)
        top = (img.height - new_h) // 2
        img_cropped = img.crop((0, top, new_w, top + new_h))
        
    img_resized = img_cropped.resize((card_w, card_h), Image.Resampling.LANCZOS)
    
    # Soft drop shadow for photo card
    shadow = Image.new('RGBA', (card_w + 40, card_h + 40), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rectangle([20, 20, card_w + 20, card_h + 20], fill=(0, 0, 0, 30))
    shadow = shadow.filter(ImageFilter.GaussianBlur(12))
    canvas.paste(shadow, (card_x - 20, card_y - 10), shadow)
    
    # Paste photo
    canvas.paste(img_resized, (card_x, card_y))
    # Photo border
    draw.rectangle([card_x, card_y, card_x + card_w, card_y + card_h], outline=card_border_color, width=1)
    
    # 4. Footer Section (Editorial Details)
    # Collection Name
    draw_spaced_text(draw, f'— {p[\"collection\"]} —', W // 2, 1090, font_col, accent_color, spacing=3, anchor='center')
    
    # Title
    draw.text((W // 2, 1140), p['title'], font=font_title, fill=header_color, anchor='mm')
    
    # Subtitle
    draw.text((W // 2, 1185), p['subtitle'], font=font_sub, fill=muted_color, anchor='mm')
    
    # Bottom Badge
    draw.line([W // 2 - 200, 1225, W // 2 + 200, 1225], fill=line_color, width=1)
    draw_spaced_text(draw, p['badge'], W // 2, 1245, font_badge, accent_color, spacing=3, anchor='center')
    
    # Save high-res JPG
    canvas.save(p['out'], 'JPEG', quality=95)
    print(f'Successfully generated: {p[\"out\"]}')

print('ALL 13 EDITORIAL FEED POSTS GENERATED!')
"