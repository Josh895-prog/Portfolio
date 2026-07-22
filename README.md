Jonathan (Josh) Mumo — Personal Portfolio

Overview
- Minimal, professional single-page portfolio using plain HTML/CSS/JS.
- Interactive 3D wireframe in the hero using Three.js (lazy-loaded).

Local preview
1. Serve the folder (recommended):

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

Deployment (GitHub Pages)
1. Create a GitHub repository for the portfolio (for example `jonathan-mumo-portfolio`).
2. From the project folder, initialize Git and commit the files:

```bash
git init
git add .
git commit -m "Initial portfolio site"
```

3. Add the GitHub remote and push to your primary branch:

```bash
git remote add origin https://github.com/<your-username>/jonathan-mumo-portfolio.git
git branch -M main
git push -u origin main
```

4. In GitHub, open the repository settings and choose **Pages**.
5. Under **Build and deployment**, select **Branch: main** and **Folder: / (root)**.
6. Save. Your site will publish at `https://<your-username>.github.io/jonathan-mumo-portfolio/`.

Alternative: if you prefer a dedicated branch, push to `gh-pages` and select that branch as the Pages source.

Notes
- Replace the Formspree `action` URL in `index.html` with your Formspree form ID.
- Replace project links, repo links, and screenshots in `assets/` with live URLs.
- The 3D visual is lazy-loaded and supports `prefers-reduced-motion` for accessibility.
