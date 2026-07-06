const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = [
  "https://kanerika.com/wp-content/uploads/2024/05/white-kanerika-Logo.svg",
  "https://kanerika.com/wp-content/uploads/2024/05/GoodsFirms.svg",
  "https://kanerika.com/wp-content/uploads/2024/05/CMMI.svg",
  "https://kanerika.com/wp-content/uploads/2024/05/Clutch-Light.svg",
  "https://kanerika.com/wp-content/uploads/2024/05/Capterra-Light.svg",
  "https://kanerika.com/wp-content/uploads/2024/05/Glassdoor-Logo.svg",
  "https://kanerika.com/wp-content/uploads/2024/05/Asset-20-1.svg",
  "https://kanerika.com/wp-content/uploads/2024/05/50PROS.svg",
  "https://kanerika.com/wp-content/uploads/2024/05/Great-Place-To-Work.svg"
];

const dir = path.join(__dirname, 'public', 'images', 'footer');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

urls.forEach(url => {
  const filename = path.basename(url);
  const dest = path.join(dir, filename);
  https.get(url, (res) => {
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Downloaded ' + filename);
    });
  }).on('error', (err) => {
    console.error('Error downloading ' + filename + ': ' + err.message);
  });
});
