const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const path = require('path');

async function extractImages() {
    const pdfPath = path.join(__dirname, 'Коммунарка - каталог 22.03.2026.pdf');
    const outDir = path.join(__dirname, 'public', 'assets', 'artworks');

    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    // Clear existing images
    fs.readdirSync(outDir).forEach(f => fs.unlinkSync(path.join(outDir, f)));

    console.log('Loading PDF...');
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    // Map page index (0-based) to target filename
    // Based on previous analysis:
    // Page 2 (idx 2) = obj-1.png (Танец 1)
    // Page 3 (idx 3) = obj-2.png (Танец 2)
    // Page 5 (idx 5) = obj-3.png (Танец 3)
    // Page 6 (idx 6) = obj-4.png (Танец 4)
    // Page 7 (idx 7) = obj-5.png (Танец 5)
    // Page 8 (idx 8) = obj-6.png (Танец 6)
    // Page 19 (idx 19) = sc-1.png (Тотем 1)
    // Page 20 (idx 20) = sc-2.png (Тотем 2)
    // Page 25 (idx 25) = ik-1.png (Икебана 1)
    // Page 27 (idx 27) = pt-1.png (Самовар Дымок)
    // Page 28 (idx 28) = pt-3.png (Самовар Японка)
    // Page 29 (idx 29) = dr-1.png (Кабуки)
    // Page 30 (idx 30) = dr-3.png (Комьюнити)
    // Page 32 (idx 32) = fn-1.png (Светильник)

    const pageMap = {
        2: 'obj-1.png',
        3: 'obj-2.png',
        5: 'obj-3.png',
        6: 'obj-4.png',
        7: 'obj-5.png',
        8: 'obj-6.png',
        19: 'sc-1.png',
        20: 'sc-2.png',
        25: 'ik-1.png',
        27: 'pt-1.png',
        28: 'pt-3.png',
        29: 'dr-1.png',
        30: 'dr-3.png',
        32: 'fn-1.png'
    };

    console.log('Extracting images from mapped pages...');

    // Use pdf.js to render pages to images since pdf-lib doesn't extract page renders easily for complex PDFs
    // However, since we already have screenshots in .tempmediaStorage from our previous views, it is much more reliable to map THOSE.
    // Let's use the explicit screenshots we already took of the PDF pages.

    const artifactDir = "C:\\Users\\waber\\.gemini\\antigravity\\brain\\195283cd-6f25-425b-a216-db943e78c3cd\\.tempmediaStorage";

    // Found from list_dir output on temp media
    const screenshotMap = {
        // Page 3 (0-indexed 2) - Танец 1
        'obj-1.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776331551494.png',
        // Page 4 (0-indexed 3) - Танец 2
        'obj-2.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776331556010.png',
        // Page 6 (0-indexed 5) - Танец 3
        'obj-3.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776332724368.png',
        // Page 7 (0-indexed 6) - Танец 4
        'obj-4.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776332729395.png',
        // Page 8 (0-indexed 7) - Танец 5
        'obj-5.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776332752156.png',
        // Page 9 (0-indexed 8) - Танец 6
        'obj-6.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776332759341.png',
        // Page 20 (0-indexed 19) - Тотем 1
        'sc-1.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776333464257.png',
        // Page 21 (0-indexed 20) - Тотем 2
        'sc-2.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776333472991.png',
        // Page 26 (0-indexed 25) - Икебана 1
        'ik-1.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776335031850.png',
        // Page 28 (0-indexed 27) - Самовар Дымок
        'pt-1.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776335053653.png',
        // Page 28 (right side) - Самовар Зверь
        'pt-2.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776335057349.png',
        // Page 29 (0-indexed 28) - Самовар Японка
        'pt-3.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776335069976.png',
        // Page 30 (0-indexed 29) - Кабуки
        'dr-1.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776335095445.png',
        // Page 30 (right side) - Эскиз пара
        'dr-2.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776335102044.png',
        // Page 31 (0-indexed 30) - Комьюнити
        'dr-3.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776335113813.png',
        // Page 33 (0-indexed 32) - Светильник
        'fn-1.png': 'media_195283cd-6f25-425b-a216-db943e78c3cd_1776335609322.png'
    };

    let count = 0;
    for (const [targetName, sourceFile] of Object.entries(screenshotMap)) {
        const fullSource = path.join(artifactDir, sourceFile);
        if (fs.existsSync(fullSource)) {
            fs.copyFileSync(fullSource, path.join(outDir, targetName));
            console.log(`Copied ${targetName} from ${sourceFile}`);
            count++;
        } else {
            console.error(`ERROR: Source file not found for ${targetName}: ${fullSource}`);
        }
    }

    console.log(`Extraction complete. Copied ${count} images.`);
}

extractImages().catch(console.error);
