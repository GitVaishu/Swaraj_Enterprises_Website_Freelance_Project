# Swaraj Enterprises Website

Static site (HTML/CSS/JS, no backend, no build step). Content sourced from the
company profile PDF; photos are stored in `images/`.

## Project Files
- `index.html` - page content and structure
- `css/style.css` - layout, colors, responsive styles, and animations
- `js/main.js` - navigation, image fallbacks, lightbox, and contact form behavior
- `images/` - website photos and client/project logos

## Run Locally

The site can be opened directly by opening `index.html` in a browser. For a
local server, use:

```bash
npx serve .
```

## Deploy on Vercel

1. Push the project to a GitHub repository.
2. Import the repository in Vercel.
3. Select the `Other` framework preset.
4. Leave the build command and output directory empty.
5. Deploy. Vercel serves the files directly from the repository.

This project does not need a build command or a `vercel.json` file.

## Should Images Be Stored on GitHub?

Yes, for this project the images should be committed to the repository. They
are local website assets referenced by paths such as `images/site_1.png`, and
Vercel must receive them to display the deployed site correctly. The current
`.gitignore` intentionally does **not** ignore the `images/` folder.

Only commit images that you are allowed to publish. Do not commit private
client material, personal documents, confidential project photos, or images
with licenses that do not permit public website use. For very large image
collections, an image CDN or object storage service can be used instead, but
that is unnecessary for this small static site.

## Editing Content

- Text: edit `index.html` directly; there is no templating system.
- Colors and fonts: edit the `:root` variables near the top of `css/style.css`.
- Photos: replace files in `images/` while keeping the same filenames, or
  update the matching `src="images/..."` paths in `index.html`.
- Phone, email, and address: update their occurrences in `index.html`.

## Git Notes

The repository should include the source files and all published images. Do
not commit `.env` files, `.vercel/`, editor settings, dependencies, logs, or
operating-system files; these are covered by `.gitignore`.
