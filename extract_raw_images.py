import fitz
import os

pdf_path = "Коммунарка - каталог 22.03.2026.pdf"
out_dir = ".raw_images"
os.makedirs(out_dir, exist_ok=True)

for f in os.listdir(out_dir):
    os.remove(os.path.join(out_dir, f))

doc = fitz.open(pdf_path)

img_count = 0
for i in range(len(doc)):
    for img in doc.get_page_images(i):
        xref = img[0]
        pix = fitz.Pixmap(doc, xref)
        
        # Skip small icons or backgrounds
        if pix.width < 400 or pix.height < 400:
            continue
            
        if pix.n - pix.alpha > 3: # CMYK to RGB
            pix = fitz.Pixmap(fitz.csRGB, pix)
            
        pix.save(os.path.join(out_dir, f"page{i}_img{xref}.png"))
        img_count += 1

print(f"Extracted {img_count} raw images.")
