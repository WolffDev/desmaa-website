# Gatsby v5 Upgrade & JSON to MDX Migration Plan

## Project Overview

**Current State:**
- Gatsby: v4.14.0
- React: v17.0.2
- Node.js: v14.17.3
- Content Format: 218 JSON files in `src/content/songs/`
- Data Transformer: `gatsby-transformer-json`

**Target State:**
- Gatsby: v5.15.0 (latest)
- React: v18.3.1
- Node.js: v18.x or v20.x LTS
- Content Format: MDX files
- Data Transformer: `gatsby-plugin-mdx`

---

## Phase 1: Dependency Updates

### 1.1 Prerequisites & Preparation

**Actions:**
1. Create a backup branch: `git checkout -b backup/pre-gatsby-v5-migration`
2. Update Node.js version requirement in `package.json`
3. Clean installation preparation:
   ```bash
   rm -rf node_modules package-lock.json
   ```

### 1.2 Core Dependencies Update

**Gatsby Core:**
```json
{
  "gatsby": "^5.15.0"
}
```

**React Ecosystem:**
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-helmet": "^6.1.0"
}
```

**Gatsby Plugins - v5 Compatible:**
```json
{
  "gatsby-plugin-sharp": "^5.15.0",
  "gatsby-transformer-sharp": "^5.15.0",
  "gatsby-source-filesystem": "^5.15.0",
  "gatsby-plugin-styled-components": "^6.15.0",
  "gatsby-plugin-typescript": "^5.15.0",
  "gatsby-plugin-react-helmet": "^6.15.0",
  "gatsby-plugin-canonical-urls": "^5.15.0",
  "gatsby-plugin-sitemap": "^5.15.0",
  "gatsby-plugin-dark-mode": "^1.1.2"
}
```

**Other Dependencies:**
```json
{
  "styled-components": "^6.1.13",
  "babel-plugin-styled-components": "^2.1.4",
  "framer-motion": "^11.11.17",
  "polished": "^4.3.1",
  "react-scroll-to-top": "^3.0.0",
  "react-youtube": "^10.1.0"
}
```

**Dev Dependencies:**
```json
{
  "@types/node": "^20.17.9",
  "@types/react": "^18.3.18",
  "@types/react-dom": "^18.3.5",
  "@types/react-helmet": "^6.1.11",
  "@types/styled-components": "^5.1.34",
  "@typescript-eslint/eslint-plugin": "^8.19.1",
  "@typescript-eslint/parser": "^8.19.1",
  "eslint": "^8.57.1",
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-prettier": "^5.2.1",
  "prettier": "^3.4.2",
  "rimraf": "^6.0.1",
  "snyk": "^1.1294.0",
  "webpack-bundle-analyzer": "^4.10.2"
}
```

### 1.3 Breaking Changes & Migration Steps

#### 1.3.1 React 18 Migration

**File: `gatsby-browser.js` (create if not exists)**

Remove old React 17 pattern and update to React 18:
```javascript
// OLD (React 17)
ReactDOM.render(<App />, document.getElementById('root'))

// NEW (React 18)
import { createRoot } from 'react-dom/client'
const root = createRoot(document.getElementById('root'))
root.render(<App />)
```

**Update React imports:**
- Check for any `React.FC` usage (still valid in React 18)
- Update any class component lifecycle methods if present

#### 1.3.2 Remove gatsby-image (Deprecated)

**Current usage in gatsby-config.js:**
```javascript
"gatsby-image"  // REMOVE THIS LINE
```

**Replace with:**
```javascript
{
  resolve: "gatsby-plugin-image",
  options: {
    // configuration options
  }
}
```

**If images are used in components, update imports:**
```javascript
// OLD
import Img from 'gatsby-image'

// NEW
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
```

#### 1.3.3 Styled-Components v6 Updates

Styled-components v6 may have minor breaking changes. Test all styled components after upgrade.

**Check for:**
- `css` prop usage
- Theme provider compatibility
- Server-side rendering configuration

#### 1.3.4 TypeScript Configuration

Update `tsconfig.json` for better compatibility:
```json
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ES2020",
    "jsx": "react-jsx",
    "lib": ["dom", "ES2020"],
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "removeComments": false,
    "preserveConstEnums": true,
    "moduleResolution": "node",
    "resolveJsonModule": true
  },
  "include": ["./src/**/*", "./gatsby-node.ts", "./gatsby-config.ts"]
}
```

### 1.4 Node.js Version Update

Update `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## Phase 2: JSON to MDX Migration

### 2.1 Install MDX Dependencies

Add to `package.json`:
```json
{
  "dependencies": {
    "gatsby-plugin-mdx": "^5.15.0",
    "@mdx-js/react": "^3.1.0"
  }
}
```

### 2.2 Content Structure Transformation

