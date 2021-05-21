# Binary Metrics View

!!! info
    Requires a gold standard.

The *Binary Metrics View* allows you to explore how good an experiment performed by showing it's predictions and performance metrics.  
![Binary Metrics View](../../assets/benchmark-binary-metrics.png)

## Getting Started

1. [Add the benchmark dataset to Snowman](../datasets.md#adding-a-dataset)
2. [Add a gold standard for the dataset to Snowman](../experiments.md#adding-an-experiment)
3. [Add the experiment you want to investigate to Snowman](../experiments.md#adding-an-experiment)
4. Open the [Benchmark Dashboard](../configuring_analyses.md#benchmark-dashboard) and select the analysis *Binary Metrics View*.
5. [Select the dataset, the gold standard and your experiment in the configurator](../configuring_analyses.md#Configurator)

## Interpreting the Results

Metrics are calculated and shown in the top carousel.
You can step through all the available metric cards and get an overview over the quality of the experiment.
Keep in mind that these metrics are only as reliable as the gold standard is!
Some metrics may be unreliable when calculated with a silver standard.
In the future our tool will highlight such metrics (see [this issue](https://github.com/HPI-Information-Systems/snowman/issues/4)).

Also, you are able to inspect the true positives, false positives, false negatives and true negatives in the table below.
