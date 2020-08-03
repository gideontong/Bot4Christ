"""
Converts Bibles from https://bible4u.net/en/download
"""

from bs4 import BeautifulSoup
import json
import sys

file = sys.argv[1] + '.xml' if len(sys.argv) > 1 else 'AKJV.xml'
soup = BeautifulSoup(open(file).read(), 'lxml')
bible = {
    "meta": {
        "version": "AKJV",
        "fullname": "American King James Version",
        "language": "en",
        "date": 1999,
        "copyright": "Public Domain"
    },
    "bible": {
    }
}

for book in soup.html.body.xmlbible:
    if book.name == 'biblebook':
        # Start New Book
        bible['bible'][book['bname']] = {}
        for chapter in book:
            if chapter.name is not None:
                # Start New Chapter
                bible['bible'][book['bname']][chapter['cnumber']] = {}
                for verse in chapter:
                    if verse.name is not None:
                        bible['bible'][book['bname']][chapter['cnumber']][verse['vnumber']] = verse.string
                        print(book['bname'], chapter['cnumber'], verse['vnumber'])

with open(sys.argv[1] + '.json', 'w') as outfile:
    json.dump(bible, outfile)