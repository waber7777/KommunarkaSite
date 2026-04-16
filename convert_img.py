from PIL import Image
import os

try:
    path = r"C:\Users\waber\.gemini\antigravity\brain\195283cd-6f25-425b-a216-db943e78c3cd\uploaded_media_1_1776379778927.img"
    img = Image.open(path)
    img.save(r"c:\KommunarkaSite\public\assets\solid-butterfly.png", "PNG")
    print("SUCCESS")
except Exception as e:
    print("ERROR:", e)
