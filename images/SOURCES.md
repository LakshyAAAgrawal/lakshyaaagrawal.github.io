# Website imagery

Research visuals stay attached to their project entries. Existing figures in `sides/` and personal photographs in `assets/carousel_images/` are preserved from the previous website.

## Publication and software split

- `blogs/on-policy-distillation.jpg`: user-supplied `HLR7rClaAAAClUQ.jpeg` from Downloads, copied unchanged for the distillation post.
- `research/barbarians.png`: [ADRS architecture figure](https://arxiv.org/html/2512.14806v1/ADRS_evolve_v5.png) from *Let the Barbarians In*.
- Combee and gskill publication entries reuse their respective blog figures listed below.
- `projects/language-server.png`: [Language Server Protocol overview diagram](https://raw.githubusercontent.com/microsoft/language-server-protocol/gh-pages/_overviews/lsp/img/language-server.png), used to illustrate the protocol multilspy implements, not presented as a multilspy-specific result.
- `projects/dspy.png`: [official DSPy logo](https://raw.githubusercontent.com/stanfordnlp/dspy/main/docs/docs/static/img/dspy_logo.png).
- `projects/streamblocks.png`: [CAL actor diagram](https://raw.githubusercontent.com/streamblocks/streamblocks-graalvm/master/res/ActorModel.png) from the StreamBlocks GraalVM repository.
- `projects/maxima.png`: [Maxima computation and plotting example](https://maxima.sourceforge.io/img/maxima-banner.png), used to illustrate Pytranslate's host system, not its own output.
- optimize_anything omni reuses `blogs/omni.png`.
- *Knowing Is Not Seeing* currently uses a typographic paper-cover thumbnail containing its title and venue, not an invented research figure. OpenReview blocked automated access to the PDF; replace this cover with a supplied figure when available.

New local assets:

- `research/fst.png`: [Fast-Slow Training blog](https://gepa-ai.github.io/gepa/blog/2026/05/11/learning-fast-and-slow/), `fst_diagram.png`. Resized to 1800 pixels wide for web delivery.
- `research/optimize-anything.png`: [optimize_anything introduction](https://gepa-ai.github.io/gepa/blog/2026/02/18/introducing-optimize-anything/), `header_image.png`. Resized to 1600 pixels wide.
- `research/agents-in-production.png`: [Measuring Agents in Production, arXiv v1](https://arxiv.org/html/2512.04123v1), `agent_architecture_definition.png`.
- `research/mmgrpo-talk.jpg`: thumbnail of [Noah Ziems’s ACM CAIS presentation](https://www.youtube.com/watch?v=JT9JYNFrs80). Used only with the research entry, not as a talk by Lakshya.
- `talks/ai-engineer.jpg`: thumbnail of [Lakshya’s AI Engineer World’s Fair talk](https://www.youtube.com/watch?v=OA-Mc60Rboo).
- `talks/delta.jpg`: thumbnail of [Delta Podcast, episode 52](https://www.youtube.com/watch?v=HtxnqtTQKuQ).
- `talks/weaviate.jpg`: thumbnail of [Weaviate Podcast, episode 127](https://www.youtube.com/watch?v=fREQrxhBSk0).
- `talks/iclr.jpg`: thumbnail of [GEPA’s ICLR oral presentation](https://www.youtube.com/watch?v=HbGah-uP1fI).
- `talks/ucsd.jpg`: thumbnail of [the UCSD guest lecture](https://www.youtube.com/watch?v=vJ6F2duUC_0&t=33s).
- `talks/cais.jpg`: thumbnail of [the optimize_anything ACM CAIS talk](https://www.youtube.com/watch?v=XWOwqN2BpjM).
- `talks/laude-podcast.jpg`: thumbnail of [the podcast with Andy Konwinski](https://www.youtube.com/watch?v=mmpW36WdFbI&t=2707s), linking to Lakshya’s segment at 45:07–48:36.
- `talks/laude-frontier.jpg`: thumbnail of [Laude Open Frontier](https://www.youtube.com/watch?v=rePCdzfITKc&t=1131), linking to Lakshya’s GEPA presentation at 18:51–36:31.

The personal essay uses the user-supplied `HK1FizDbIAAKyB7.jpeg` from Downloads, copied to `blogs/owning-token-capital.jpg` and resized to 900 pixels wide. GEPA posts use their own figures or the project logo.

YouTube thumbnails are served locally and link to their respective videos; no video embeds or autoplay are used. Scientific figures retain their aspect ratios and link to a larger view. Alternate text describes the subject of each visual.

## Link icons and affiliations

Inline SVG icons in `index.html` are from [Bootstrap Icons](https://github.com/twbs/icons), under the MIT license preserved in `images/BOOTSTRAP-ICONS-LICENSE.txt`. They supplement visible labels rather than replacing them. IIIT-Delhi, Microsoft, EPFL, and GSoC logos in `images/logos/` are reused from the deployed `master` website, as is `images/berkeley_sky.png`.

Additional affiliation marks are sourced from the institutions themselves:

- `logos/berkeley.svg`: [UC Berkeley wordmark](https://www.berkeley.edu/wp-content/themes/berkeleygateway/img/logo-berkeley.svg?v=3).
- `logos/bair.png`: [BAIR logo](https://bair.berkeley.edu/blog/assets/BAIR_Logo.png).
- `logos/berkeley-nlp.png`: [Berkeley NLP logo](https://nlp.cs.berkeley.edu/logo.png).
- `logos/laude.svg`: [Laude mark](https://www.laude.org/images/logo/swirl-2-rings-black.svg).
- `logos/aws.png`: [AWS logo](https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png), used for the explicitly labeled fellowship affiliation.
- `logos/incf.png`: [INCF logo](https://www.incf.org/sites/default/files/incf_logo_grey.png), labeled INCF / Maxima for the GSoC affiliation.
- `logos/ai2.svg`: official Ai2 logo symbol (`ai2-logo-svg`) extracted without changing its paths from [Ai2’s website](https://allenai.org/).

Additional project thumbnails come from the linked repositories:

- `projects/chip8emu.png`: [CHIP-8 emulator screenshot](https://raw.githubusercontent.com/LakshyAAAgrawal/chip8emu/master/res/Screenshots/s1.png).
- `projects/space-bars.png`: [Space_B__ars gameplay](https://raw.githubusercontent.com/LakshyAAAgrawal/Space_B__ars/master/assets/images/Game_Play.png).
- `projects/covid.png`: [CoVid demo image](https://raw.githubusercontent.com/LakshyAAAgrawal/CoVid/master/res/images/demo_image.png).

The Stanford CS329T lecture uses the existing GEPA project logo, not a fabricated lecture thumbnail. Its date and slides are linked from the [course syllabus](https://web.stanford.edu/class/cs329t/syllabus.html).

## Blog thumbnails

The blog collection was checked against [GEPA’s sitemap](https://gepa-ai.github.io/gepa/sitemap.xml) on September 26, 2026. New thumbnails are resized to at most 640 pixels, retain their native aspect ratios, and link to the corresponding post:

The displayed collection is restricted to posts whose [source front matter](https://github.com/gepa-ai/gepa/tree/main/docs/docs/blog/posts) lists `lakshya` as an author. The two guest posts (`confidence-adapter-benchmark` and `bridging-the-subjectivity-gap`) are not displayed; their previously downloaded thumbnails are retained as unused assets.
- `blogs/subjectivity.png`: [original figure](https://gepa-ai.github.io/gepa/blog/2026-09-17-bridging-the-subjectivity-gap/images/subjectivity-gap.png).
- `blogs/parallel.png`: [original figure](https://gepa-ai.github.io/gepa/blog/2026-07-30-parallel-proposals/images/throughput.png).
- `blogs/omni.png`: [original figure](https://gepa-ai.github.io/gepa/blog/2026-07-22-optimize-anything-omni/images/omni_bar.png).
- `blogs/combee.png`: [original figure](https://gepa-ai.github.io/gepa/blog/2026-04-09-gepa-at-scale-with-combee/images/design.png).
- `blogs/confidence.png`: [original figure](https://gepa-ai.github.io/gepa/blog/2026-03-17-confidence-adapter-benchmark/images/accuracy_comparison.png).
- `blogs/skills.png`: [original figure](https://gepa-ai.github.io/gepa/blog/2026-02-18-automatically-learning-skills-for-coding-agents/gskill-pipeline.png).
