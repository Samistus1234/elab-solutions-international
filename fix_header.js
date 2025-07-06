const fs = require('fs');

// Read the Header.tsx file
let content = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

// Fix the changeLanguage function by adding the missing closing brace
content = content.replace(
  'const changeLanguage = (newLocale: string) => {\n    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)\n    window.location.href = newPathname',
  'const changeLanguage = (newLocale: string) => {\n    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)\n    window.location.href = newPathname\n  }'
);

// Write the updated content back to the file
fs.writeFileSync('src/components/layout/Header.tsx', content);
console.log('✅ Header.tsx syntax fixed successfully!');
