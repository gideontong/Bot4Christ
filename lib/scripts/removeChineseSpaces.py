"""
Remove spaces from the Chinese Bible
"""

import json
def translate(file):
    bible = json.loads(open(file).read())
    newBible = {}
    newBible['meta'] = bible['meta']
    newBible['bible'] = {}
    for book in bible['bible']:
        newBook = book.replace(' ', '')
        newBible['bible'][newBook] = {}
        for chapter in bible['bible'][book]:
            newBible['bible'][newBook][chapter] = {}
            for verse in bible['bible'][book][chapter]:
                newBible['bible'][newBook][chapter][verse] = bible['bible'][book][chapter][verse].replace(' ', '')
                print(newBook, chapter, verse)
    json.dump(newBible, open('new_' + file, 'w'))
translate('CUV.json')
translate('CUVS.json')