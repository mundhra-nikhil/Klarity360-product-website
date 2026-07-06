const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'app', 'docs');
const dirs = fs.readdirSync(docsDir);

for (const dir of dirs) {
  const dirPath = path.join(docsDir, dir);
  if (!fs.statSync(dirPath).isDirectory()) continue;
  
  const pagePath = path.join(dirPath, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  const searchStr = 'dangerouslySetInnerHTML={{ __html: `';
  const idx = content.indexOf(searchStr);
  if (idx !== -1) {
    const endIdx = content.indexOf('` }}', idx + searchStr.length);
    if (endIdx !== -1 && endIdx > idx) {
      const htmlString = content.substring(idx + searchStr.length, endIdx);
      
      const tsContent = 'export const htmlContent = `' + htmlString + '`;\n';
      fs.writeFileSync(path.join(dirPath, 'content.ts'), tsContent);
      
      const prefix = content.substring(0, idx);
      const suffix = content.substring(endIdx + 4);
      let newContent = prefix + 'dangerouslySetInnerHTML={{ __html: htmlContent }}' + suffix;
      
      if (!newContent.includes('import { htmlContent }')) {
        const lines = newContent.split('\n');
        let lastImportIdx = 0;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('import ')) lastImportIdx = i;
        }
        lines.splice(lastImportIdx + 1, 0, 'import { htmlContent } from "./content";');
        newContent = lines.join('\n');
      }
      
      fs.writeFileSync(pagePath, newContent);
      console.log('Refactored', dir);
    }
  }
}
