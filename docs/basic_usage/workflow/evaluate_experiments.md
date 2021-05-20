# Evaluating Experiments

Snowman can also be used to improve matching solutions by evaluating experiments.
It provides different analysis views for this goal.

Keep in mind that most of these analyses require a gold standard.

## Binary Metrics View

!!! info
    Requires a gold standard.

![Binary Metrics View](../../assets/benchmark-binary-metrics.png "Binary Metrics View")

For this option, metrics will be calculated and shown in the top carousel. You can step
through all the available metrics cards and get an overview over the quality of the experiment. Keep in mind that
these metrics are only as reliable as the gold standard is! Some metrics may be unreliable when calculated with a silver
standard - in the future our tool will highlight such metrics (see [this issue](https://github.com/HPI-Information-Systems/snowman/issues/4)).

Also, you are able to inspect the true positives, false positives, false negatives and true negatives shown in the table below.

## N-Metrics Table

!!! info
    Requires a gold standard.

![N-Metrics Table](../assets/benchmark-nmetrics.png "N-Metrics Table")

Whenever you want to compare multiple experiments against a single ground truth, you can make use
of the N-Metrics Table. It extends the Binary Metrics View across multiple experiments and presents the result in a table format.

Clicking on an experiment in the header opens the [Binary Metrics View](#binary-metrics-view) for this experiment.

## N-Intersection Viewer

![N-Intersection Viewer](../../assets/benchmark-intersection.png "N-Intersection Viewer")

This page allows you to browse intersections of experiments. It can for example answer the question which ground truth duplicate pairs have not been found by one or more experiments (a gold standard is not required for this page).

Clicking on an area in the Venn diagram intersects all experiments which are present in this area. By using the drag'n'drop selector below the Venn diagram, other experiments can now be excluded from the intersection. The example above could therefore be achieved by first clicking on the green area in the picture and then dragging `hpi-run2` from `available` to `exclude`.

## Similarity Diagrams

!!! info
    Requires a gold standard. Further your matching solution must output a similarity score next to the matching decision.

![Similarity Diagrams](../../assets/similarityfunction-graph.png "Similarity Diagrams")

This analysis allows you to see how metrics, such as precision or recall, evolve with different similarity thresholds.
Therefore, it helps you to find the best threshold for your use case.

You can hover over points in the diagram to show the similarity threshold they correspond to. The metrics on the x axis and y axis can be changed with the dropdowns at the top of the page.
