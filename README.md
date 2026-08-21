# Swaraj Enterprises — Website

Static site (HTML/CSS/JS, no backend, no build step). Content sourced from the
company profile PDF; photos extracted from the same PDF into /images.

## Files
- index.html
- css/style.css
- js/main.js
- images/ (all photos — kept separate as requested, easy to swap/replace)

## Run locally
Just open index.html in a browser, or:
    npx serve .

## Deploy on Vercel
1. Push this folder to a GitHub repo (or drag-and-drop the folder at vercel.com/new).
2. Framework preset: "Other" / static — no build command, no output directory needed.
3. Deploy. Done — it's fully static.

## Editing content
- Text: edit index.html directly (plain HTML, no templating).
- Colors/fonts: edit the :root variables at the top of css/style.css.
- Photos: replace files in /images (keep the same filenames, or update the
  src="images/..." paths in index.html).
- Phone/email/address: search for them in index.html (appears in the hero,
  contact section, and footer).
