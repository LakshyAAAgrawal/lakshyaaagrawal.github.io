# lakshyaaagrawal.github.io

Source for the homepage of Lakshya A Agrawal, served by GitHub Pages at [lakshyaaagrawal.github.io](https://lakshyaaagrawal.github.io/).

## Layout

The site is a single hand-written static page with no build step or framework.

| Path | Purpose |
| --- | --- |
| `index.html` | Bio; a unified papers/projects collection; talks/writing; background and honors; expandable news archive |
| `css/site.css` | Styling; light/dark themes via CSS custom properties |
| `js/site.js` | Theme preference, research filters, direct-link handling, and navigation state (progressive enhancement only) |
| `images/` | Portrait (`profile-640.jpg`, `profile-1024.jpg`, source `profile.png`) |
| `images/research/`, `images/talks/`, `images/sides/` | Research figures and video thumbnails; provenance in `images/SOURCES.md` |
| `assets/CV.pdf` | Current CV |
| `assets/papers/` | Locally hosted PDFs for older papers |
| `assets/logos/` | GEPA logo variants |
| `favicon.svg`, `*.png`, `site.webmanifest` | Icons (PNGs generated from `favicon.svg` with `rsvg-convert`) |
| `.github/workflows/static.yml` | Deploys the repository root to GitHub Pages on push to `master` |

## Editing

- Research is stored once, as static `<article class="work">` elements in `index.html`. Copy an entry and give it a unique `id`, `data-topics`, and `data-selected="true"` or `"false"`.
- Topic values are `harness`, `training`, `evaluation`, `code`, and `systems`; an entry may have more than one, separated by spaces. Keep the initial selection focused. All 19 entries remain readable without JavaScript.
- Keep each project's summary, publication metadata, author list, code, and related links together. Full authorship is available in the entry's native disclosure. Do not add a second publications or software list for the same work.
- Talks have their own section; only presentations by Lakshya belong there. Historical announcements live in the expandable news archive.
- Filter counts are calculated automatically. The All work filter reveals the complete collection.
- Keep a single news list in the top Updates disclosure: it expands in place even without JavaScript. JavaScript moves it to the bottom archive while the top disclosure is closed, then returns it on expansion.
- Talks and background are fully open. Use recording, slides, and event links where available; otherwise just name the venue. Link video segments to their start time and show the time range.
- Blog posts have a separate section, with GEPA team/community attribution rather than implying sole authorship. The nine GEPA entries reflect the live blog index on September 26, 2026.
- All five original photos live in a separate gallery with captions and links to full-size images. It advances every six seconds while visible, pauses on hover/focus, and has play/pause and previous/next controls. Reduced-motion preferences disable automatic movement by default; manual navigation pauses playback.
- Keep the asset-version query strings on the stylesheet and script in sync when changing interactions, so a cached script cannot be paired with incompatible new markup. The static HTML retains eight selected projects and their count until JavaScript initializes; without JavaScript all projects remain readable.
- Update the "Last updated" line in the footer and `lastmod` in `sitemap.xml` when publishing.
- To preview locally: `python3 -m http.server 8000` in the repository root, then open <http://localhost:8000/>.
- For a preview listening on local network interfaces, use `python3 -m http.server 8000 --bind 0.0.0.0`. Network/firewall settings still determine access from another device.

## Design and behavior

The homepage uses a two-column research layout on desktop and a single column on mobile, with a warm light theme and a system-aware dark theme. Research figures link to larger views; talks use locally served video thumbnails. Images below the introduction load lazily. The mobile portrait matches the width of the name using CSS. Motion honors `prefers-reduced-motion`; controls are keyboard accessible. Legacy section anchors still resolve, and direct links to unselected projects reveal those entries. The complete collection remains available without JavaScript and when printing.

The site keeps Google Analytics and the hidden MapMyVisitors tracker. No private source notes or session transcripts are included. The `site-redesign` branch is for development; `master` is the existing deployment branch.

## Acknowledgements

Earlier versions of this site were built on the [minimal-research-theme](https://github.com/SebastinSanty/minimal-research-theme) by [Sebastin Santy](http://sebastinsanty.com/), as modified by [Arkil Patel](https://arkilpatel.github.io/) and [Ayush Agrawal](https://ayush1801.github.io/), with fixes from [Shikhar Sharma](https://github.com/Shikharhacks007) and [Sidd](https://github.com/Sidd-Dino). The current design is a from-scratch rewrite, but I remain grateful to all of them.

## Legacy files

`d3/`, `nextprot/`, `javascript/`, `javascripts/`, `stylesheets/`, `fonts/`, `cites/`, `css/academicons*.css`, `css/custom.css`, and the older `images/` subfolders (`logos/`, `nicons/`, `icons/`) are kept from the previous version of the site. Nothing in `index.html` depends on them, but external links may, so leave them in place. The research figures in `images/sides/` and the NeurIPS photo in `assets/carousel_images/` are actively used by the current design.
