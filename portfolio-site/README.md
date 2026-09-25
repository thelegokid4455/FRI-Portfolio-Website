# Farhan Irsyad — Portfolio Website

A lightweight, responsive, dependency-free portfolio website for a Unity / VR Simulation Developer.

## Edit the site

The main editable content is in **`content.js`**. You can change:

- name, headline and summary
- project titles, descriptions, tags and links
- work experience
- technical skills
- education / facts
- contact links

The layout and design are in **`index.html`** and **`styles.css`**.

### Adding real project images

Replace the generated project visual blocks in `script.js` with image tags, or extend each project object in `content.js` with an `image` property and render it from `/assets/projects/`.

### Adding YouTube demos

Add a project link such as:

```js
{ label: "Watch demo", url: "https://www.youtube.com/watch?v=YOUR_ID" }
```

## Publish

This is a static site, so it can be hosted on Vercel, Cloudflare Pages, Netlify, GitHub Pages or similar services.

Recommended developer workflow:

1. Create a GitHub repository.
2. Upload the contents of this folder.
3. Connect the repository to Vercel.
4. Add your custom domain in the Vercel project settings.

Every push to GitHub can then redeploy the website automatically.

## Included CV

`assets/FRI-Resume.pdf` is the current CV used as the source for the copy.
