const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

turndownService.use(turndownPluginGfm.tables);

turndownService.keep(['iframe']);

turndownService.addRule('videoWrapper', {
  filter: function (node) {
    return node.nodeName === 'DIV' && (node.className.includes('docs-video-wrapper') || node.className.includes('docs-video-grid') || node.className.includes('docs-video-card'));
  },
  replacement: function (content, node) {
    // If it's a card inside a grid, let the grid handle it to avoid duplicate nested outerHTML output.
    if (node.className.includes('docs-video-card') && node.parentElement && node.parentElement.className.includes('docs-video-grid')) {
      return ''; // Handled by the parent grid
    }
    
    // Fix allowfullscreen for JSX
    let html = node.outerHTML.replace(/allowfullscreen(="")?/gi, 'allowFullScreen');
    html = html.replace(/\sclass=/g, ' className=');
    
    return '\n\n' + html + '\n\n';
  }
});

turndownService.addRule('br', {
  filter: 'br',
  replacement: function () {
    return '<br/>';
  }
});

const docsContentDir = path.join(__dirname, '..', '..', 'lib', 'data', 'docs', 'content');


// Simple implementation of the cleanup logic from processArticleHtml
function cleanHtmlForMigration(html) {
  let cleanHtml = html;

  // 0. Shift existing headers down to maintain hierarchy when h1 becomes h2
  cleanHtml = cleanHtml.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '<h4>$1</h4>');
  cleanHtml = cleanHtml.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '<h3>$1</h3>');

  // 1. Convert `<p><strong>...</strong></p>` and `<p><b>...</b></p>` into `<h3>...</h3>`
  cleanHtml = cleanHtml.replace(/<p>\s*<(strong|b)>((?:(?!<\/?p>).)*?)<\/\1>\s*<\/p>/gi, (match, tag, content) => {
    const cleanContent = content.replace(/<br\s*\/?>\s*$/i, '');
    return `<h3>${cleanContent}</h3>`;
  });

  // 2. Convert raw `<h1>` to `<h2>` for consistency.
  cleanHtml = cleanHtml.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '<h2>$1</h2>');

  // 3. Remove redundant title headers at the top of the document.
  const isJunk = (text) => {
    const t = text.toLowerCase().replace(/<[^>]+>/g, '').trim();
    if (!t) return true;
    if (
      t.includes('klarity360') || 
      t.includes('insight agent') || 
      t === 'vs' || 
      t.includes('fabric data agent') || 
      t.includes('decision-oriented') || 
      t.includes('white paper') || 
      t.includes('document control') || 
      t.includes('setup guide') || 
      t.includes('api permissions') || 
      t.includes('pricing') || 
      t.includes('purchasing flow') || 
      t.includes('security document') || 
      t.includes('trial experience') || 
      t.includes('fabric plan') ||
      t.includes('abstract')
    ) {
       return true;
    }
    return false;
  };

  let changed = true;
  while(changed) {
     changed = false;
     cleanHtml = cleanHtml.replace(/^(\s*<a[^>]*><\/a>\s*|\s*)*<(h2|h3)[^>]*>(.*?)<\/\2>/i, (match, prefix, tag, content) => {
        if (isJunk(content)) {
           changed = true;
           return prefix || '';
        }
        return match;
     });
  }

  // 4. Remove static Word-generated Table of Contents
  cleanHtml = cleanHtml.replace(/<p[^>]*>\s*<(strong|b)>\s*Table of Contents\s*<\/\1>\s*<\/p>/gi, '');
  cleanHtml = cleanHtml.replace(/<p[^>]*>\s*Table of Contents\s*<\/p>/gi, '');
  // Safely remove any paragraph containing a link to a Word TOC anchor
  cleanHtml = cleanHtml.replace(/<p[^>]*>(?:(?!<\/?p>).)*?href=["']?#_Toc(?:(?!<\/?p>).)*?<\/p>/gi, '');

  // 5. Clean up tables for turndown-plugin-gfm
  // turndown-plugin-gfm doesn't support block elements (like <p> or <h2>) inside table cells.
  // It also requires <th> for markdown tables to be generated.
  cleanHtml = cleanHtml.replace(/<table[\s\S]*?<\/table>/gi, (tableHtml) => {
    let clean = tableHtml
      .replace(/(<\/p>|<\/h[23]>)\s*(<p[^>]*>|<h[23][^>]*>)/gi, '$1<br/><br/>$2')
      .replace(/<p[^>]*>/gi, '')
      .replace(/<\/p>/gi, '')
      .replace(/<h[23][^>]*>/gi, '<strong>')
      .replace(/<\/h[23]>/gi, '</strong>');
      
    // Convert the first <tr>'s <td> elements into <th> elements
    let isFirstRow = true;
    clean = clean.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/i, (match, inner) => {
      if (isFirstRow) {
        isFirstRow = false;
        return '<tr>' + inner.replace(/<td/gi, '<th').replace(/<\/td>/gi, '</th>') + '</tr>';
      }
      return match;
    });

    return clean;
  });

  // 6. Escape `<` that look like placeholders so MDX doesn't crash
  // Specifically `< ` or `<UPPERCASE` or `<SERVICE`
  cleanHtml = cleanHtml.replace(/<\s+(?=[a-zA-Z])/g, '&lt; ');
  cleanHtml = cleanHtml.replace(/<(?=[A-Z_]+>)/g, '&lt;');

  return cleanHtml;
}

function migrate() {
  const targetFileArg = process.argv[2];
  let files = fs.readdirSync(docsContentDir).filter(f => f.endsWith('.json'));

  if (targetFileArg) {
    const baseName = path.basename(targetFileArg);
    if (files.includes(baseName)) {
      files = [baseName];
      console.log(`Targeting single file for migration: ${baseName}`);
    } else {
      console.error(`Specified file not found in ${docsContentDir}: ${baseName}`);
      return;
    }
  }

  for (const file of files) {
    const jsonPath = path.join(docsContentDir, file);
    try {
      const fileData = fs.readFileSync(jsonPath, 'utf8');
      const content = JSON.parse(fileData);
      
      if (content && content.html) {
        const cleanedHtml = cleanHtmlForMigration(content.html);
        
        // Convert HTML to Markdown
        let markdown = turndownService.turndown(cleanedHtml);
        
        // Escape `<` that look like JSX tags or placeholders to prevent MDX parse errors
        markdown = markdown.replace(/<(?=\s*[A-Z])/g, '\\<');

        // Replace raw class=" with className=" to prevent JSX errors
        markdown = markdown.replace(/\bclass="/g, 'className="');
        
        // Save as .mdx
        const mdxPath = jsonPath.replace('.json', '.mdx');
        fs.writeFileSync(mdxPath, markdown, 'utf8');
        
        console.log(`Migrated ${file} -> ${path.basename(mdxPath)}`);
      }
    } catch (err) {
      console.error(`Error migrating file ${file}:`, err.message);
    }
  }
}

migrate();

