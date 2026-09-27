# lakshyaaagrawal.github.io

Source for the homepage of Lakshya A Agrawal, served by GitHub Pages at [lakshyaaagrawal.com](https://lakshyaaagrawal.com/).

## Layout

The site is a single hand-written static page with no build step or framework.

| Path | Purpose |
| --- | --- |
| `index.html` | The page |
| `css/site.css` | Styling, with light and dark themes via CSS custom properties |
| `js/site.js` | Theme preference, publication filters, news archive, and photo carousel (progressive enhancement only) |
| `images/`, `assets/` | Portrait, figures, thumbnails, logos, photos, CV, and paper PDFs |
| `favicon.svg`, `*.png`, `site.webmanifest` | Icons |
| `.github/workflows/static.yml` | Deploys the repository root to GitHub Pages on push to `master` |

## Working on the site

- Preview locally with `python3 -m http.server 8000` in the repository root, then open <http://localhost:8000/>.
- Run `node --test tests/site-content.test.cjs` for static content checks.
- Update the "Last updated" line in the footer and `lastmod` in `sitemap.xml` when publishing.

## Acknowledgements

Earlier versions of this site were built on the [minimal-research-theme](https://github.com/SebastinSanty/minimal-research-theme) by [Sebastin Santy](http://sebastinsanty.com/), as modified by [Arkil Patel](https://arkilpatel.github.io/) and [Ayush Agrawal](https://ayush1801.github.io/), with fixes from [Shikhar Sharma](https://github.com/Shikharhacks007) and [Sidd](https://github.com/Sidd-Dino). The current design is a from-scratch rewrite, but I remain grateful to all of them.
