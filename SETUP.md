# Run ROYAL DALE website locally

## Step 1: Open the correct folder

The project is inside a **nested** folder (common when unzipping from GitHub):

```
Downloads\royaldale-main\royaldale-main\   ← run commands HERE
```

In PowerShell:

```powershell
cd $env:USERPROFILE\Downloads\royaldale-main\royaldale-main
```

Or in Cursor: **File → Open Folder** → select `royaldale-main\royaldale-main` (the inner folder that contains `package.json`).

---

## Step 2: Install Node.js (required)

If you see `npm is not recognized`, Node.js is not installed.

1. Download **LTS** from https://nodejs.org/
2. Run the installer (keep “Add to PATH” checked)
3. **Close and reopen** Cursor / PowerShell
4. Verify:

```powershell
node -v
npm -v
```

You should see version numbers (e.g. `v22.x` and `10.x`).

**Alternative (Windows Package Manager):**

```powershell
winget install OpenJS.NodeJS.LTS
```

Then restart your terminal.

---

## Step 3: Install dependencies & start dev server

```powershell
cd $env:USERPROFILE\Downloads\royaldale-main\royaldale-main
npm install
npm run dev
```

Open the URL shown in the terminal (usually **http://localhost:5173**).

---

## Troubleshooting

| Problem | Fix |
|--------|-----|
| `npm is not recognized` | Install Node.js (Step 2), restart terminal |
| `ENOENT package.json` | You are in the wrong folder — use inner `royaldale-main` |
| Port already in use | Run `npm run dev -- --port 5174` |
| PowerShell blocks scripts | Use **Command Prompt** or run: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |

---

## Build for production

```powershell
npm run build
npm run preview
```

---

## Git (version control)

This project is a Git repo at:

`Downloads\royaldale-main\royaldale-main`

**Initial commit is done** on branch `main` (34 files; `node_modules` is ignored).

### One-time: set your Git identity

In any terminal:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Push to GitHub

Replace with your actual repo URL:

```powershell
cd $env:USERPROFILE\Downloads\royaldale-main\royaldale-main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If the GitHub repo already has commits, you may need:

```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### After you edit the site

```powershell
git add .
git commit -m "Describe your change"
git push
```

In Cursor: open folder `royaldale-main\royaldale-main` → **Source Control** panel to see changes.
