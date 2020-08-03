"""
Created to convert this NIV Bible XML file that I had. Followed the format:

<bible>
<b n="Book Name">
<c n="Chapter Number">
<v n="Verse Number">Verse</v>
</c>
</b>
</bible>
"""

from bs4 import BeautifulSoup
import json
import sys

file = sys.argv[1] if len(sys.argv) > 1 else '../../config/bibles/NIV.xml'
soup = BeautifulSoup(open(file).read(), 'lxml')
bible = {
    "meta": {
        "version": "NIV",
        "fullname": "New International Version",
        "language": "en",
        "date": 2011
    },
    "bible": {
    }
}

for book in soup.html.body.bible:
    if book.name is not None:
        # Start New Book
        bible['bible'][book['n']] = {}
        for chapter in book:
            if chapter.name is not None:
                # Start New Chapter
                bible['bible'][book['n']][chapter['n']] = {}
                for verse in chapter:
                    if verse.name is not None:
                        bible['bible'][book['n']][chapter['n']][verse['n']] = verse.string
                        print(book['n'], chapter['n'], verse['n'])

with open('NIV.json', 'w') as outfile:
    json.dump(bible, outfile)