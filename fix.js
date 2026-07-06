const fs = require('fs');
let f = 'lib/data/docs/manifest.ts';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(/(\`\$\{PRODUCT_NAME\}.*?)\",/g, '$1\`,');
fs.writeFileSync(f, c);
