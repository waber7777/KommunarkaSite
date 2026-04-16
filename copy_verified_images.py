import os
import shutil

src_dir = ".raw_images"
dst_dir = "public/assets/artworks"

os.makedirs(dst_dir, exist_ok=True)
for f in os.listdir(dst_dir):
    os.remove(os.path.join(dst_dir, f))

page_images = {
    2: "page2_img16.png",
    3: "page3_img29.png",
    4: "page4_img42.png", 
    5: "page5_img55.png",
    6: "page6_img68.png",
    7: "page7_img81.png",
    8: "page8_img94.png",
    9: "page9_img107.png",
    10: "page10_img120.png",
    11: "page11_img133.png",
    12: "page12_img146.png",
    13: "page13_img170.png",
    14: "page14_img194.png",
    15: "page15_img218.png",
    16: "page16_img242.png",
    17: "page17_img266.png",
    19: "page19_img290.png",
    20: "page20_img314.png",
    21: "page21_img327.png",
    22: "page22_img348.png",
    23: "page23_img372.png",
    25: "page25_img399.png",
    27: "page27_img419.png",
    28: "page28_img445.png",
    29: "page29_img460.png",
    30: "page30_img479.png",
    32: "page32_img499.png",
    34: "page34_img519.png",
    35: "page35_img545.png"
}

count = 0
for page, img in page_images.items():
    src = os.path.join(src_dir, img)
    if os.path.exists(src):
        dst = os.path.join(dst_dir, f"page_{page}.png")
        shutil.copy(src, dst)
        count += 1
    else:
        print(f"Missing {img}")

print(f"Copied {count} raw photos reliably.")
