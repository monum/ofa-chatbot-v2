import json
import csv

translations = []

with open('spanish.csv', 'rt') as f:
        reader = csv.DictReader(f, delimiter=',')

        for row in reader:
            translations.append(row['Spanish'])

with open('flow.json', 'rt') as f:
    data = json.load(f)

    for i in range(len(data['states'])):
        try:
            data['states'][i]['properties']['body'] = unicode(utranslations[i], "utf-8")
        except KeyError:
            print('Nothing here!')
            data['states'][i]['properties']['body'] = ''


with open('flow-spanish.json', 'w') as outfile:
    json.dump(data, outfile, indent=4)
