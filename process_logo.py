import os
from PIL import Image
import numpy as np

imgpath1 = r"C:\Users\waber\.gemini\antigravity\brain\195283cd-6f25-425b-a216-db943e78c3cd\media__1776367497659.png"
imgpath2 = r"C:\Users\waber\.gemini\antigravity\brain\195283cd-6f25-425b-a216-db943e78c3cd\media__1776367442269.png"

i1 = Image.open(imgpath1)
i2 = Image.open(imgpath2)

# The standalone logo is square-ish. The wordmark is very wide (aspect ratio > 5).
if i1.size[0] / float(i1.size[1]) < 2:
    logo = i1
else:
    logo = i2

print(f"Selected standalone logo with size: {logo.size}")
img = logo.convert("RGBA")
data = np.array(img)

r, g, b, a = data.T
white_areas = (r > 240) & (g > 240) & (b > 240)
data[..., 3][white_areas.T] = 0

solid_areas = (data[..., 3] > 50)
data[..., 0][solid_areas] = 0
data[..., 1][solid_areas] = 0
data[..., 2][solid_areas] = 0
data[..., 3][solid_areas] = 255

out_img = Image.fromarray(data)
bbox = out_img.getbbox()
if bbox:
    out_img = out_img.crop(bbox)
os.makedirs("public/assets", exist_ok=True)
out_img.save("public/assets/logo-k.png")
print("Saved cropped standalone logo-k.png as a mask.")
