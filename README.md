# lakshyaaagrawal.github.io

Source for the homepage of Lakshya A Agrawal, served by GitHub Pages at [lakshyaaagrawal.github.io](https://lakshyaaagrawal.github.io/).

## Layout

The site is a single hand-written static page with no build step or framework.

| Path | Purpose |
| --- | --- |
| `index.html` | Bio; publications; open-source projects; talks; blogs; honors; background; expandable news archive |
| `css/site.css` | Styling; light/dark themes via CSS custom properties |
| `js/site.js` | Theme preference, research filters, direct-link handling, and navigation state (progressive enhancement only) |
| `images/` | Portrait (`profile-640.jpg`, `profile-1024.jpg`, source `profile.png`) |
| `images/research/`, `images/projects/`, `images/blogs/`, `images/talks/`, `images/sides/` | Research figures, project artwork, blog and video thumbnails; provenance in `images/SOURCES.md` |
| `assets/CV.pdf` | Current CV |
| `assets/papers/` | Locally hosted PDFs for older papers |
| `assets/logos/` | GEPA logo variants |
| `favicon.svg`, `*.png`, `site.webmanifest` | Icons (PNGs generated from `favicon.svg` with `rsvg-convert`) |
| `.github/workflows/static.yml` | Deploys the repository root to GitHub Pages on push to `master` |

## Editing

- Publications and technical reports are stored once as `<article class="work">` elements in `#research`. Give each a unique `id`, `data-topics`, and `data-selected="true"` or `"false"`. There are 14 publications, seven selected by default.
- Software entries are `<article class="work project">` elements in `#software`. All six projects are always visible and independent of publication filters. GEPA has a dedicated software entry linking to its paper; avoid repeating publication abstracts here.
- Topic values are `harness`, `training`, `evaluation`, `code`, and `systems`; an entry may have more than one, separated by spaces. All 20 entries remain readable without JavaScript.
- Keep each entry's summary, publication metadata, author list, code, and related links together. Full authorship is available in native disclosures. Publications and software projects have supporting thumbnails; preserve image provenance in `images/SOURCES.md`.
- Talks have their own section; only presentations by Lakshya belong there. Historical announcements live in the expandable news archive.
- Filter counts are calculated automatically from publications only. All publications reveals the complete paper collection; software is never hidden by a publication filter.
- Keep a single news list in the top Updates disclosure: it expands in place even without JavaScript. JavaScript moves it to the bottom archive while the top disclosure is closed, then returns it on expansion.
- Talks and background are fully open. Honors has its own top-level section. Education and teaching use compact paragraphs without removing details; additional open-source contributions live below the projects. Use recording, slides, and event links where available; otherwise just name the venue. Link video segments to their start time and show the time range.
- Blog posts are one flat collection: the personal essay, the distillation research note, and six GEPA posts listing Lakshya as an author in the source front matter. The introductory GEPA blog announcement is omitted. Do not include guest posts by other authors. Authorship was checked on September 26, 2026.
- News Coverage includes journalism, company case studies, tutorials, and comparisons. Descriptions should identify the relationship accurately, without presenting every mention as an endorsement or deployment.
- Present and past affiliations share a compact, linked logo section at the bottom. Keep logos out of Background and label fellowship affiliations clearly.
- All five original photos live in a separate gallery with captions and links to full-size images. It advances every four seconds while visible and has play/pause and previous/next controls. Reduced-motion preferences disable automatic movement by default; keyboard focus, manual navigation, and intentional horizontal scrolling pause playback. Ordinary vertical scrolling, hovering, and touch-start events must not permanently stop it.
- Keep the asset-version query strings on the stylesheet and script in sync when changing interactions, so a cached script cannot be paired with incompatible new markup. The static HTML retains seven selected publications and their count until JavaScript initializes; without JavaScript all publications remain readable.
- Run static content and filter regression checks with `node --test tests/site-content.test.cjs`. These tests do not replace browser layout testing.
- Update the "Last updated" line in the footer and `lastmod` in `sitemap.xml` when publishing.
- To preview locally: `python3 -m http.server 8000` in the repository root, then open <http://localhost:8000/>.
- For a preview listening on local network interfaces, use `python3 -m http.server 8000 --bind 0.0.0.0`. Network/firewall settings still determine access from another device.

## Design and behavior

The `faculty-layout` branch uses a single reading column for research, talks, blog posts, coverage, news, and background. Modest system-font headings, blue links, a white background, and unboxed entries keep the presentation close to a conventional faculty homepage. The system-aware dark theme remains available. On desktop, the bio wraps around the right-hand portrait and profile links; on mobile, the profile stacks above it. Research figures and talk thumbnails sit beside their entries, not in separate content columns. Research figures link to larger views, and all existing images and content are retained. Images below the introduction load lazily. The mobile portrait matches the width of the name using CSS. Motion honors `prefers-reduced-motion`; controls are keyboard accessible. Legacy section anchors still resolve, and direct links to unselected projects reveal those entries. The complete collection remains available without JavaScript and when printing.

The site keeps Google Analytics and the hidden MapMyVisitors tracker. No private source notes or session transcripts are included. `faculty-layout` is the quieter layout experiment; `site-redesign` retains the previous design, and `master` is the existing deployment branch.

## Acknowledgements

Earlier versions of this site were built on the [minimal-research-theme](https://github.com/SebastinSanty/minimal-research-theme) by [Sebastin Santy](http://sebastinsanty.com/), as modified by [Arkil Patel](https://arkilpatel.github.io/) and [Ayush Agrawal](https://ayush1801.github.io/), with fixes from [Shikhar Sharma](https://github.com/Shikharhacks007) and [Sidd](https://github.com/Sidd-Dino). The current design is a from-scratch rewrite, but I remain grateful to all of them.

## Legacy files

`d3/`, `nextprot/`, `javascript/`, `javascripts/`, `stylesheets/`, `fonts/`, `cites/`, `css/academicons*.css`, `css/custom.css`, and the older `images/` subfolders (`logos/`, `nicons/`, `icons/`) are kept from the previous version of the site. Nothing in `index.html` depends on them, but external links may, so leave them in place. The research figures in `images/sides/` and the NeurIPS photo in `assets/carousel_images/` are actively used by the current design.
