import json

bible = json.loads(open('NIV.json').read())['bible']
meta = {
}
# 66
for book in bible:
    meta[book] = {}
    for chapter in bible[book]:
        meta[book][chapter] = len(bible[book][chapter])

with open('counts.json', 'w') as file:
    json.dump(meta, file)