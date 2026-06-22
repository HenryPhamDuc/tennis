# 🎾 Henry's Tennis Knowledge Vault

Tôi đã chơi tennis hơn 20 năm. Tôi viết cuốn sổ tay này để ghi lại những gì tôi đã học — phần lớn là từ những sai lầm của chính tôi, và từ những cuốn sách hay mà tôi đã đọc (Tôi sẽ giới thiệu với các bạn từng cuốn một khi có dịp).

**Trong cuốn sổ tay này, các bạn sẽ tìm thấy:**

- **Complete Manual v2** (14 phần) — đọc cái này trước nếu các bạn mới bắt đầu. Đây là bản đồ để đi vào tất cả các phần còn lại.
- **22 bài deep-dive trong 20 thư mục** — Forehand, Backhand, Serve, Volley, Footwork, Mental Game, Grip Pressure, Doubles, v.v. Mỗi bài là một chủ đề riêng. Tôi đã viết chúng khi tôi đang chơi và đang gặp vấn đề thật trên sân — không phải từ lý thuyết suông.
- **Anatomy Lab** (8 deep-dive, 181 hình minh họa) — cơ thể sau mỗi cú đánh. Vai, gối, hông, chuỗi động lực (kinetic chain). Tại sao khuỷu tay tôi đau suốt 2 năm, và tại sao bây giờ nó hết.
- **Advanced + Elite** — cho các bạn muốn đi sâu hơn. Thần kinh học, fascia, myelin hóa, hệ thống tự huấn luyện.
- **Song ngữ EN-VI**, bảng song song. In bảng cheat sheet, bỏ vào túi vợt.

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
4. GitHub Pages then serves the site to readers

## Author

**Henry Pham Duc** — recreational tennis player in Surrey, BC. Plays at 3.5, reads/writes at 4.5. Frames tennis through tai chi (Thực-Hư / 虚实). Values longevity over power: 20-year sport, joint protection matters.

> *"Tennis is a whip sport, not a hammer sport. And you are playing a 20-year game."*
