"""
Convert this specific NASB file I found.
"""

import json

bible = {
    "meta": {
        "version": "NASB",
        "fullname": "New American Standard Bible",
        "language": "en",
        "date": 1995,
        "copyright": "Scripture quotations taken from the New American Standard Bible® (NASB), Copyright © 1960, 1962, 1963, 1968, 1971, 1972, 1973, 1975, 1977, 1995 by The Lockman Foundation"
    },
    "bible": {
    }
}

data = json.load(open('import.json'))
for verse in data:
    bookName = verse['fields']['book'].split(' ')
    for i in range(len(bookName)):
        if bookName[i] != 'of':
            bookName[i] = bookName[i][0].upper() + bookName[i][1:]
    verse['fields']['book'] = ' '.join(bookName)
    if verse['fields']['book'] not in bible['bible']:
        bible['bible'][verse['fields']['book']] = {}
    if verse['fields']['chapter'] not in bible['bible'][verse['fields']['book']]:
        bible['bible'][verse['fields']['book']][verse['fields']['chapter']] = {}
    bible['bible'][verse['fields']['book']][verse['fields']['chapter']][verse['fields']['verse']] = verse['fields']['text']
    print(verse['fields']['book'], verse['fields']['chapter'], verse['fields']['verse'])

with open('NASB.json', 'w') as outfile:
    json.dump(bible, outfile)