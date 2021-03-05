# ACM SIGMOD 2021

Welcome participants of the [ACM SIGMOD 2021 programming contest](https://dbgroup.ing.unimore.it/sigmod21contest/)! This page contains some special information for you to get
started more easily with our tool.

Feel free to open an [issue](https://github.com/HPI-Information-Systems/snowman/issues/new/choose) in case you find a bug or see space for improvement :)

## Introduction

This tool will help you to compare and evaluate your data matching solutions. You can upload experiment results from
your data matching solution and then compare it with a goldstandard, compare two experiment runs with each other or
calculate binary metrics like precision or recall.

We are working closely with the contest team to allow for a seamless experience.

## Setup

To use snowman, you'll have to download the latest [release (Github Releases)](https://github.com/HPI-Information-Systems/snowman/releases) of
snowman for your specific os. After that you are able to start snowman!  
As a first step, we'd suggest for you to start with our section [Basic Usage](/basic_usage/introduction) or take a look at our intoductory video below
for a guide on how to benchmark and evaluate matching solutions with snowman.

[![Snowman Introduction Video](https://img.youtube.com/vi/wuJkkIByXjw/0.jpg)](https://www.youtube.com/watch?v=wuJkkIByXjw)  
_(Video hosted by YouTube)_

**Some contest datasets are already bundled with the release. Select one of them, upload your own experiment result and
start benchmarking!**

In case you'll want to upgrade later on, simply download the newest release and you're ready to go!

## Datasets

We've included an automatic importer for the gold standard format and validated that the below datasets can be imported
out of the box. More datasets will be added as soon as they are released by the contest team.

1. **Computers**: prepackaged dataset X1 and gold standard Y1

If you want to upload further datasets which have the same format as the SIGMOD-datasets, you will have to change some default settings 
in the dataset-uploader-dialog: Set the ```ID Column``` from ```id``` to ```instance_id``` and set the ```Escape character``` to ```"```. You can then select the dataset file and click on ```ADD```.

## Appendix

We wish all participants best of luck!
