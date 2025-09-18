const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const title = args[0] || 'Nouvel Article';
const slug = title.toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-');

const date = new Date().toISOString().split('T')[0];

const template = `---
title: "${title}"
description: "Description de l'article"
slug: "${slug}"
pubDate: "${date}"
tags: ["tag1", "tag2"]
readingTime: "3"
draft: true
---

# ${title}

Contenu de l'article ici...

## Section

Quelques idées :
- Point 1
- Point 2
- Point 3

\`\`\`javascript
// Du code d'exemple
console.log("Hello World!");
\`\`\`

Bonne écriture ! ✨
`;

const filePath = path.join('src', 'content', 'blog', `${slug}.md`);

// Créer le dossier s'il n'existe pas
const dir = path.dirname(filePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(filePath, template);

console.log(`✅ New article created: ${filePath}`);
console.log(`📝 Remember to change draft: false when you're ready to publish!`);