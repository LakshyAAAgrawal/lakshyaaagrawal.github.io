const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(root, 'js/site.js'), 'utf8');
const section = id => html.match(new RegExp('<section\\b[^>]*id="' + id + '"[^>]*>([\\s\\S]*?)</section>'))?.[1];
const articles = source => [...source.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)].map(m => m[0]);
const attr = (source, name) => source.match(new RegExp('\\b' + name + '="([^"]*)"'))?.[1];
const papers = articles(section('research'));
const projects = articles(section('software'));

test('publications and software are distinct, with a thumbnail per entry', () => {
  assert.equal(papers.length, 14);
  assert.equal(papers.filter(p => attr(p, 'data-selected') === 'true').length, 7);
  assert.equal(projects.length, 10);
  assert.deepEqual(projects.map(p => attr(p, 'id')), ['gepa-software', 'multilspy', 'dspy', 'omni', 'streamblocks', 'pytranslate', 'project-chip8emu', 'project-covidreliefbot', 'project-space_b__ars', 'project-covid']);
  for (const entry of [...papers, ...projects]) assert.match(entry, /class="work-visual(?: |")/);
  for (const entry of projects) assert.ok(!/\bhidden\b|data-selected=/.test(entry.split('>')[0]));
  assert.match(html, /Selected publications · 7 of 14/);
});

test('honors is separate and background paragraphs are compact', () => {
  assert.equal((section('honors').match(/<li>/g) || []).length, 9);
  assert.ok(!section('background').includes('recognition'));
  const education = section('background').split('Education &amp; experience</h3>')[1].split('<div class="service"')[0];
  assert.equal((education.match(/<p>/g) || []).length, 1);
  assert.match(section('software'), /Other open-source contributions include/);
  assert.equal((html.match(/Other open-source contributions include/g) || []).length, 1);
});

test('blog labels are removed and the supplied thumbnail is used', () => {
  assert.ok(!html.includes('Research note</span>'));
  assert.ok(!html.includes('Personal essay ·'));
  assert.equal((html.match(/class="blog-entry"/g) || []).length, 8);
  assert.match(html, /src="images\/blogs\/on-policy-distillation.jpg"/);
});

test('publication metadata, blog date, and affiliations match the corrections', () => {
  const gskill = papers.find(p => attr(p, 'id') === 'gskill');
  assert.ok(gskill.includes('https://dl.acm.org/doi/10.1145/3786335.3813196'));
  assert.ok(gskill.includes('ACM CAIS 2026 · Demo paper'));
  assert.ok(papers.find(p => attr(p, 'id') === 'knowing-is-not-seeing').includes('ICLR 2026 · ICBINB Workshop'));
  assert.ok(section('blogs').includes('<time datetime="2026-06-20">Jun 20, 2026</time>'));
  assert.ok(section('blogs').includes('News Coverage</h3>'));
  assert.ok(!section('background').includes('affiliation-logos'));
  assert.equal((section('affiliations').match(/<li>/g) || []).length, 12);
  assert.ok(html.indexOf('id="affiliations"') > html.indexOf('class="contact"'));
  assert.ok(section('background').includes('https://www.thelawrenceschool.org/'));
  assert.ok(section('background').includes('stylophone, Indian flute, and snare drums'));
  assert.ok(!section('background').includes('orchestra got me hooked'));
});

test('IDs, local anchors, assets, and cache versions remain valid', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const m of html.matchAll(/\bhref="#([^"]+)"/g)) assert.ok(ids.includes(m[1]), m[1]);
  for (const m of html.matchAll(/\b(?:src|href)="([^"#]+)"/g)) {
    if (/^(?:https?:|mailto:)/.test(m[1])) continue;
    const local = m[1].split('?')[0].replace(/^\//, '');
    assert.ok(fs.existsSync(path.join(root, local)), local);
  }
  assert.equal(html.match(/css\/site.css\?v=([^"\s]+)/)[1], html.match(/js\/site.js\?v=([^"\s]+)/)[1]);
});

