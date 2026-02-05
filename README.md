## Deployment (Netlify)

This project is configured for static export (`output: "export"`), and ships with a `netlify.toml`.

**Netlify build settings**
- Build command: `npm run build`
- Publish directory: `out`
- Node version: `18`

**Custom domain**
1. Add the site in Netlify (from Git).
2. Go to **Domain management** and add `dukaintelligence.co.ke`.
3. Update DNS at your registrar with the records Netlify provides.
