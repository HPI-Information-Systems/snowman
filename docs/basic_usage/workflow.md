# Workflow

Each comparison setup within the benchmark tool is considered a workflow. This means that a single workflow consists of
a dataset, multiple experiments as well as a benchmark option.

Workflows are managed implicitly, so you do not need to create a new one each time you want to reconfigure the
comparison setup.

## Basic setup

1. Select a dataset.
   
2. Select multiple experiments.
   
3. Decide upon a benchmark to run.  
   _(Currently "Binary Comparison" is the only option and therefore selected by default!)_

## Assumptions

- Each workflow occurs on exactly one dataset. It is not possible to compare different datasets it later steps of a 
  workflow.
  
- Changing the datasets after e.g. experiments where selected will reset the workflow starting from scratch with the new
  dataset.
