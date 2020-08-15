import json

bible = json.loads(open('NIV.json').read())['bible']
names = json.loads(open('bible.json').read())['bookmap']
meta = {
}
# 66
for book in names.keys():
    meta[book] = {}
    for chapter in bible[names[book]['NIV']]:
        meta[book][chapter] = len(bible[names[book]['NIV']][chapter])

with open('counts_updated.json', 'w') as file:
    json.dump(meta, file)