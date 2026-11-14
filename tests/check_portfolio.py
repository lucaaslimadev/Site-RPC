"""Verify completeness against the imported source, including original image bytes."""
from pathlib import Path
from html.parser import HTMLParser
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
projects = json.loads((PUBLIC / 'projects.json').read_text())
originals = json.loads((ROOT / 'PORTFOLIO-SOURCES.json').read_text())['projects']
covers = json.loads((ROOT / 'project-covers.json').read_text())
stories = json.loads((ROOT / 'project-stories.json').read_text())

class GalleryPage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.zoom = []
        self.gallery = ''
        self.in_gallery = False
        self.initial = None
        self.main_image = None
        self.selected_thumbnail = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'data-gallery-initial' in attrs:
            self.initial = int(attrs['data-gallery-initial'])
        if tag == 'img' and 'work-main-image' in attrs.get('class', '').split():
            self.main_image = attrs['src']
        if 'data-gallery-index' in attrs and attrs.get('aria-pressed') == 'true':
            self.selected_thumbnail = int(attrs['data-gallery-index'])
        if 'data-zoom' in attrs:
            self.zoom.append(attrs['data-zoom'])
        if tag == 'script' and 'data-gallery-data' in attrs:
            self.in_gallery = True

    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_gallery = False

    def handle_data(self, data):
        self.text.append(data)
        if self.in_gallery:
            self.gallery += data

assert [p['id'] for p in projects] == [p['id'] for p in originals]
assert set(stories) == {p['id'] for p in projects}
total = 0
for project, original in zip(projects, originals):
    page = GalleryPage()
    page.feed((PUBLIC / 'projetos' / project['id'] / 'index.html').read_text())
    rendered = ' '.join(page.text)
    for key in ('title', 'summary', 'context', 'deliverables'):
        assert project[key] == original[key], (project['id'], key)
        for text in project[key] if isinstance(project[key], list) else [project[key]]:
            assert text in rendered, (project['id'], 'Missing rendered text', text)
    assert project['media'] == original['media'], project['id']
    assert page.zoom == [m['src'] for m in original['media']], project['id']
    gallery = json.loads(page.gallery)
    assert [m['src'] for m in gallery] == page.zoom, project['id']
    cover = covers[project['id']]['index']
    assert page.initial == page.selected_thumbnail == cover, project['id']
    assert page.main_image == project['media'][cover]['src'], project['id']
    for field in ('headline', 'challenge', 'solution', 'outcome', 'proof'):
        assert stories[project['id']][field] in rendered, (project['id'], field)
    assert 0 <= stories[project['id']]['evidence'] < len(project['media'])
    for media in original['media']:
        path = PUBLIC / media['src'].lstrip('/')
        data = path.read_bytes()
        assert len(data) == media['bytes'], path
        assert hashlib.sha256(data).hexdigest() == media['sha256'], path
        assert media['width'] > 0 and media['height'] > 0, path
        total += 1
assert len(originals) == 10 and total == 72
print(f'OK: {len(projects)} complete source projects, {total} original images verified by SHA-256, all descriptions and deliverables rendered.')
