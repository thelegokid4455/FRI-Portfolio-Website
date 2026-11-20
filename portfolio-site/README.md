# Farhan Irsyad — Portfolio Website

A lightweight, responsive, dependency-free portfolio website for a Unity / VR Simulation Developer.

## Edit the site

The main editable content is in **`content.js`**. You can change:

- `hero`: the headline, who it's for, intro, both buttons, "Recent work" links, skill chips and the looping clip
- `services` ("What I do" cards) and `process` ("How I work" steps)
- `projects`: Selected Work cards, with optional `kind` and `status` badges, `credit`, `imageCaption` and a case-study `link`
- the games list
- work experience, about text, skills, facts and contact links
- `portfolio`: the portfolio document (`pdf` downloads it, `doc` opens it in Google Docs)

The layout and design are in **`index.html`** and **`styles.css`**. After changing either of those (or `content.js` / `script.js`), bump the `?v=` number on their links in `index.html` so browsers fetch the new version.

### Project images

Set `image` (and `imageAlt`) on a project in `content.js`. Use real images (WebP) around 1200–1600px wide; small images (320px) look blurry on large screens. Only add `kind` / `status` badges you can confirm.

### Case-study pages

Every project in `projects` gets its own page at `project.html?p=<slug>`, built by `project.js`. Fill in `caseStudy` (overview, challenge, approach, features, statusNote, contribution, feedback); sections without content are skipped. `media` lists the screenshots and clips for the viewer: `{image, caption, alt}` or `{video, poster, caption, alt}`. Clips live in `assets/work/<project>/`.

### Hero clip

`hero.video` plays muted on a loop, unless the visitor has asked their system to reduce motion. Visitors can always pause it. Keep clips short (6–12 s), H.264, about 960×540, with a WebP poster frame.

### Games

Each game in `content.js` points at `assets/games/<slug>/1.webp`, `2.webp`, ... and `shots` says how many screenshots exist. Keep the screenshots landscape WebP images about 960px wide. Only the first screenshot loads with the page; the rest load when someone flips through. Add `video` with a YouTube link to show a Trailer link.

The raw itch.io download the thumbnails were made from is in `archive/itch_media_archive/` at the repo root, outside this folder, so it isn't published.

## Publish

This is a static site. The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` deploys this folder to GitHub Pages on every push to `main`.
