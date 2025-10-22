# Deployment Guide

This document provides step-by-step instructions for deploying the De Smaa TanStack Start application to production.

## Pre-Deployment Checklist

- [ ] All tests passed (see TESTING.md)
- [ ] PWA icons added to `public/` directory
- [ ] Environment variables configured
- [ ] Analytics working (Plausible dashboard shows data)
- [ ] All content migrated (218 songs)
- [ ] Production build succeeds locally
- [ ] No console errors in production build

## Adding PWA Icons

Before deploying, add these files to the `public/` directory:

```bash
public/
  ├── icon-192.png      # 192x192px PNG
  ├── icon-512.png      # 512x512px PNG
  ├── favicon.ico       # 16x16 or 32x32 ICO
  └── apple-touch-icon.png  # 180x180px PNG
```

Use tools like [RealFaviconGenerator](https://realfavicongenerator.net/) to create these.

## Environment Variables

Create `.env.production` file (if needed):

```env
# Only if you need custom configuration
VITE_PLAUSIBLE_DOMAIN=desmaa.dk
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides excellent support for TanStack Start applications.

#### Initial Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

#### Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public",
  "framework": "vite",
  "installCommand": "npm install"
}
```

#### Custom Domain

1. Go to Vercel dashboard
2. Select your project
3. Settings > Domains
4. Add `desmaa.dk`
5. Follow DNS configuration instructions
6. Update A/CNAME records at your domain registrar

#### Environment Variables

1. Vercel dashboard > Your Project > Settings > Environment Variables
2. Add any needed variables
3. Redeploy

### Option 2: Netlify

Netlify also supports TanStack Start deployments.

#### Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".output/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18.0.0"
```

#### Deploy

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

#### Custom Domain

1. Netlify dashboard > Your Site > Domain Settings
2. Add custom domain `desmaa.dk`
3. Follow DNS configuration instructions

### Option 3: Cloudflare Pages

Cloudflare Pages offers excellent performance with their global CDN.

#### Setup

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your GitHub repository
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.output/public`
   - **Root directory**: `/`
   - **Environment variables**: NODE_VERSION = `18`

#### Custom Domain

1. Cloudflare dashboard > Your Pages Project > Custom domains
2. Add `desmaa.dk`
3. Cloudflare will automatically configure DNS if domain is on Cloudflare

### Option 4: Self-Hosted (VPS/Server)

For more control, deploy to your own server.

#### Requirements

- Node.js 18+
- Nginx or Apache
- SSL certificate (Let's Encrypt)
- Process manager (PM2)

#### Build

```bash
# On your server
git clone [your-repo]
cd desmaa-website
npm install
npm run build
```

#### Serve with PM2

```bash
# Install PM2
npm i -g pm2

# Start application
pm2 start npm --name "desmaa" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name desmaa.dk www.desmaa.dk;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name desmaa.dk www.desmaa.dk;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/desmaa.dk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/desmaa.dk/privkey.pem;

    # Serve static files
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## DNS Configuration

Update DNS records at your domain registrar:

### For Vercel/Netlify
```
Type: A
Name: @
Value: [Provided IP address]

Type: CNAME
Name: www
Value: [Provided subdomain]
```

### For Cloudflare
Cloudflare will auto-configure if domain is managed there.

### For Self-Hosted
```
Type: A
Name: @
Value: [Your server IP]

Type: A
Name: www
Value: [Your server IP]
```

## SSL Certificate

### Vercel/Netlify/Cloudflare
SSL is automatic and free.

### Self-Hosted
Use Let's Encrypt:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d desmaa.dk -d www.desmaa.dk

# Auto-renewal is configured automatically
```

## Post-Deployment Tasks

### 1. Verify Deployment

- [ ] Visit https://desmaa.dk
- [ ] Check all pages load correctly
- [ ] Verify SSL certificate is valid
- [ ] Test on mobile devices
- [ ] Check Lighthouse scores

### 2. Update DNS

- [ ] Point desmaa.dk to new hosting
- [ ] Verify DNS propagation (can take up to 48 hours)
- [ ] Test www.desmaa.dk and non-www both work

### 3. Configure Monitoring

#### Plausible Analytics
- [ ] Verify tracking working at plausible.io dashboard
- [ ] Set up email reports (optional)
- [ ] Configure goals/events (optional)

#### Error Tracking (Optional)
Consider adding Sentry or similar:

```bash
npm install @sentry/react @sentry/tracing
```

Update `app/routes/__root.tsx`:
```typescript
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'your-dsn',
  environment: 'production',
})
```

### 4. Submit to Search Engines

#### Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property for desmaa.dk
3. Verify ownership
4. Submit sitemap: `https://desmaa.dk/sitemap.xml` (if generated)

#### Bing Webmaster Tools
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site
3. Verify ownership
4. Submit sitemap

### 5. Set Up Backups

- [ ] Configure automatic database backups (if using DB)
- [ ] Backup content files regularly
- [ ] Test restore procedure
- [ ] Store backups off-site

## Monitoring & Maintenance

### Regular Tasks

**Weekly:**
- Check analytics for traffic
- Review error logs
- Test key user flows

**Monthly:**
- Update dependencies (`npm update`)
- Security audit (`npm audit`)
- Check for broken links
- Review performance metrics

**Quarterly:**
- Major dependency updates
- Content review and updates
- SEO audit
- Performance optimization

### Performance Monitoring

#### Lighthouse CI (Optional)

```bash
npm i -g @lhci/cli

# Run audit
lhci autorun --collect.url=https://desmaa.dk
```

#### Web Vitals
Monitor in Google Search Console or via:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

## Rollback Plan

If issues occur:

### Vercel/Netlify
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Self-Hosted
```bash
# Keep previous version
mv desmaa-website desmaa-website-backup
git clone [repo] desmaa-website
cd desmaa-website
git checkout [previous-commit]
npm install
npm run build
pm2 restart desmaa
```

## Troubleshooting

### Issue: 404 on page refresh
**Solution**: Ensure hosting platform is configured for SPA routing (see redirects in hosting config).

### Issue: Slow initial load
**Solution**:
- Enable compression on server
- Optimize images
- Check CDN configuration

### Issue: Analytics not tracking
**Solution**:
- Verify script loads in browser DevTools > Network
- Check Plausible domain matches exactly
- Ensure ad-blockers not interfering

### Issue: Dark mode flash
**Solution**: This is expected with SSR. Can add inline script to check localStorage before hydration (advanced).

## Security Hardening

### Content Security Policy

Add to hosting platform or server config:

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://plausible.io;
```

### Security Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Support & Resources

- [TanStack Start Docs](https://tanstack.com/start/latest)
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [Vercel Support](https://vercel.com/support)
- [Netlify Support](https://www.netlify.com/support/)
- [Plausible Docs](https://plausible.io/docs)

## Contact & Issues

For issues with the deployment:
1. Check hosting platform status page
2. Review server/build logs
3. Test locally with production build
4. Document error messages
5. Rollback if necessary

---

**Congratulations on deploying De Smaa! 🎉**

The site is now live and serving 218 Danish children's songs to users worldwide.
