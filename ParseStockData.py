import json

f = open("stockData.txt", "r")

data = f.readlines()

parsedData = dict()

for line in data:
    try:
        line = line.split('-')
        line = line[0]
        symbol, name = line.split('|')
        symbol = symbol.strip()
        name = name.strip()
        parsedData[symbol] = name
    except:
        continue

with open("sample.json", "w") as outfile:
    json.dump(parsedData, outfile)
