from bs4 import BeautifulSoup
import cohere
from cohere.classify import Example
import requests

# This stock...
CATEGORIES = ["should be avoided", "will likely lead to a loss",
              "is neutral", "will likely lead to gains", "is an excellent investment opportunity"]

examples = [
    Example("It will die.", "negative"),
    Example("Will stand the test of time.", "positive"),
    Example("Risks are high.", "negative"),
    Example("First black manager hired.", "positive"),
    Example("Why is it so bad?", "negative"),
    Example("Will be updated to be better.", "positive"),
    Example("There is no way that it can fail, surely.", "negative"),
    Example("Not as bad as you think.", "positive"),
    Example("Desperate measures being taken", "negative"),
    Example("Expands to new horizons", "positive"),
]

URL = "https://www.google.com/search?q=jesus&sxsrf=ALiCzsb3_47bWJyYZ73939rKgCDhXNcrNQ:1668852611519&source=lnms&tbm=nws&sa=X&ved=2ahUKEwiz6t24gLr7AhUbIjQIHVy1DEIQ_AUoA3oECAMQBQ&biw=1440&bih=821&dpr=2"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
headings = soup.find_all("h3")
inputs = [i.find("div").text for i in headings]

co = cohere.Client('yo3sGBCHSmIUSH3bQJNjzjYobJVka265uNZQ5Q8p')
response = co.classify(
    model="large",
    inputs=inputs,
    examples=examples,
)

sentiment = 0
for i in range(len(inputs)):
    if response.classifications[i].prediction == "negative":
        sentiment -= response.classifications[i].confidence
    if response.classifications[i].prediction == "positive":
        sentiment += response.classifications[i].confidence
sentiment /= len(inputs)
sentiment += 1
sentiment /= 2

prompter = "This stock "+CATEGORIES[int(len(CATEGORIES)*sentiment)]
response = co.generate(
    model='medium',
    prompt=prompter,
    max_tokens=40,
    temperature=0.6,
    stop_sequences=["."])

stock_description = response.generations[0].text
print(prompter+stock_description)

# Read the Room
# Tough Crowd
# Litmus Test
# Temperature