#### Current JSON Structure:
```json
{
  "title": "A.B.C",
  "videoUrl": "https://www.youtube.com/embed/ewIeJc4zsek?feature=oembed",
  "author": "Ukendt forfatter",
  "music": "J.P. Rameau",
  "songVers": [
    ["A b c d e f g", "h i j k l m n"],
    ["Hvis man ka' sin abc", "ka' man meget mer' end det."]
  ],
  "description": "Her kan børnene lære alfabetet...",
  "tags": ["sange", "børn", "dansk"],
  "slug": "abc",
  "layout": "song",
  "date": 1625672154754
}
```

#### Target MDX Structure:
```mdx
---
title: "A.B.C"
videoUrl: "https://www.youtube.com/embed/ewIeJc4zsek?feature=oembed"
author: "Ukendt forfatter"
music: "J.P. Rameau"
description: "Her kan børnene lære alfabetet på en sjov måde..."
tags: ["sange", "børn", "dansk"]
slug: "abc"
layout: "song"
date: 2021-07-07T12:15:54.754Z
---

## Vers 1

A b c d e f g
h i j k l m n
o p q r s t u
og der kommer fler' endnu
v x y z æ ø å
otteogtyve skal der stå.

## Vers 2

Hvis man ka' sin abc,
ka' man meget mer' end det.
Man ka' læse i en bog,
lær' en masse andre sprog.
Men man bli'r kun god til det,
hvis man kan sin abc.
```

### 2.3 Migration Script

**Create: `scripts/migrate-json-to-mdx.js`**

```javascript
const fs = require('fs');
const path = require('path');

const songsDir = path.join(__dirname, '../src/content/songs');
const outputDir = path.join(__dirname, '../src/content/songs-mdx');

// Create backup and output directories
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function convertJsonToMdx(jsonPath) {
  const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // Convert timestamp to ISO date
  const date = new Date(jsonContent.date).toISOString();

  // Build frontmatter
  const frontmatter = `---
title: "${jsonContent.title.replace(/"/g, '\\"')}"
videoUrl: "${jsonContent.videoUrl}"
author: "${jsonContent.author}"
music: "${jsonContent.music}"
description: "${jsonContent.description.replace(/"/g, '\\"')}"
tags: ${JSON.stringify(jsonContent.tags)}
slug: "${jsonContent.slug}"
layout: "${jsonContent.layout}"
date: ${date}
---\n\n`;

  // Build verses content
  let versesContent = '';
  jsonContent.songVers.forEach((verse, index) => {
    versesContent += `## Vers ${index + 1}\n\n`;
    versesContent += verse.join('  \n') + '\n\n';
  });

  return frontmatter + versesContent;
}

// Process all JSON files
const jsonFiles = fs.readdirSync(songsDir).filter(f => f.endsWith('.json'));

console.log(`Found ${jsonFiles.length} JSON files to convert`);

jsonFiles.forEach(file => {
  const jsonPath = path.join(songsDir, file);
  const mdxPath = path.join(outputDir, file.replace('.json', '.mdx'));

  try {
    const mdxContent = convertJsonToMdx(jsonPath);
    fs.writeFileSync(mdxPath, mdxContent);
    console.log(`✓ Converted ${file}`);
  } catch (error) {
    console.error(`✗ Failed to convert ${file}:`, error.message);
  }
});

console.log('\nMigration complete!');
console.log(`Output directory: ${outputDir}`);
```

**Execution:**
```bash
# Run the migration script
node scripts/migrate-json-to-mdx.js

# After validation, replace old songs directory
mv src/content/songs src/content/songs-backup
mv src/content/songs-mdx src/content/songs
```

### 2.4 Gatsby Configuration Updates

**Update `gatsby-config.js`:**

```javascript
module.exports = {
  siteMetadata: {
    title: "De Smaa",
    description: "",
    keywords: "sange, børn, godnat, godnat sange, sange til børn",
    siteUrl: "https://desmaa.dk",
    author: {
      name: "Desmaa",
      url: "https://desmaa.dk",
      email: "kontakt@desmaa.dk",
    },
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "sange",
        path: `${__dirname}/src/content/songs`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    // REMOVE: "gatsby-transformer-json",
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: "https://desmaa.dk",
      },
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-dark-mode",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        displayName: true, // Fixed typo: diaplayName -> displayName
      },
    },
    "gatsby-plugin-sitemap",
  ],
};
```

### 2.5 GraphQL Query Updates

**Update `gatsby-node.js`:**

```javascript
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  const analyzerMode = process.env.INTERACTIVE_ANALYZE ? "server" : "json";

  if (stage === "build-javascript") {
    actions.setWebpackConfig({
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode,
          reportFileName: `./__build/bundlereport.json`,
        }),
      ],
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Query MDX files instead of JSON
  const allMdxSongs = await graphql(`
    {
      allMdx {
        edges {
          node {
            frontmatter {
              slug
              layout
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);

  if (allMdxSongs.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query.');
  }

  allMdxSongs.data.allMdx.edges.forEach(({ node }) => {
    const { slug, layout } = node.frontmatter;

    createPage({
      path: `sange/${slug}`,
      component: path.resolve(`./src/templates/${layout}.tsx`),
      context: {
        slug,
      },
    });
  });
};
```

### 2.6 Component Updates

#### Update `src/templates/song.tsx`:

**GraphQL Query Change:**
```typescript
// OLD
export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    songsJson(slug: { eq: $slug }) {
      songVers
      music
      slug
      tags
      title
      videoUrl
      date
      description
      author
    }
  }
`;

// NEW
export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        videoUrl
        author
        music
        description
        tags
        slug
        date
      }
      body
    }
  }
