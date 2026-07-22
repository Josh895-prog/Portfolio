Jonathan (Josh) Mumo — Personal Portfolio

Overview
- Minimal, professional single-page portfolio using plain HTML, CSS, and JavaScript.
- Uses Three.js for a lightweight 3D hero visual.
- Includes your actual photo in `assets/IMG-20251221-WA0056.jpg`.

Local preview
1. Open `index.html` directly in your browser, or run the built-in server:

```powershell
node server.js
```

Then open:

```text
http://localhost:8000
```

Deployment (GitHub Pages)
1. Make sure the full folder is ready, including `assets/IMG-20251221-WA0056.jpg`.
2. In the project folder, initialize Git and commit the files:

```powershell
git init
git add .
git commit -m "Add portfolio site"
```

3. Add the GitHub remote and push to your repository:

```powershell
git remote add origin https://github.com/josh895-prog/Portfolio.git
git branch -M main
git push -u origin main
```

4. In GitHub, open the repository settings and choose **Pages**.
5. Under **Build and deployment**, select **Branch: main** and **Folder: / (root)**.
6. Save. Your site should publish at:

```text
https://josh895-prog.github.io/Portfolio/
```

If the repo already exists and `origin` is set, skip `git remote add` and use:

```powershell
git push origin main
```

Notes
- The image path in `index.html` is already fixed to `assets/IMG-20251221-WA0056.jpg`.
- The only remaining step is uploading/pushing the folder to GitHub.
- After each update, run `git add .`, `git commit -m "Update site"`, and `git push`.
