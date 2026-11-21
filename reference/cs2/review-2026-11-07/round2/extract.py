import re, base64, os, sys
src = sys.argv[1]
t = open(src).read()
os.makedirs('img', exist_ok=True)
# Each section image tag carries alt="Frame screenshot: NAME"
pairs = re.findall(r'<img src="data:image/png;base64,([^"]+)" alt="Frame screenshot: ([^"]+)"', t)
seen = {}
for b, name in pairs:
    seen.setdefault(b, name)
print(len(pairs), 'imgs', len(seen), 'unique')
for b, name in pairs:
    print(name, len(b))
import json
json.dump({name: b for b, name in pairs}, open('imgs.json', 'w'))