`;
```

**Interface Update:**
```typescript
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

interface PageTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        music: string;
        slug: string;
        tags: string[];
        title: string;
        videoUrl: string;
        date: string;
        description: string;
        author: string;
      };
      body: string;
    };
  };
  children: React.ReactNode;
}
```

**Component Render Update:**
```typescript
const PageTemplate: React.FC<PageTemplateProps> = ({ data, children }) => {
  const { frontmatter } = data.mdx;
  const { music, title, videoUrl, date, author, description, tags, slug } = frontmatter;

  // ... existing video logic ...

  return (
    <IndexLayout description={description} title={title} keywords={tags.join(" ")}>
      <Page>
        <Container>
          <Heading>{title}</Heading>
          {/* ... existing subheader ... */}

          <Divider />

          <VerseWrapper>
            <MDXProvider>
              {children}
            </MDXProvider>
          </VerseWrapper>

          {/* ... rest of component ... */}
        </Container>
      </Page>
    </IndexLayout>
  );
};
```

#### Update `src/pages/index.tsx`:

```typescript
// OLD Query
query SongsQuery {
  allSongsJson {
    edges {
      node {
        title
        slug
        description
      }
    }
  }
}

// NEW Query
query SongsQuery {
  allMdx(sort: {frontmatter: {date: DESC}}) {
    edges {
      node {
        frontmatter {
          title
          slug
          description
        }
      }
    }
  }
}
```

**Interface Update:**
```typescript
interface SongEdge {
  node: {
    frontmatter: {
      title: string;
      slug: string;
      description: string;
    };
  };
}

interface StaticQueryProps {
  allMdx: {
    edges: SongEdge[];
  };
}
```

**Component Update:**
```typescript
render={(data: StaticQueryProps) => (
  <IndexLayout>
    <Page>
      <Container>
        <SongList edges={data.allMdx.edges} />
      </Container>
    </Page>
  </IndexLayout>
)}
```

#### Update `src/components/SongList.tsx`:

Update to handle nested frontmatter structure:
```typescript
// Adjust the component to access node.frontmatter.title instead of node.title
```

### 2.7 Styling Updates for MDX

**Create `src/components/MDXComponents.tsx`:**

```typescript
import styled from 'styled-components';

export const Verse = styled.div`
  grid-column: 2 / 3;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--onBackground);
  }

  p {
    margin-bottom: 5px;
    line-height: 1.6;
  }
`;

export const mdxComponents = {
  wrapper: Verse,
};
```

---

## Phase 3: Testing & Validation

### 3.1 Pre-Migration Testing Checklist

- [ ] All current pages load correctly
- [ ] Search functionality works
- [ ] Favourites feature works
- [ ] YouTube embeds display
- [ ] Dark mode toggles properly
- [ ] Mobile responsiveness is correct

### 3.2 Post-Migration Testing Checklist

#### Dependency Update Tests:
- [ ] `npm install` completes without errors
- [ ] `gatsby develop` runs successfully
- [ ] `gatsby build` completes without errors
- [ ] No console errors in browser
- [ ] All TypeScript types resolve correctly
- [ ] Dark mode still works
- [ ] Styled components render correctly

#### MDX Migration Tests:
- [ ] All 218 songs converted to MDX
- [ ] Song pages render with correct frontmatter
- [ ] Verses display with proper formatting
- [ ] Line breaks preserved (trailing double spaces)
- [ ] YouTube embeds still work
- [ ] Tags and metadata display correctly
- [ ] Date formatting works
- [ ] Search filters songs correctly
- [ ] Favourites feature works with new data structure
- [ ] Song list on homepage shows all songs
- [ ] Individual song pages accessible at `/sange/{slug}`
- [ ] 404 page still works for invalid routes

### 3.3 Performance Testing

