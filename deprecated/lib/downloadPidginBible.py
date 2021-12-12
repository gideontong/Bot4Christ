"""
Downloads the pidgin Bible
"""

import requests
import json
from bs4 import BeautifulSoup

base = 'http://www.pidginbible.org/conc/'
entry_point = 'ChapterIndex.htm'
entry_soup = BeautifulSoup(requests.request('GET', base + entry_point).text.encode('utf8'), 'html.parser')
data_links = { 'availableBooks': [], 'books': {} }
for link in entry_soup.find_all('a'):
    if 'Word' in link.text:
        continue
    if 'TOC' in link.get('href'):
        data_links['availableBooks'].append(link.text)
        data_links['books'][link.text] = { 'link': link.get('href'), 'chapters': {} }
    else:
        data_links['books'][data_links['availableBooks'][-1]]['chapters'][link.text] = link.get('href')
# Uncomment to dump the endpoints
"""
with open('pidginEndpoints.json', 'w') as endpoints:
    json.dump(data_links, endpoints)
"""
bible = {
    'meta': {
        'version': 'HPB',
        'fullname': "Da Hawai'i Pidgin Bible",
        'language': 'en',
        'date': 2009,
        'copyright': 'Copyright © 2009-2010 Wycliffe Bible Translators'
    },
    'bible': {}
}
for book in data_links['books']:
    bible['bible'][book] = {}
    if data_links['books'][book]['chapters'] == {}:
        bible['bible'][book]['1'] = {}
        book_soup = BeautifulSoup(requests.request('GET', base + data_links['books'][book]['link']).text.encode('utf8'), 'html.parser')
        for verse_group in book_soup.find_all(class_='prose'):
            for span in verse_group.find_all('span'):
                if span['id'].count('.') != 2:
                    continue
                data_flag = span['id'].split('.')
                bible['bible'][book][data_flag[1]][data_flag[2]] = span.next_sibling[:-2]
                print(book, data_flag[1], data_flag[2])
        continue
    for chapter in data_links['books'][book]['chapters']:
        bible['bible'][book][chapter] = {}
        chapter_endpoint = base + data_links['books'][book]['chapters'][chapter]
        chapter_soup = BeautifulSoup(requests.request('GET', chapter_endpoint).text.encode('utf8'), 'html.parser')
        for verse_group in chapter_soup.find_all(class_='prose'):
            for span in verse_group.find_all('span'):
                try:
                    if span['id'].count('.') != 2:
                        continue
                    data_flag = span['id'].split('.')
                    bible['bible'][book][data_flag[1]][data_flag[2]] = span.next_sibling[:-2]
                except:
                    print('[ERROR]', book, data_flag[1], data_flag[2])
                    pass
                print(book, data_flag[1], data_flag[2])
with open('HPB.json', 'w') as exportFile:
    json.dump(bible, exportFile)