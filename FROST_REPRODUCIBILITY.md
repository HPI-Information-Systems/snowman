# Frost: Reproducing results from the paper

This document outlines and explains the experiments conducted for our paper "Frost: A Platform for Benchmarking and Exploring Data Matching Results".

## Figure 3

The data shown in the diagram ...

## Figure 6

In an attempt to validate our work towards effort measurement, we conducted a small experiment and let 3 undergraduate students
optimize arbitrary matching solutions from the market. Thereby, we observed that different approaches like active learning or
supervised machine learning each come with their own individual drawback - and that varying background also influence the results.
The key takeaway therefore is that it does make sense to track the effort spent, especially to judge a given matching solution
also towards its economical impact on a data deduplication challenge.

## Figure 7

To show the difficulties with optimzing a matching solution, we used the historic data of the SIGMOD 2021 Programming Contest.
Since the participants had to upload their implementations each time they wanted to test against the secret data, one can observe
the development process very granular.

_The data used in this figure is not publicly available._

## Table 1

To conduct these experiments, we implemented a naive approach that calculates each point of the diagram without making use of previous results.
Concretely, the naive implementation counts the numbers in the confusion matrix by creating an intersection of the clusterings of the ground truth and the experiment (similar to a repetitive execution of "Binary Metrics View" within Snowman).

We timed our custom implementation vs. the naive implementation at the API level measuring the response time until a result was returned from the server.
We made the measurements on the same machine in the same conditions five times and used their average as the result for the paper.

