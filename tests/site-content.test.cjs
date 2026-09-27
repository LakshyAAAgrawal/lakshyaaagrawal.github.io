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
  assert.equal(projects.length, 5);
  assert.deepEqual(projects.map(p => attr(p, 'id')), ['multilspy', 'dspy', 'omni', 'streamblocks', 'pytranslate']);
  for (const entry of [...papers, ...projects]) assert.match(entry, /class="work-visual(?: |")/);
  for (const entry of projects) assert.ok(!/\bhidden\b|data-selected=/.test(entry.split('>')[0]));
  assert.match(html, /Selected publications · 7 of 14/);
});

test('honors is separate and background paragraphs are compact', () => {
  assert.equal((section('honors').match(/<li>/g) || []).length, 9);
  assert.ok(!section('background').includes('recognition'));
  const education = section('background').split('Education &amp; experience</h3>')[1].split('<div class="affiliation-logos"')[0];
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

test('publication filters and direct links do not hide software projects', () => {
  const makeEntry = source => ({
    id: attr(source, 'id'),
    dataset: { selected: attr(source, 'data-selected'), topics: attr(source, 'data-topics') },
    hidden: /\bhidden\b/.test(source.split('>')[0]),
    scrollIntoView() {}, parentElement: null,
  });
  const works = papers.map(makeEntry);
  const software = projects.map(makeEntry);
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
  for (const id of ['multilspy', 'dspy', 'software', 'honors']) {
    context.location.hash = '#' + id;
    context.revealHash();
    assert.equal(works.filter(w => !w.hidden).length, 7);
  }
  context.location.hash = '#map';
  context.revealHash();
  assert.equal(works.filter(w => !w.hidden).length, 14);
  assert.ok(software.every(w => !w.hidden));
});
