"""
Traverse the books and create a map of each version

* Has special handling for HPB since it doesn't have all the books
* Does not support the Acrypopha
* Allows limited range of books, like the Torah/Hebrew Bible/Westminister
"""

import json
import os

bookmap = {}

for book in json.loads(open('../../config/meta/counts.json').read()):
    bookmap[book] = {}

def set_hpb():
    books = json.loads(open('pidginMap.json').read())
    for book in books:
        bookmap[book]['HPB'] = books[book]

for bible in os.listdir('../../config/bibles'):
    print(bible)
    if 'HPB' in bible:
        set_hpb()
        continue
    books = list(json.loads(open('../../config/bibles/' + bible).read())['bible'].keys())
    mapkeys = list(bookmap.keys())
    for i in range(len(books)):
        bookmap[mapkeys[i]][bible[:-5]] = books[i]

json.dump(bookmap, open('bookmap.json', 'w'))