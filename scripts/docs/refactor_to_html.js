const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'app', 'docs');
const dirs = fs.readdirSync(docsDir);

for (const dir of dirs) {
  const dirPath = path.join(docsDir, dir);
  if (!fs.statSync(dirPath).isDirectory()) continue;
  
  const tsPath = path.join(dirPath, 'content.ts');
  const htmlPath = path.join(dirPath, 'content.html');
  const pagePath = path.join(dirPath, 'page.tsx');
  
  if (fs.existsSync(tsPath)) {
    const tsContent = fs.readFileSync(tsPath, 'utf8');
    const idxStart = tsContent.indexOf('`');
    const idxEnd = tsContent.lastIndexOf('`');
    if (idxStart !== -1 && idxEnd !== -1 && idxEnd > idxStart) {
      const htmlContent = tsContent.substring(idxStart + 1, idxEnd);
      fs.writeFileSync(htmlPath, htmlContent);
      fs.unlinkSync(tsPath);
    }
  }
  
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Remove "use client";
    content = content.replace(/"use client";[\r\n]*/, '');
    
    // Replace import
    if (content.includes('import { htmlContent } from "./content";')) {
      content = content.replace('import { htmlContent } from "./content";', 'import fs from "fs";\nimport path from "path";');
    }
    
    // Insert fs.readFileSync
    const injectStr = `\n  const htmlContent = fs.readFileSync(path.join(process.cwd(), 'app/docs/${dir}/content.html'), 'utf8');`;
    const fnDecl = 'export default function DocPage() {';
    if (content.includes(fnDecl) && !content.includes('fs.readFileSync')) {
      content = content.replace(fnDecl, fnDecl + injectStr);
    }
    
    fs.writeFileSync(pagePath, content);
    console.log('Refactored to HTML:', dir);
  }
}
