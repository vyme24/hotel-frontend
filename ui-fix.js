const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'client', 'src');

function traverse(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverse(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;

            // Fix calendar z-index issue in Hero.jsx
            if (fullPath.includes('Hero.jsx')) {
                newContent = newContent.replace(
                    /<section className="relative h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden">/g,
                    '<section className="relative h-screen w-full flex flex-col items-center justify-center bg-black z-[100]">'
                );
            }

            // Replace text sizes without cascading replacements
            newContent = newContent.replace(/text-(8|7|6|5|4|3)xl/g, (match, p1) => {
                const map = {
                    '8': 'text-5xl',
                    '7': 'text-4xl',
                    '6': 'text-4xl',
                    '5': 'text-3xl',
                    '4': 'text-2xl',
                    '3': 'text-xl'
                };
                return map[p1] || match;
            });

            // Replace icon sizes safely
            newContent = newContent.replace(/size=\{(80|40|32)\}/g, (match, p1) => {
                const map = {
                    '80': 'size={48}',
                    '40': 'size={24}',
                    '32': 'size={20}'
                };
                return map[p1] || match;
            });

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

traverse(srcDir);
console.log('UI refinement completed.');
