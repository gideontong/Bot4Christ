'''
Loads the Bible and generates all pre-run files for future caching runs.
'''

from json import load, dump


if __name__ == '__main__':
    with open('config/bible/config.json', encoding='utf-8') as fp:
        config = load(fp)

    books = list(config['books'].keys())
    output = dict()
    for i, name in enumerate(books):
        output[name] = dict()
        output[name]['precedingBooks'] = books[:i]
        output[name]['subsequentBooks'] = books[i + 1:]

    with open('config/bible/ordering.json', 'w', encoding='utf-8') as fp:
        dump(output, fp, indent=2, sort_keys=True)
