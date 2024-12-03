const fs = require('fs');
const sharp = require('sharp');
const { encode } = require('blurhash');
const path = require('path');

async function generateBlurHash(imagePath) {
    const image = await sharp(imagePath)
        .raw()
        .ensureAlpha();

    const { info } = await image.toBuffer({ resolveWithObject: true });

    let width = info.width;
    let height = info.height;

    const maxSize = 320;
    if(width > maxSize || height > maxSize) {
        const ratio = width / maxSize;
        width = Math.floor(width / ratio);
        height = Math.floor(height / ratio);
    }

    image
        .resize({
            width,
            height
        });

    const { data } = await image.toBuffer({ resolveWithObject: true });

    const blurHash = encode(data, width, height, 4, 3);
    return blurHash;
}

(async () => {
    console.log("Blurhash generation started");

    const basePath = "../../static/products";

    const files = fs.readdirSync(path.join(__dirname, basePath)).filter(file => !file.endsWith(".blurhash.txt"));

    console.log("Found " + files.length + " files");

    const datasetPath = path.join(__dirname, "../../src/lib/blurhash.json");
    const dataset = JSON.parse(fs.readFileSync(datasetPath));

    for(const file of files) {
        const blurHash = await generateBlurHash(path.join(__dirname, basePath, file));

        dataset[file] = blurHash;
        fs.writeFileSync(datasetPath, JSON.stringify(dataset, null, 4));

        console.log("Blurhash generated for ", file);
    }

    console.log("Blurhash generation finished");
})();