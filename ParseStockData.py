import pandas as pd
import json

data = pd.read_csv('stock.csv')
parsedData = dict()

for i in range(len(data)):
    curStock = data.iloc[i]
    value = curStock["Name"].strip("Common Stock").strip("Ordinary Shares").strip("Unit").strip("Units").strip()
    parsedData[value] = curStock["Symbol"]


with open("AllStocks.json", "w") as outfile:
    json.dump(parsedData, outfile)
