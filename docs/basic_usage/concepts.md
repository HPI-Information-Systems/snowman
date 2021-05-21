# Concepts and Terminology

At the end of this page, you will understand the terminology and the key concepts used in Snowman.

## Terminology

### Entity Types

Snowman supports all entity types which are present in matching workflows.

| Concept           | Definition                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| Dataset           | A list of records which can but does not have to contain duplicates. Snowman only supports relational datasets. |
| Matching Solution | A Tool to deduplicate datasets.                                                                                 |
| Experiment        | The list of predicted duplicates produced when deduplicating a dataset with a matching solution.                |

That means that one matching solution can have multiple experiments belonging to the same dataset (e.g. corresponding to different configurations of the matching solution).

#### Example

Imagine you are running the Magellan data matching tool (open-source). It allows you to configure several aspects of how
it operates and thereby a lot of customization is possible.

For this use case, you would only create one matching solution *Magellan* within the tool.
For each configuration, you can afterwards create a new experiment containing information on the configuration within its description.

Have a look at the pages [Datasets](datasets.md), [Matching solutions](matching_solutions.md), and [Experiments](experiments.md) for information on how to manage them in Snowman.

### Special Entities

A *gold standard* is an experiment containing all duplicates a dataset contains.
A *silver standard* is an experiment containing a subset of the duplicates a dataset contains.

Altough there are different ways to produce gold standards and silver standards, Snowman puts them into one category.
Therefore Snowman provides a gold standard matching solution and a silver standard matching solution out of the box.
Assigning experiments to these matching solutions will let Snowman know whether an experiment is a gold standard or a silver standard.

### Similarity Scores

Some matching solutions output a similarity score next to the matching decision.
This score defines whether a pair is considered duplicate or not.
Snowman can make use of this information and allows you to define a *similarity score* for each experiment on every evaluation page.
Afterwards, a *similarity threshold* can be used to declare all pairs with a similarity score higher than this threshold as duplicate and all others as non duplicates.

## Next Steps

You should now have an understanding of the terminoloy and key concepts used in Snowman.
As a next step, have a look at [how you can configure Snowman](configuring_analyses.md) to get the most out of the analyses we provide.
