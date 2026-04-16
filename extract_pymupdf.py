import fitz # PyMuPDF
import os

pdf_path = "Коммунарка - каталог 22.03.2026.pdf"
out_dir = "public/assets/artworks"
os.makedirs(out_dir, exist_ok=True)

# Clear existing
for f in os.listdir(out_dir):
    file_path = os.path.join(out_dir, f)
    if os.path.isfile(file_path):
        os.remove(file_path)

doc = fitz.open(pdf_path)

page_map = {
    2: ['obj-1.png'],
    3: ['obj-2.png'],
    5: ['obj-3.png'],
    6: ['obj-4.png'],
    7: ['obj-5.png'],
    8: ['obj-6.png'],
    19: ['sc-1.png'],
    20: ['sc-2.png'],
    25: ['ik-1.png'],
    27: ['pt-1.png'],
    28: ['pt-2.png'],
    29: ['pt-3.png'],
    30: ['dr-1.png', 'dr-2.png'],
    31: ['dr-3.png'],
    32: ['fn-1.png']
}

for page_num, filenames in page_map.items():
    page = doc.load_page(page_num)
    pix = page.get_pixmap(dpi=150)
    for filename in filenames:
        pix.save(os.path.join(out_dir, filename))
        print(f"Saved {filename} from page {page_num}")

print("Extraction complete.")
