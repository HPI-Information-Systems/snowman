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

To conduct these experiments, we implemented a naive approach that ...
