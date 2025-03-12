from PIL import Image, ImageDraw, ImageFont
import os


def generate_referral_image(template_path, output_path, referral_code):
    # Cargar la plantilla base
    image = Image.open(template_path)
    draw = ImageDraw.Draw(image)

    # Definir la fuente y tamaño del texto (ajusta según tu plantilla)
    # Asegúrate de que esta fuente esté disponible o usa una alternativa
    font_path = "arial.ttf"
    font_size = 40
    font = ImageFont.truetype(font_path, font_size)

    # Coordenadas del área verde para el código de referido (ajusta según la plantilla)
    x, y = 400, 630  # Posición aproximada del cuadro verde oscuro en tu imagen

    # Insertar el código en la imagen
    draw.text((x, y), referral_code, fill="white", font=font)

    # Guardar la imagen personalizada
    if not os.path.exists(output_path):
        os.makedirs(output_path)
    output_file = os.path.join(output_path, f"referral_{referral_code}.png")
    image.save(output_file)
    print(f"Image saved: {output_file}")


# Ejemplo de uso
# Ruta completa a la plantilla
template_path = "D:/Repositorio/CleaningEstimating/frontend/public/assets/Refer_Your_Friend_MCJS.png"
# Ruta completa de la carpeta de salida
output_path = "D:/Repositorio/CleaningEstimating/frontend/public/generated_referral_images"

# Generar los códigos de referido desde MCJ032025001 hasta MCJ032025040
referral_codes = [f"MCJ032025{str(i).zfill(3)}" for i in range(1, 41)]

# Generar imágenes para cada código
for code in referral_codes:
    generate_referral_image(template_path, output_path, code)
