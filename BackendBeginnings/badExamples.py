from cohere.classify import Example

NEGATIVE = "negative"

badExamples = [
    Example("It will die.", NEGATIVE),
    Example("Risks are high.", NEGATIVE),
    Example("Why is it so bad?", NEGATIVE),
    Example("There is no way that it can fail, surely.", NEGATIVE),
    Example("Desperate measures being taken", NEGATIVE),
    Example("Sentenced to 11 years in prison.", NEGATIVE),
    Example("An update is overdue.", NEGATIVE),
    Example("Obsolete and outdated.", NEGATIVE),
    Example("Stock plunges as utilities cite inflation", NEGATIVE),
    Example("Insolvencies on the rise, new data shows", NEGATIVE),
    Example("system issues", NEGATIVE),
    Example("crisis serves as warnings to retail investors", NEGATIVE),
    Example("bear market", NEGATIVE),
    Example("outsized risk could limit green spending", NEGATIVE),
    Example("cost of living soars", NEGATIVE),
    Example("Stock market plunges to erase 1.6T from Canadian's net worth", NEGATIVE),
    Example("Staff wipeout", NEGATIVE),
    Example("Gloom hanging over chip stocks", NEGATIVE),
    Example("Job eliminations will continue", NEGATIVE),
    Example("mass resignations", NEGATIVE),
    Example("housing fears in tight market", NEGATIVE),
    Example("the world has moved beyond", NEGATIVE),
    Example("recession dangers augur new era of policy tradeoffs", NEGATIVE),
    Example("has been fading for months", NEGATIVE),
    Example("public safety accounts urge caution", NEGATIVE)
]
