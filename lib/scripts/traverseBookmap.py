import json
import os

bookmap = {}

for book in json.loads(open('../../config/meta/counts.json').read()):
    bookmap[book] = []

for bible in os.listdir('../../config/bibles'):
    if 'HPB' in bible:
        continue
    print(bible)
    books = list(json.loads(open('../../config/bibles/' + bible).read())['bible'].keys())
    mapkeys = list(bookmap.keys())
    for i in range(len(books)):
        if books[i] not in bookmap[mapkeys[i]]:
            bookmap[mapkeys[i]].append(books[i])

json.dump(bookmap, open('bookmap.json', 'w'))