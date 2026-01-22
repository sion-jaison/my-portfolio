const fs = require('fs');
const path = require('path');

// 1. Define the production URL
const PRODUCTION_SITE_URL = 'https://sionjaison.vercel.app';

// 2. Find the file in node_modules
const filePath = path.join(
  __dirname,
  '../node_modules/@keystatic/core/dist/keystatic-core-api-generic.worker.js'
);

console.log('Patching Keystatic OAuth handler...');

try {
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('PATCH: Add redirect_uri')) {
    console.log('Keystatic already patched, skipping.');
    process.exit(0);
  }

  // 3. The code we want to replace
  const oldCallbackCode = `const url = new URL('https://github.com/login/oauth/access_token');
    url.searchParams.set('client_id', config.clientId);
    url.searchParams.set('client_secret', config.clientSecret);
    url.searchParams.set('code', code);
    const tokenRes = await fetch(url, {`;

  // 4. The new code (Adding the missing redirect_uri)
  const newCallbackCode = `const url = new URL('https://github.com/login/oauth/access_token');
    url.searchParams.set('client_id', config.clientId);
    url.searchParams.set('client_secret', config.clientSecret);
    url.searchParams.set('code', code);
    
    // PATCH: Add redirect_uri to token exchange
    const reqUrlForRedirect = new URL(req.url);
    const isProduction = reqUrlForRedirect.hostname !== 'localhost' && !reqUrlForRedirect.hostname.includes('127.0.0.1');
    const siteOrigin = isProduction ? '${PRODUCTION_SITE_URL}' : reqUrlForRedirect.origin;
    url.searchParams.set('redirect_uri', \`\${siteOrigin}/api/keystatic/github/oauth/callback\`);
    
    const tokenRes = await fetch(url, {`;

  // 5. Apply the replacement
  if (!content.includes('const url = new URL(\'https://github.com/login/oauth/access_token\');')) {
     // Fallback for minified code or different versions
     console.error('Could not find exact code match. Attempting broad search...');
  }
  
  // We clean up whitespace to ensure a match
  const cleanContent = content.replace(/\s+/g, ' ');
  const cleanOld = oldCallbackCode.replace(/\s+/g, ' ');
  
  if (cleanContent.includes(cleanOld)) {
      content = content.replace(oldCallbackCode, newCallbackCode);
      fs.writeFileSync(filePath, content);
      console.log('✅ Keystatic patched successfully!');
  } else {
      console.error('❌ Could not find the callback code to patch. Please check the file manually.');
      process.exit(1);
  }

} catch (error) {
  console.error('Error patching Keystatic:', error.message);
  // We don't exit 1 here to avoid breaking the build if the file path is slightly different
  console.log('Continuing build without patch...');
}