- [ ] Build time comparison (before/after)
- [ ] Bundle size analysis with webpack-bundle-analyzer
- [ ] Lighthouse scores (should maintain or improve)
- [ ] Page load times

---

## Phase 4: Deployment Preparation

### 4.1 Git Workflow

```bash
# Create feature branch
git checkout -b feature/gatsby-v5-mdx-migration

# Commit dependency updates
git add package.json package-lock.json
git commit -m "chore: upgrade to Gatsby v5 and React 18"

# Commit configuration changes
git add gatsby-config.js gatsby-node.js tsconfig.json
git commit -m "feat: configure MDX plugin and update build config"

# Commit migration script
git add scripts/migrate-json-to-mdx.js
git commit -m "feat: add JSON to MDX migration script"

# Commit migrated content
git add src/content/songs/
git commit -m "feat: migrate all songs from JSON to MDX format"

# Commit component updates
git add src/
git commit -m "feat: update components to use MDX data"

# Testing commits
git commit -m "test: validate all songs render correctly"
```

### 4.2 Documentation Updates

Create/update the following docs:
- [ ] README.md - Update with new setup instructions
- [ ] CHANGELOG.md - Document all changes
- [ ] Contributing guide (if exists) - Update content authoring to MDX

### 4.3 CI/CD Considerations

- Update Node.js version in CI/CD config (GitHub Actions, Netlify, etc.)
- Update build commands if necessary
- Test deployment in staging environment first

---

## Rollback Plan

If critical issues arise:

1. **Immediate Rollback:**
   ```bash
   git checkout main
   git branch -D feature/gatsby-v5-mdx-migration
   ```

2. **Restore Previous State:**
   ```bash
   git checkout backup/pre-gatsby-v5-migration
   npm install
   gatsby clean
   gatsby develop
   ```

3. **Partial Rollback (dependencies only):**
   ```bash
   git checkout main -- package.json package-lock.json
   npm install
   ```

---

## Execution Timeline

### Estimated Duration: 4-6 hours

1. **Phase 1 - Dependency Updates:** 2-3 hours
   - Package updates: 30 mins
   - Breaking changes fixes: 1-2 hours
   - Testing: 30-60 mins

2. **Phase 2 - MDX Migration:** 1-2 hours
   - Script creation: 30 mins
   - Migration execution: 15 mins
   - Configuration updates: 30 mins
   - Component updates: 45 mins

3. **Phase 3 - Testing:** 1 hour
   - Manual testing: 30 mins
   - Performance testing: 30 mins

4. **Phase 4 - Documentation & Deployment:** 30 mins

---

## Success Criteria

- ✅ All 218 songs successfully migrated to MDX
- ✅ Build completes without errors
- ✅ All features work as before migration
- ✅ No regression in performance metrics
- ✅ Code passes TypeScript type checking
- ✅ All existing functionality preserved
- ✅ Search, favourites, and navigation work correctly

---

## Notes & Considerations

### Why MDX over JSON?

1. **Better Content Authoring:** MDX allows mixing markdown with React components
2. **Flexibility:** Can embed custom React components in song content
3. **Standard Format:** MDX is widely adopted in the Gatsby ecosystem
4. **Better SEO:** Structured content with proper heading hierarchy
5. **Future Extensibility:** Easier to add rich media, interactive elements

### Potential Challenges

1. **Verse Formatting:** Need to preserve line breaks with double spaces
2. **Special Characters:** Danish characters (æ, ø, å) must be handled correctly
3. **YouTube Embeds:** Video ID extraction logic remains in component
4. **Date Handling:** Converting timestamps to ISO dates

### Future Enhancements (Post-Migration)

- Add MDX components for common song patterns
- Implement search with MDX content
- Add syntax highlighting for any code examples
- Consider adding sheet music notation components
- Implement related songs recommendations

---

## Appendix

### A. Useful Commands

```bash
# Clean Gatsby cache
gatsby clean

# Development server
gatsby develop

# Production build
gatsby build

# Serve production build
gatsby serve

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Check for vulnerabilities
npm audit

# Update dependencies interactively
npx npm-check-updates -i
```

### B. Key File Locations

- Songs content: `src/content/songs/`
- Song template: `src/templates/song.tsx`
- Homepage: `src/pages/index.tsx`
- Gatsby config: `gatsby-config.js`
- Gatsby node: `gatsby-node.js`
- TypeScript config: `tsconfig.json`

### C. Reference Links

- [Gatsby v5 Release Notes](https://www.gatsbyjs.com/docs/reference/release-notes/v5.0/)
- [Migrating from v4 to v5](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/)
- [gatsby-plugin-mdx Documentation](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/)
- [MDX Documentation](https://mdxjs.com/)
- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)

---

**Document Version:** 1.0
**Last Updated:** 2025-10-22
**Author:** Claude Code
