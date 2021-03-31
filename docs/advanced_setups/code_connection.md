# Connect your code

To more easily pipe results from your code right into Snowman, you can make use of its API.
The following guide will outline the necessary steps and give you a brief introduction.

## Snowman API

Whenever a local Snowman instance is running, the API is listening at `http://localhost:8123/api`
for requests to arrive. This interface is also used by the Snowman frontend itself.

As no further authorization is implemented, every process on your computer is able to fully make
use of Snowman's capabilities. Adding it your application is therefore pretty easy.

Uploading results consists of two steps:

0. Add the dataset to Snowman.
1. Create a new experiment.
2. Upload data to it.

## Use case

In this example, we want to export our results from a python script running an ML mode for
duplicate detection. Consider the following example:

```python
import io
import csv

...

# Results produced by the ML solution
results = ...

# Create a new string builder to write to
output = io.StringIO()
writer = csv.writer(output, quoting=csv.QUOTE_NONNUMERIC)

# Write the CSV header
writer.writerow(["p1", "p2", "prediction"])

for row in results:
    # Write each row, prediction is either 0 (no duplicate) or 1 (duplicate)
    writer.writerow([row["id1"], row["id2"], row["label"]])

# CSV string to upload to Snowman
output.getvalue()
```

With this code, we are able to convert the previously labeled data into the csv format
the API is able to understand - in this case, the [`pilot`](/basic_usage/experiments) format.

It remains now to upload the csv data.

## Upload results

As outlined above, this procedure consists of two steps.

tbd
