# Benchmark

> This step is currently undergoing larger changes. At the moment, you can only do a binary comparison.

The following benchmarking options are currently available to be used in Snowman.
You can use the dashboard to choose between each of them.

!!! info
    Some benchmarking options depend on how many experiments and gold standards were selected.

## Binary Comparison

![Screenshot3](../assets/benchmark-binary.png "Binary comparison")

_This benchmarking option requires you to select a single gold standard and a single experiment._

For this option, binary metrics will be calculated and shown in the top carousel. You can step
through all the available metrics cards and get an overview over the quality of the experiment. Keep in mind that
these metrics are only as reliable as the gold standard is! Some metrics may be unreliable when calculated with a silver
standard - our tool will highlight such metrics if the `1.` experiment was flagged silver standard.

Also, you'll be able to further inspect the experiment's performance by taking a look at the reported false negatives,
false positives and true positives shown in the table below.

**Keep in mind that it may take some time to calculate the results shown on this page!**

## N-Metrics Viewer

_This benchmarking option requires you to select a single gold standard and at least one experiment._

Whenever you want to compare multiple experiments against a single ground truth, you can make use
of the N-Metrics viewer. It extends the Binary Comparison across multiple experiments and presents
the result in a table format.

By clicking on an experiment title, you can browse to the above Binary Comparison view with the
current experiment pre-selected against the given gold standard.

## Intersection Viewer

_This benchmarking option requires you to select one or multiple gold standards and experiments._

tbd
