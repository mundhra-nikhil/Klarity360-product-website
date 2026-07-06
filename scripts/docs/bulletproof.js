const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'app', 'docs');
const dirs = fs.readdirSync(docsDir);

for (const dir of dirs) {
  const dirPath = path.join(docsDir, dir);
  if (!fs.statSync(dirPath).isDirectory()) continue;
  
  const pagePath = path.join(dirPath, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Left Sidebar
    content = content.replace(
      /className="hidden md:flex flex-col sticky top-\[68px\] h-\[calc\(100vh-68px\)\] w-\[280px\] border-r border-white\/5 bg-\[#050505\]\/50 backdrop-blur-xl shrink-0 overflow-y-auto scrollbar-hide py-8 px-6"/g,
      `className="hidden md:flex flex-col sticky shrink-0 overflow-y-auto py-8 px-6 border-r border-white/5 bg-black/50 backdrop-blur-xl" style={{ top: '68px', height: 'calc(100vh - 68px)', width: '280px' }}`
    );
    
    // Right Sidebar
    content = content.replace(
      /className="hidden xl:block w-\[240px\] shrink-0 sticky top-\[68px\] h-\[calc\(100vh-68px\)\] overflow-y-auto scrollbar-hide py-12 px-6 border-l border-white\/5"/g,
      `className="hidden xl:block shrink-0 sticky overflow-y-auto py-12 px-6 border-l border-white/5" style={{ top: '68px', height: 'calc(100vh - 68px)', width: '240px' }}`
    );
    
    // Max Width
    content = content.replace(/max-w-\[1600px\]/g, 'max-w-7xl');
    
    fs.writeFileSync(pagePath, content);
  }
}
console.log('Done bulletproofing subpages.');
