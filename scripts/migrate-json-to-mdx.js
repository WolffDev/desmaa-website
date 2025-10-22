const fs = require('fs');
const path = require('path');

const songsDir = path.join(__dirname, '../src/content/songs');
const outputDir = path.join(__dirname, '../src/content/songs-mdx');

// Create backup and output directories
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function escapeQuotes(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/"/g, '\\"');
}

function convertJsonToMdx(jsonPath) {
  const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // Convert timestamp to ISO date
  const date = new Date(jsonContent.date).toISOString();

  // Build frontmatter
  const frontmatter = `---
title: "${escapeQuotes(jsonContent.title)}"
videoUrl: "${jsonContent.videoUrl}"
author: "${escapeQuotes(jsonContent.author)}"
music: "${escapeQuotes(jsonContent.music)}"
description: "${escapeQuotes(jsonContent.description)}"
tags: ${JSON.stringify(jsonContent.tags)}
slug: "${jsonContent.slug}"
layout: "${jsonContent.layout}"
date: ${date}
---

`;

  // Build verses content
  let versesContent = '';
  jsonContent.songVers.forEach((verse, index) => {
    versesContent += `## Vers ${index + 1}\n\n`;
    // Join lines with double spaces for line breaks in markdown
    versesContent += verse.join('  \n') + '\n\n';
  });

  return frontmatter + versesContent;
}

// Process all JSON files
const jsonFiles = fs.readdirSync(songsDir).filter(f => f.endsWith('.json'));

console.log(`Found ${jsonFiles.length} JSON files to convert`);
console.log('');

let successCount = 0;
let errorCount = 0;
const errors = [];

jsonFiles.forEach(file => {
  const jsonPath = path.join(songsDir, file);
  const mdxPath = path.join(outputDir, file.replace('.json', '.mdx'));

  try {
    const mdxContent = convertJsonToMdx(jsonPath);
    fs.writeFileSync(mdxPath, mdxContent, 'utf8');
    console.log(`✓ Converted ${file}`);
    successCount++;
  } catch (error) {
    console.error(`✗ Failed to convert ${file}:`, error.message);
    errors.push({ file, error: error.message });
    errorCount++;
  }
});

console.log('');
console.log('='.repeat(60));
console.log('Migration Summary');
console.log('='.repeat(60));
console.log(`Total files: ${jsonFiles.length}`);
console.log(`✓ Successful: ${successCount}`);
console.log(`✗ Failed: ${errorCount}`);
console.log('');
console.log(`Output directory: ${outputDir}`);

if (errors.length > 0) {
  console.log('');
  console.log('Errors:');
  errors.forEach(({ file, error }) => {
    console.log(`  - ${file}: ${error}`);
  });
}

console.log('');
console.log('Next steps:');
console.log('1. Review the generated MDX files in:', outputDir);
console.log('2. After validation, replace songs directory:');
console.log('   mv src/content/songs src/content/songs-backup');
console.log('   mv src/content/songs-mdx src/content/songs');
