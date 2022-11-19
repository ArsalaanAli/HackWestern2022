data = []
while True:
    x = input()
    if x != "end":
        data.append(x)
    else:
        break


print(data[0].split()[0])
