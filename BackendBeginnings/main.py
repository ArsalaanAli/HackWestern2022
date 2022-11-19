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


def ParseForHeadlines(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    headings = soup.find_all("h3")
    inputs = [i.find("div").text for i in headings]
    return inputs


def ClassifyHeadlines(inputs):
    co = cohere.Client('yo3sGBCHSmIUSH3bQJNjzjYobJVka265uNZQ5Q8p')
    response = co.classify(
        model="large",
        inputs=inputs,
        examples=examples,
    )
    return response


def GetSentiment(inputs, response):
    sentiment = 0
    for i in range(len(inputs)):
        print()
        print(inputs[i])
        print(response.classifications[i])
        print()
        if response.classifications[i].prediction == "negative":
            sentiment -= response.classifications[i].confidence
        if response.classifications[i].prediction == "positive":
            sentiment += response.classifications[i].confidence
    sentiment /= len(inputs)
    sentiment += 1
    sentiment /= 2
    return sentiment


def GenerateDescription(sentiment):
    co = cohere.Client('yo3sGBCHSmIUSH3bQJNjzjYobJVka265uNZQ5Q8p')
    prompter = "This stock "+CATEGORIES[int(len(CATEGORIES)*sentiment)]
    response = co.generate(
        model='medium',
        prompt=prompter,
        max_tokens=40,
        temperature=0.6,
        stop_sequences=["."])
    stock_description = response.generations[0].text
    print(prompter+stock_description)


inputs = ParseForHeadlines(
    "https://www.google.com/search?q=meta&sxsrf=ALiCzsaSPDrf7gvK_75WAWemS43p92q4JA:1668867145331&source=lnms&tbm=nws&sa=X&ved=2ahUKEwiCrv_Ktrr7AhW4IjQIHdFdC74Q_AUoAXoECAEQAw&biw=1440&bih=821&dpr=2")
response = ClassifyHeadlines(inputs)
sentiment = GetSentiment(inputs, response)
GenerateDescription(sentiment)

# Read the Room
# Tough Crowd
# Litmus Test
# Temperature
