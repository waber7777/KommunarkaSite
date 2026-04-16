import fitz
doc = fitz.open(r'C:\KommunarkaSite\Коммунарка - каталог 22.03.2026.pdf')
fonts = set()
for page in doc:
    for f in page.get_fonts():
        fonts.add(f[3])
print("FONTS USED IN PDF:")
for font in fonts:
    print(font)
