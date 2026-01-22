const fs = require('fs');
const path = require('path');

// 1. Your Production URL
const PRODUCTION_SITE_URL = 'https://sionjaison.vercel.app';

// 2. We will look in ALL these files (covering Node, Workers, and Generic)
const filesToPatch = [
  '../node_modules/@keystatic/core/dist/keystatic-core-api-generic.worker.js',
  '../node_modules/@keystatic/core/dist/keystatic-core-api-generic.node.js', // <--- This is the one Vercel likely uses
  '../node_modules/@keystatic/core/dist/keystatic-core-api-generic.esm.js',
  '../node_modules/@keystatic/core/dist/index.js' 
];

console.log('🛡️  Starting Aggressive Keystatic Patch...');

const oldCallbackCode = `url.searchParams.set('code', code);`;
const newCallbackCode = `url.searchParams.set('code', code);

    // PATCH: Force Redirect URI for GitHub App
    const reqUrlForRedirect = new URL(req.url);
    const isProduction = reqUrlForRedirect.hostname !== 'localhost' && !reqUrlForRedirect.hostname.includes('127.0.0.1');
    const siteOrigin = isProduction ? '${PRODUCTION_SITE_URL}' : reqUrlForRedirect.origin;
    url.searchParams.set('redirect_uri', \`\${siteOrigin}/api/keystatic/github/oauth/callback\`);
`;

let patchedCount = 0;

filesToPatch.forEach(relativePath => {
  const filePath = path.join(__dirname, relativePath);
  
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Check if already patched
      if (content.includes('PATCH: Force Redirect URI')) {
        console.log(`✅ Already patched: ${path.basename(filePath)}`);
        return;
      }

      // Check if the file contains the target code
      // We look for a small unique snippet to be safe across versions
      if (content.includes(oldCallbackCode)) {
        // Apply Patch
        const patchedContent = content.replace(oldCallbackCode, newCallbackCode);
        fs.writeFileSync(filePath, patchedContent);
        console.log(`✅ PATCHED: ${path.basename(filePath)}`);
        patchedCount++;
      } else {
        console.log(`⚠️  Code mismatch (skipped): ${path.basename(filePath)}`);
      }
    } catch (e) {
      console.warn(`❌ Error reading ${path.basename(filePath)}: ${e.message}`);
    }
  }
});

if (patchedCount === 0) {
  console.error("❌ CRITICAL: No files were patched. The search pattern might be outdated.");
  // We exit 0 to allow build to continue, but logs will show the failure.
  process.exit(0);
} else {
  console.log(`🎉 Success! Patched ${patchedCount} file(s).`);
}
