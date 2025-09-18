// Simple icon generator for PWA
const fs = require('fs');
const { createCanvas } = require('canvas');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Blue background
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(0, 0, size, size);
    
    // White bus icon (simplified)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(size * 0.2, size * 0.3, size * 0.6, size * 0.4);
    ctx.fillRect(size * 0.15, size * 0.35, size * 0.7, size * 0.3);
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`icons/icon-${size}x${size}.png`, buffer);
});

console.log('Icons generated successfully!');