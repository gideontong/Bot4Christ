'''
Takes "Books of the Bible Descriptions" spreadsheet and
generates the corresponding JSON file.
'''

from argparse import ArgumentParser
from csv import DictReader
from json import dump

parser = ArgumentParser()
parser.add_argument('file', type=str)

if __name__ == '__main__':
    args = parser.parse_args()

    js = dict()
    with open('config/bible/descriptions.json', 'w') as js_fp, open(args.file) as xl_fp:
        reader = DictReader(xl_fp)
        for row in reader:
            js[row['Name']] = row['Desc']
        
        dump(js, js_fp, indent=2)