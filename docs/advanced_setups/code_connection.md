# Connect your code

To more easily pipe results from your code into Snowman, you can make use of its [REST API](../swagger/index.html).
The following guide will outline the necessary steps and give you a brief introduction.

## Snowman API

Whenever a local Snowman instance is running, the API is listening at `http://localhost:8123/api` (can be [configured via command line arguments](../dev_setup/introduction.md#command-line-arguments)).
This interface is also used by the Snowman frontend.

**Be advised: We have not yet implemented any security features or authorization.**
That means every process with access to the host is able to access the API.
Progress is tracked in issue [#107](https://github.com/HPI-Information-Systems/snowman/issues/107).

You can upload results in two steps:

1. Create a new experiment.
2. Upload data to it.

## Use case

In this example, we want to export our results from a python script running a ML matching solution. Consider the following code:

```python
import io
import csv

...

# Results produced by the ML solution
candidate_pairs = ...

# Create a new string builder to write to
output = io.StringIO()
writer = csv.writer(output, quoting=csv.QUOTE_NONNUMERIC)

# Write the CSV header
writer.writerow(['p1', 'p2', 'prediction'])

for candidate_pair in candidate_pairs:
    # Write each row, prediction/label is either 0 (no duplicate) or 1 (duplicate)
    writer.writerow([candidate_pair['id1'], candidate_pair['id2'], candidate_pair['label']])

# CSV string to upload to Snowman
csv_string = output.getvalue()
print(csv_string)
```

With this code, we are able to convert the results into a csv format
the API is able to understand - in this case, the [`pilot`](/basic_usage/experiments) format.

It remains to upload the csv data.

## Upload results

As outlined above, this procedure consists of two steps.

First, create a new experiment. *Note: You will need a `datasetId` and `algorithmId` to assign the experiment to. We recommend creating (or selecting) a dataset and matching solution (algorithm) with the UI. The IDs are shown in brackets behind the header of all edit dialogs.*

```python
import requests

new_experiment_payload = {'datasetId': 5, 'algorithmId': 2, 'name':'my-example-run-01','description':'automatic-upload'}
create_experiment_response = requests.post('http://localhost:8123/api/v1/experiments', json=new_experiment_payload)
new_experiment_id = create_experiment_response.text
print(new_experiment_id)
```

This will return the new experiment's id which you will need in the next step.

Now upload the data we already exported to csv:

```python
import requests

upload_pairs_response = requests.put(f'http://localhost:8123/api/v1/experiments/{new_experiment_id}/file?format=pilot', data=csv_string, headers={'Content-Type': 'text/csv'})
print(upload_pairs_response.status_code)
```

If both request return a 200er status code, the upload process is complete.
