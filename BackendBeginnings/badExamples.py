from cohere.classify import Example

badExamples = [
    Example("It will die.", "negative"),
    Example("Risks are high.", "negative"),
    Example("Why is it so bad?", "negative"),
    Example("There is no way that it can fail, surely.", "negative"),
    Example("Desperate measures being taken", "negative"),
    Example("Sentenced to 11 years in prison.", "negative"),
    Example("An update is overdue.", "negative"),
    Example("Obsolete and outdated.", "negative"),
]
