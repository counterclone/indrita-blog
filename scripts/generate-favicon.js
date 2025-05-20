const fs = require('fs');
const sharp = require('sharp');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="16" fill="#3B82F6" />
  <path d="M9 10L23 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  <path d="M9 16L19 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  <path d="M9 22L15 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  <circle cx="25" cy="16" r="2" fill="white" />
  <circle cx="21" cy="22" r="2" fill="white" />
</svg>`;

const sizes = [16, 32, 48, 64, 128, 256];

async function generateFavicons() {
  // Ensure the public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }

  // Create PNG files for various sizes
  for (const size of sizes) {
    const pngBuffer = await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .toFormat('png')
      .toBuffer();
    fs.writeFileSync(`public/favicon-${size}x${size}.png`, pngBuffer);

    // Also save the 32x32 version as favicon.png
    if (size === 32) {
      fs.writeFileSync('public/favicon.png', pngBuffer);
    }
  }

  // Create apple-touch-icon
  const appleIconBuffer = await sharp(Buffer.from(svgContent))
    .resize(180, 180)
    .toFormat('png')
    .toBuffer();
  fs.writeFileSync('public/apple-touch-icon.png', appleIconBuffer);
}

generateFavicons().catch(console.error); 