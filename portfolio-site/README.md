# Farhan Irsyad — Portfolio Website

A lightweight, responsive, dependency-free portfolio website for a Unity / VR Simulation Developer.

## Edit the site

The main editable content is in **`content.js`**. You can change:

- name, headline, intro and about text
- the hero button (`cv`) and email address
- project titles, descriptions, images and tags
- the games list
- work experience
- skills, facts and contact links

The layout and design are in **`index.html`** and **`styles.css`**.

### Project images

Set `image` (and `imageAlt`) on a project in `content.js`. Use real JPEGs around 1200–1600px wide; small images (320px) look blurry on large screens.

### Games

Each game in `content.js` points at `assets/games/<slug>/1.jpg`, `2.jpg`, ... and `shots` says how many screenshots exist. Keep the screenshots landscape JPEGs about 960px wide. Only the first screenshot loads with the page; the rest load when someone flips through. Add `video` with a YouTube link to show a Trailer link.

`assets/itch_media_archive/` is the raw itch.io download the thumbnails were made from. The site does not load it.

### CV

To link a CV from the hero, add it as `assets/FRI-Resume.pdf` and set `cv` in `content.js` to `{label: "Download CV", url: "assets/FRI-Resume.pdf"}`.

## Publish

This is a static site. The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` deploys this folder to GitHub Pages on every push to `main`.
