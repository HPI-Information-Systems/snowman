# Similarity Diagrams

!!! info
    Requires a gold standard.

!!! info
    Your matching solution must output a similarity score next to the matching decision.

The *Similarity Diagrams* analysis allows you to find the best similarity threshold.
![Similarity Diagrams](../../assets/benchmark-similarity-function-graph.png)

## Getting Started

1. [Add the benchmark datasets to Snowman](../datasets.md#adding-a-dataset)
2. [Add gold standards for the datasets to Snowman](../experiments.md#adding-an-experiment)
3. [Add the experiments you want to investigate to Snowman](../experiments.md#adding-an-experiment)
   - Make sure that the experiment files you select contain a column for every similarity score you want to investigate.
   - Some matching solutions like Magellan automatically export similarity scores. If Snowman supports the experiment format, the similarity scores will automatically be detected.
4. Open the [Benchmark Dashboard](../configuring_analyses.md#benchmark-dashboard) and select the analysis *Similarity Diagrams*.
5. [Select the datasets, gold standards and experiments in the configurator](../configuring_analyses.md#Configurator)
6. [Select a similarity score to be investigated for every experiment](../configuring_analyses.md#Configurator)

## Interpreting the Results

This analysis allows you to see how metrics, such as precision or recall, evolve with different similarity thresholds.
Therefore, it helps you to find the best threshold for your use case.

You can hover over points in the diagram to show the similarity threshold they correspond to.
The metrics on the x axis and y axis can be changed with the dropdowns at the top of the page.
