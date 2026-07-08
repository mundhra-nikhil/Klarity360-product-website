const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const docxPath = process.argv[2] || path.join(__dirname, '..', '..', 'lib', 'data', 'docs', 'content', 'Klarity360-UserGuide&ConnectorSetupDoc.docx');
const jsonOutputPath = process.argv[3] || path.join(__dirname, '..', '..', 'lib', 'data', 'docs', 'content', 'klarity360-userguide-connectorsetupdoc.json');

async function convert() {
  try {
    console.log(`Reading from: ${docxPath}`);
    const result = await mammoth.convertToHtml({ path: docxPath });
    const html = result.value; // The generated HTML
    const messages = result.messages; // Any messages, such as warnings during conversion
    
    if (messages.length > 0) {
      console.log('Mammoth conversion messages:', messages);
    }
    
    const jsonObj = { html: html };
    fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonObj, null, 2), 'utf8');
    console.log(`Successfully converted docx to JSON: ${jsonOutputPath}`);
  } catch (error) {
    console.error('Error during conversion:', error);
  }
}

convert();
