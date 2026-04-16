import fitz

pdf_path = "Коммунарка - каталог 22.03.2026.pdf"
doc = fitz.open(pdf_path)

with open("catalog_text_dump.txt", "w", encoding="utf-8") as f:
    for i, page in enumerate(doc):
        text = page.get_text()
        if text.strip():
            f.write(f"--- Page {i} ---\n")
            f.write(text.strip() + "\n\n")

print("Text extraction complete. See catalog_text_dump.txt")