test('bio edits, Stanford lecture, Ai2, and expandable projects are present', () => {
  const bio = html.split('<div class="intro-copy">')[1].split('</div>')[0];
  assert.ok(!/fortunate|very grateful|My research spans|Gonzalez|Stoica|Dimakis|Khattab/.test(bio));
  assert.ok(bio.includes('on code generation'));
  assert.ok(bio.includes('In <a href="#langprobe">LangProBe</a>, we mapped'));
  assert.ok(bio.includes('outperforming GRPO with fewer rollouts in our experiments'));
  assert.ok(section('talks').includes('Stanford CS329T · Oct 28, 2025'));
  assert.ok(section('talks').includes('https://web.stanford.edu/class/cs329t/syllabus.html'));
  assert.ok(section('background').includes('Ai2 (Allen Institute for AI)</a> in Summer 2025'));
  assert.ok(section('affiliations').includes('<h3>Present</h3>'));
  assert.ok(section('affiliations').includes('<h3>Past</h3>'));
  const more = section('software').match(/<details class="more-projects"[^>]*>([\s\S]*?)<\/details>/);
  assert.ok(more);
  assert.ok(!more[0].split('>')[0].includes(' open'));
  assert.equal(articles(more[1]).length, 4);
});

test('publication filters and direct links do not hide software projects', () => {
  const makeEntry = source => ({
    id: attr(source, 'id'),
    dataset: { selected: attr(source, 'data-selected'), topics: attr(source, 'data-topics') },
    hidden: /\bhidden\b/.test(source.split('>')[0]),
    scrollIntoView() {}, parentElement: null,
  });
  const works = papers.map(makeEntry);
  const software = projects.map(makeEntry);
  const moreProjects = { tagName: 'DETAILS', open: false, parentElement: null };
  software.filter(w => w.id.startsWith('project-')).forEach(w => { w.parentElement = moreProjects; });
  const buttons = [...section('research').matchAll(/<button\b[^>]*data-filter="([^"]+)"[^>]*>/g)].map(m => ({
    dataset: { filter: m[1] }, setAttribute() {}, addEventListener() {},
  }));
  const controls = { hidden: true, querySelectorAll: () => buttons };
  const status = { textContent: '' };
  const context = vm.createContext({
    document: {
      querySelector: selector => selector === '.research-controls' ? controls : status,
      querySelectorAll: selector => {
        assert.equal(selector, '#research .work');
        return works;
      },
      getElementById: id => [...works, ...software].find(w => w.id === id) || { scrollIntoView() {}, parentElement: null },
    },
    location: { hash: '' },
    requestAnimationFrame: fn => fn(),
  });
  vm.runInContext(script.slice(script.indexOf('  var controls ='), script.indexOf('  // One archive')), context);
  assert.equal(status.textContent, 'Selected publications · 7 of 14');
  assert.equal(works.filter(w => !w.hidden).length, 7);
  context.setFilter('all');
  assert.equal(works.filter(w => !w.hidden).length, 14);
  context.setFilter('systems');
  assert.deepEqual(works.filter(w => !w.hidden).map(w => w.id), ['barbarians', 'sparql']);
  context.setFilter('selected');
  vm.runInContext(script.slice(script.indexOf('  var topicAnchors ='), script.indexOf("  window.addEventListener('hashchange'")), context);
  for (const id of ['gepa-software', 'multilspy', 'dspy', 'software', 'honors']) {
    context.location.hash = '#' + id;
    context.revealHash();
    assert.equal(works.filter(w => !w.hidden).length, 7);
  }
  context.location.hash = '#project-chip8emu';
  context.revealHash();
  assert.equal(moreProjects.open, true);
  assert.equal(works.filter(w => !w.hidden).length, 7);
  context.location.hash = '#map';
  context.revealHash();
  assert.equal(works.filter(w => !w.hidden).length, 14);
  assert.ok(software.every(w => !w.hidden));
});
