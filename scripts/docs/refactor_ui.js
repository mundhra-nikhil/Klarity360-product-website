const fs = require('fs');
const path = require('path');

// Fix app/docs/page.tsx Links
let docsPagePath = 'app/docs/page.tsx';
let content = fs.readFileSync(docsPagePath, 'utf8');

// Replace standard links
content = content.replace(/<a href="\/docs\/([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g, '<Link href="/docs/$1"$2>$3</Link>');

fs.writeFileSync(docsPagePath, content);
console.log('Fixed app/docs/page.tsx links');

// Fix Nav across all docs pages
const docsDir = path.join(__dirname, 'app', 'docs');
const dirs = fs.readdirSync(docsDir);

for (const dir of dirs) {
  const dirPath = path.join(docsDir, dir);
  if (!fs.statSync(dirPath).isDirectory()) continue;
  
  const pagePath = path.join(dirPath, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let subContent = fs.readFileSync(pagePath, 'utf8');
    subContent = subContent.replace('className="relative h-[68px]', 'className="sticky top-0 h-[68px]');
    
    // While we are at it, we should add Link for "Back to Manuals" if it's an <a>
    if (subContent.includes('<a href="/docs"')) {
      if (!subContent.includes('import Link from "next/link";')) {
         subContent = subContent.replace('import { useEffect, useState } from "react";', 'import { useEffect, useState } from "react";\nimport Link from "next/link";');
         // Or if they don't have that import:
         if (!subContent.includes('import Link')) {
             subContent = 'import Link from "next/link";\n' + subContent;
         }
      }
      subContent = subContent.replace(/<a href="\/docs"([^>]*)>([\s\S]*?)<\/a>/g, '<Link href="/docs"$1>$2</Link>');
    }
    
    fs.writeFileSync(pagePath, subContent);
  }
}
console.log('Fixed subpages Nav and Links');
