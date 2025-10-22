# Testing Guide

This document outlines the testing procedures for the De Smaa TanStack Start application.

## Prerequisites

- Node.js 18+ installed
- All dependencies installed (`npm install`)
- Content files migrated (218 markdown song files)

## Phase 7: Testing Checklist

### 1. Development Server Testing

```bash
# Start development server
npm run dev
```

Visit `http://localhost:3000` and verify:

#### Home Page (`/`)
- [ ] Page loads without errors
- [ ] All 218 songs are displayed
- [ ] Search functionality works
- [ ] Filtering updates in real-time as you type
- [ ] Song count displays correctly
- [ ] Dark mode toggle works
- [ ] Favorites icon in header is clickable
- [ ] Song cards have hover effects
- [ ] Favorite button on cards works
- [ ] Layout is responsive (mobile, tablet, desktop)

#### Individual Song Pages (`/sange/[slug]`)
Test a few songs (e.g., `/sange/abc`, `/sange/mester-jacob`):
- [ ] Song title displays correctly
- [ ] Song lyrics are formatted properly (verses separated)
- [ ] Metadata (date, author, music) displays
- [ ] Description shows (if available)
- [ ] Favorite button works
- [ ] YouTube link displays and works (opens in new tab)
- [ ] Tags display at bottom
- [ ] Dark mode works
- [ ] Back navigation works
- [ ] Layout is responsive

#### Favorites Page (`/favorit`)
- [ ] Page loads without errors
- [ ] Shows empty state initially
- [ ] Add songs to favorites from home page
- [ ] Verify favorites appear on this page
- [ ] Remove favorites works
- [ ] Favorite count updates
- [ ] localStorage persists across page refreshes
- [ ] Layout is responsive

#### 404 Page (`/404`)
- [ ] Page displays correctly
- [ ] Links back to home work
- [ ] Layout is responsive

### 2. Feature Testing

#### Dark Mode
- [ ] Toggle switches between light and dark
- [ ] Preference persists across page refreshes
- [ ] All pages respect dark mode setting
- [ ] No flash of wrong theme on page load
- [ ] Colors are readable in both modes

#### Favorites System
- [ ] Can add favorites from home page
- [ ] Can add favorites from song page
- [ ] Can remove favorites
- [ ] Favorites persist in localStorage
- [ ] Favorites sync across tabs (test in multiple tabs)
- [ ] Favorite icon fills when added
- [ ] Count displays correctly

#### Search
- [ ] Search filters songs by title
- [ ] Search filters songs by description
- [ ] Search is case-insensitive
- [ ] Empty search shows all songs
- [ ] "No results" message shows when appropriate
- [ ] Search query displays below input

### 3. Performance Testing

```bash
# Build for production
npm run build

# Serve production build
npm run preview
```

Run Lighthouse audit (Chrome DevTools > Lighthouse):
- [ ] Performance score 90+
- [ ] Accessibility score 100
- [ ] Best Practices score 90+
- [ ] SEO score 90+
- [ ] PWA criteria met (after adding icons)

### 4. Browser Compatibility Testing

Test in multiple browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome (iOS/Android)
- [ ] Mobile Safari (iOS)

### 5. Mobile Testing

Test on actual devices or use browser DevTools device emulation:
- [ ] iPhone 12/13/14 Pro
- [ ] Samsung Galaxy S21+
- [ ] iPad Air
- [ ] Touch interactions work properly
- [ ] No horizontal scrolling
- [ ] Buttons are easily tappable
- [ ] Text is readable
- [ ] Images fit properly

### 6. Static Prerendering Verification

```bash
# After building
ls -la .output/public/sange/

# Should show 218 HTML files
```

Verify:
- [ ] All 218 song pages are pre-rendered as HTML
- [ ] Each HTML file contains the song content (view source)
- [ ] Meta tags are present in HTML source
- [ ] No JavaScript required for initial content display

### 7. Analytics Testing

After deployment:
- [ ] Visit Plausible dashboard at plausible.io
- [ ] Verify pageviews are being tracked
- [ ] Verify events are being tracked (optional, requires custom event testing)
- [ ] Check that data appears within a few minutes

### 8. PWA Testing

After adding icons to `public/` directory:
- [ ] Install PWA on desktop (Chrome: Install icon in address bar)
- [ ] Install PWA on mobile (Add to Home Screen)
- [ ] Verify icon displays correctly
- [ ] Verify app opens in standalone mode
- [ ] Verify app works offline (after initial visit)

## Common Issues & Solutions

### Issue: Build fails with TypeScript errors
**Solution**: Run `npm run build` and fix any TypeScript errors. Check imports and type definitions.

### Issue: Songs not loading
**Solution**: Verify markdown files exist in `app/content/songs/` and have correct frontmatter format.

### Issue: Dark mode flash
**Solution**: This is expected due to SSR. Can be minimized with inline script (optional enhancement).

### Issue: Favorites not persisting
**Solution**: Check browser localStorage settings. Ensure cookies/storage not blocked.

### Issue: Static prerendering not working
**Solution**: Verify `staticData` export in `app/routes/sange.$slug.tsx` returns correct format.

## Debugging

### Enable verbose logging
```bash
# Development
DEBUG=* npm run dev

# Check console for errors
# Open browser DevTools (F12)
```

### Check build output
```bash
npm run build
# Review .output/ directory structure
```

### Verify content loading
Add console.logs in `app/utils/content.ts` to debug markdown parsing.

## Performance Optimization Checklist

- [ ] Images use lazy loading
- [ ] No unnecessary re-renders (check with React DevTools)
- [ ] Bundle size is reasonable (check with `npm run analyze` if added)
- [ ] No console errors or warnings
- [ ] CSS is optimized (Tailwind purges unused classes)

## Accessibility Testing

- [ ] All images have alt text
- [ ] Buttons have aria-labels where needed
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Screen reader friendly (test with NVDA/JAWS/VoiceOver)
- [ ] Form inputs have labels
- [ ] Links have descriptive text

## Security Checklist

- [ ] No sensitive data in client code
- [ ] External links use `rel="noopener noreferrer"`
- [ ] Content Security Policy headers configured (on hosting platform)
- [ ] HTTPS enabled in production
- [ ] No console.log with sensitive data

## Next Steps

After completing all tests:
1. Document any bugs found
2. Fix critical issues
3. Proceed to deployment (see DEPLOYMENT.md)
4. Re-test after deployment
5. Monitor analytics and error logs
