const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'app', 'docs');
const dirs = fs.readdirSync(docsDir);

for (const dir of dirs) {
  const dirPath = path.join(docsDir, dir);
  if (!fs.statSync(dirPath).isDirectory()) continue;
  
  const htmlPath = path.join(dirPath, 'content.html');
  const jsonPath = path.join(dirPath, 'content.json');
  const pagePath = path.join(dirPath, 'page.tsx');
  
  if (fs.existsSync(htmlPath)) {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const jsonObj = { html: htmlContent };
    fs.writeFileSync(jsonPath, JSON.stringify(jsonObj));
    fs.unlinkSync(htmlPath);
  }
  
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Replace fs imports
    content = content.replace('import fs from "fs";\nimport path from "path";', 'import contentData from "./content.json";');
    content = content.replace('import fs from "fs";\r\nimport path from "path";', 'import contentData from "./content.json";');
    
    // Remove readFileSync line
    const regex = /^\s*const htmlContent\s*=\s*fs\.readFileSync[^;]+;\r?\n?/m;
    content = content.replace(regex, '');
    
    // Update dangerouslySetInnerHTML
    content = content.replace('dangerouslySetInnerHTML={{ __html: htmlContent }}', 'dangerouslySetInnerHTML={{ __html: contentData.html }}');
    
    fs.writeFileSync(pagePath, content);
    console.log('Refactored to JSON:', dir);
  }
}
