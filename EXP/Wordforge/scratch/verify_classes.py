import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

class_matches = re.findall(r'class=["\']([^"\']+)["\']', html)
all_classes = set()
for c in class_matches:
    for item in c.split():
        all_classes.add(item.strip())

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

missing = [c for c in sorted(all_classes) if f".{c}" not in css]
print(f"Total HTML classes: {len(all_classes)}")
print(f"Classes not in styles.css: {missing}")
