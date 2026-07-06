const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'app', 'docs');
const dirs = fs.readdirSync(docsDir);

function bulletproofContent(content) {
  // Main Wrapper
  content = content.replace(
    /<div className="flex flex-1([^"]*)"/g,
    '<div className="flex flex-1$1" style={{ display: "flex", flexDirection: "row", flex: "1 1 0%" }}'
  );

  // Left Sidebar
  content = content.replace(
    /<aside\s+className="hidden md:flex flex-col sticky shrink-0([^"]*)"\s+style={{ top: '68px', height: 'calc\(100vh - 68px\)', width: '280px' }}/g,
    `<aside className="hidden md:flex flex-col sticky shrink-0$1" style={{ display: "flex", flexDirection: "column", top: '68px', height: 'calc(100vh - 68px)', width: '280px' }}`
  );

  // Nav spacing inside sidebar
  content = content.replace(
    /<nav className="space-y-8">/g,
    `<nav className="space-y-8" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>`
  );

  // Group list spacing
  content = content.replace(
    /<ul className="space-y-1\.5([^"]*)">/g,
    `<ul className="space-y-1.5$1" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>`
  );

  // Right Sidebar
  content = content.replace(
    /<aside\s+className="hidden xl:block shrink-0 sticky([^"]*)"\s+style={{ top: '68px', height: 'calc\(100vh - 68px\)', width: '240px' }}/g,
    `<aside className="hidden xl:block shrink-0 sticky$1" style={{ top: '68px', height: 'calc(100vh - 68px)', width: '240px' }}`
  );

  // Right Sidebar nav
  content = content.replace(
    /<nav className="relative flex flex-col gap-1([^"]*)">/g,
    `<nav className="relative flex flex-col gap-1$1" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>`
  );

  return content;
}

// 1. Fix app/docs/page.tsx
const mainPagePath = path.join(docsDir, 'page.tsx');
if (fs.existsSync(mainPagePath)) {
  let content = fs.readFileSync(mainPagePath, 'utf8');
  // Revert back if it was already modified to avoid duplicate styles
  content = content.replace(/ style=\{\{ display: "flex"[^}]*\}\}/g, '');
  content = bulletproofContent(content);
  fs.writeFileSync(mainPagePath, content);
}

// 2. Fix app/docs/*/page.tsx
for (const dir of dirs) {
  const dirPath = path.join(docsDir, dir);
  if (!fs.statSync(dirPath).isDirectory()) continue;
  
  const pagePath = path.join(dirPath, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    content = content.replace(/ style=\{\{ display: "flex"[^}]*\}\}/g, '');
    content = bulletproofContent(content);
    fs.writeFileSync(pagePath, content);
  }
}

console.log('Done bulletproofing v2.');
