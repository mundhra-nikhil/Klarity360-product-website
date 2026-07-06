const fs = require('fs');

const files = [
  'lib/data/docs/content/trial-experience.mdx',
  'lib/data/docs/content/user-guide.mdx',
  'LIST_FORMATTING_GUIDE.md'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // split into list items manually
  let result = [];
  let i = 0;
  while (i < content.length) {
      let liStart = content.indexOf('<li>', i);
      if (liStart === -1) {
          result.push(content.substring(i));
          break;
      }
      result.push(content.substring(i, liStart + 4));
      
      let liEnd = content.indexOf('</li>', liStart);
      if (liEnd === -1) liEnd = content.length;
      
      let liContent = content.substring(liStart + 4, liEnd);
      
      // If the liContent contains a block tag like <p class="mt-2"> or <ul ...>
      // We should wrap the initial text in <p>...</p>
      
      let blockStart = liContent.search(/<(p class="mt-2"|ul class="list-disc)/);
      if (blockStart !== -1) {
          let textPart = liContent.substring(0, blockStart);
          let remainder = liContent.substring(blockStart);
          
          if (textPart.trim().length > 0 && !textPart.trim().startsWith('<p>')) {
              liContent = `\n        <p>${textPart.trim()}</p>\n        ` + remainder.trim() + `\n    `;
          }
      } else {
          // If there's no block inside, maybe it's just text. We can wrap it in <p> anyway to be safe, 
          // but let's only wrap if it's multiple lines or just leave it. The user only had issues with mixed content.
          if (liContent.includes('\n') && liContent.trim().length > 0 && !liContent.trim().startsWith('<p>')) {
             liContent = `\n        <p>${liContent.trim()}</p>\n    `;
          }
      }
      
      result.push(liContent);
      i = liEnd;
  }
  
  fs.writeFileSync(file, result.join(''), 'utf8');
  console.log('Fixed ' + file);
}
