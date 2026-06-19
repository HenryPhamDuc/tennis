# 🎾 Henry's Tennis Knowledge Vault

A bilingual (EN-VI) tennis coaching library for the 3.5 player at 50+.

**🌐 Live site:** https://henryphamduc.github.io/tennis/

**📚 Contents:**
- **Complete Manual v2** (14 Parts, ~90 KB) — homepage, the master reference
- **22 deep-dive files** across 20 topic folders (Forehand, Backhand, Serve, Volley, Footwork, Return of Serve, Slice Variations, Slice Approach, Slice Family Doubles, Lob and Overhead, Mental Game, Grip Pressure, Grip family × 4, Doubles × 3)
- **Anatomy Lab** (8 deep-dives, 58 chapters, 181 illustrations) — full-body anatomy reference: Player in Motion, Shoulders, Arms/Wrists/Hands, Trunk/Spine, Hips/Thighs, Knees, Ankles/Feet, Control System
- **~1.7 MB of accumulated bilingual coaching content** (English + Vietnamese)

## How the site is built

This is a [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) static site.

```
~/tennis/
├── mkdocs.yml              # Material theme config + nav
├── docs/                   # All Markdown content (20 folders + index.md = Complete Manual v2)
│   ├── index.md            # Homepage (Complete Manual v2)
│   ├── Forehand/           # Deep dives, organized by topic
│   ├── Backhand/
│   ├── Serve/
│   ├── ...                 # 17 more topic folders
│   └── assets/             # Custom CSS for sidebar expansion
├── .github/
│   └── workflows/
│       └── deploy.yml      # Auto-deploys to GitHub Pages on push
└── .gitignore
```

## Local development

```bash
cd ~/tennis
pip install mkdocs-material
mkdocs serve     # local preview at http://127.0.0.1:8000
mkdocs build     # static build to ./site/
```

## Deployment

The site auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` whenever you `git push` to the `master` branch. The workflow:

1. Spins up an Ubuntu runner
2. Installs `mkdocs-material`
3. Runs `mkdocs gh-deploy --force` (which builds + pushes to `gh-pages` branch)
4. GitHub Pages then serves `gh-pages` at https://henryphamduc.github.io/tennis/

## Author

**Henry Pham Duc** — recreational tennis player in Surrey, BC. Plays at 3.5, reads/writes at 4.5. Frames tennis through tai chi (Thực-Hư / 虚实). Values longevity over power: 20-year sport, joint protection matters.

> *"Tennis is a whip sport, not a hammer sport. And you are playing a 20-year game."*
