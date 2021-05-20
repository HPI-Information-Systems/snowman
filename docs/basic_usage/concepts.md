# Concepts and Terminology

At the end of this page, you will understand the terminology and the key concepts used in Snowman.
If you are experienced in the data matching context, you can start reading at [Special Entities](#special-entities).

## Terminology

### Entity Types

Snowman supports all entity types which are present in matching workflows.

| Concept           | Definition                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| Dataset           | A list of records which can but does not have to contain duplicates. Snowman only supports relational datasets. |
| Matching Solution | A Tool to deduplicate datasets.                                                                                 |
| Experiment        | The list of predicted duplicates produced when deduplicating a dataset with a matching solution.                |

That means that one matching solution can have multiple experiments belonging to the same dataset (e.g. corresponding to different configurations of the matching solution).

### Special Entities

A *gold standard* is an experiment containing all duplicates a dataset contains.
A *silver standard* is an experiment containing a subset of the duplicates a dataset contains.

Altough there are different ways to produce gold standards and silver standards, Snowman puts them into one category.
Therefore Snowman provides a gold standard matching solution and a silver standard matching solution out of the box.
Assigning experiments to these matching solutions will let Snowman know whether an experiment is a gold standard or a silver standard.

### Similarity Functions

Some matching solutions output a relevance score or similarity values next to the matching decision.
Snowman can make use of this information and allows you to define *similarity functions*.
A similarity function belongs to an experiment and defines whether a pair is considered duplicate or not.
For that it uses the relevance score or similarity values provided by the matching solution.
It aggregates them to a scalar value which corresponds to the likeliness of a pair being a duplicate.
A *similarity threshold* can be used to declare all pairs with a duplicate likeliness higher than this threshold as duplicate and all others as non duplicates.

## Next Steps

You should now have an understanding of the terminoloy and key concepts used in Snowman.
As a next step, have a look at what you can do with Snowman.
