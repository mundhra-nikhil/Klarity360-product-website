const fs = require('fs');
const path = require('path');

const projectRoot = 'c:\\Users\\Int202613\\Documents\\Github\\Klarity360-product-website';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
            if (!['node_modules', '.git', '.next'].includes(f)) {
                walkDir(dirPath, callback);
            }
        } else {
            callback(dirPath);
        }
    });
}

let files = [];
walkDir(projectRoot, (filePath) => files.push(filePath));

// 1. Rename files
files.forEach(filePath => {
    const filename = path.basename(filePath);
    if (filename.toLowerCase().includes('klarity360')) {
        const newFilename = filename.replace(/klarity360/ig, match => match[0] === 'k' ? 'klarity360' : 'Klarity360');
        const newPath = path.join(path.dirname(filePath), newFilename);
        fs.renameSync(filePath, newPath);
        console.log(`Renamed: ${filename} -> ${newFilename}`);
    }
});

// Refresh file list
files = [];
walkDir(projectRoot, (filePath) => files.push(filePath));

// 2. Replace content
files.forEach(filePath => {
    if (filePath.endsWith('.svg') || filePath.endsWith('.png') || filePath.endsWith('.mp4')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        if (filePath.includes('constants.ts')) return; // skip our new constants file

        let needsProduct = false;
        let needsBase = false;

        // Remove local BASE_PATH
        if (content.includes('const BASE_PATH = "/klarity360-product-website";')) {
            content = content.replace(/const BASE_PATH = "\/klarity360-product-website";\r?\n?/g, '');
            needsBase = true;
        }

        // Replace Klarity360 strings in code, carefully.
        // We will look for "Klarity360 " -> `${PRODUCT_NAME} ` inside string literals.
        // But since this is a simple script, let's use a straightforward approach:
        
        // For titles
        content = content.replace(/\| Klarity360 Solutions/g, '| ${PRODUCT_NAME} Solutions');
        content = content.replace(/\| Klarity360 Documentation/g, '| ${PRODUCT_NAME} Documentation');
        content = content.replace(/"Klarity360 - Insight Agent"/g, '`${PRODUCT_NAME} - Insight Agent`');
        content = content.replace(/"Klarity360 puts the/g, '`${PRODUCT_NAME} puts the');
        
        // For raw JSX text
        content = content.replace(/>\s*Klarity360\s*</g, '> {PRODUCT_NAME} <');
        content = content.replace(/>\s*Klarity360 puts the/g, '> {PRODUCT_NAME} puts the');
        content = content.replace(/Klarity360 is now available/g, '{PRODUCT_NAME} is now available');
        content = content.replace(/use Klarity360 products/g, 'use {PRODUCT_NAME} products');
        
        // For aria-label
        content = content.replace(/"Klarity360 feature tabs"/g, '{`${PRODUCT_NAME} feature tabs`}');
        
        // Inside manifest.ts and videoChapters.ts (these are objects with strings)
        if (filePath.includes('manifest.ts') || filePath.includes('videoChapters.ts')) {
            content = content.replace(/"Klarity360 /g, '`${PRODUCT_NAME} ');
            content = content.replace(/"Klarity360"/g, 'PRODUCT_NAME');
            content = content.replace(/ Klarity360/g, ' ${PRODUCT_NAME}');
            content = content.replace(/Klarity360 /g, '${PRODUCT_NAME} ');
            // Fix any weird string concatenations it might have caused
            content = content.replace(/`\$\{PRODUCT_NAME\} `\$\{PRODUCT_NAME\} /g, '`${PRODUCT_NAME} '); // cleanup
            
            // To be safe for these data files, let's just do a blanket replace for now, 
            // but making everything template literals is tough with a simple regex. 
            // Instead, let's convert double quotes containing Klarity360 to template literals.
            content = content.replace(/"([^"]*?)Klarity360([^"]*?)"/g, (match, p1, p2) => {
                return '`' + p1 + '${PRODUCT_NAME}' + p2 + '`';
            });
        }

        // Base path usages
        if (content.includes('${BASE_PATH}/klarity360-demo.mp4')) {
            content = content.replace(/\$\{BASE_PATH\}\/klarity360-demo.mp4/g, '${BASE_PATH}/klarity360-demo.mp4');
            needsBase = true;
        }

        if (content !== original) {
            needsProduct = content.includes('PRODUCT_NAME');
            needsBase = content.includes('BASE_PATH');

            let imports = [];
            if (needsProduct) imports.push('PRODUCT_NAME');
            if (needsBase) imports.push('BASE_PATH');

            if (imports.length > 0) {
                const importStmt = `import { ${imports.join(', ')} } from '@/lib/constants';\n`;
                // Add import after the first block of imports or at the top
                const lines = content.split('\n');
                let insertIdx = 0;
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].startsWith('import ')) {
                        insertIdx = i + 1;
                    }
                }
                lines.splice(insertIdx, 0, importStmt);
                content = lines.join('\n');
            }
        }
    } else if (filePath.endsWith('.md') || filePath.endsWith('.mdx') || filePath.endsWith('.json') || filePath.endsWith('.yml') || filePath.endsWith('.js') || filePath.endsWith('.mjs') || filePath.endsWith('Makefile')) {
        // Generic replace for non-code files
        content = content.replace(/Klarity360/g, 'Klarity360');
        content = content.replace(/klarity360/g, 'klarity360');
        content = content.replace(/KLARITY360/g, 'KLARITY360');
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${path.basename(filePath)}`);
    }
});
console.log("Migration complete.");
