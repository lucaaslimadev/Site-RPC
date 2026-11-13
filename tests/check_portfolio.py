"""Verify completeness against the imported source, including original image bytes."""
from pathlib import Path
from html.parser import HTMLParser
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
projects = json.loads((PUBLIC / 'projects.json').read_text())
originals = json.loads((ROOT / 'PORTFOLIO-SOURCES.json').read_text())['projects']

class GalleryPage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.zoom = []
        self.gallery = ''
        self.in_gallery = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
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
    for media in original['media']:
        path = PUBLIC / media['src'].lstrip('/')
        data = path.read_bytes()
        assert len(data) == media['bytes'], path
        assert hashlib.sha256(data).hexdigest() == media['sha256'], path
        assert media['width'] > 0 and media['height'] > 0, path
        total += 1
assert len(originals) == 10 and total == 72
print(f'OK: {len(projects)} complete source projects, {total} original images verified by SHA-256, all descriptions and deliverables rendered.')
