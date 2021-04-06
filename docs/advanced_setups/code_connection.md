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
writer.writerow(['p1', 'p2', 'prediction'])

for row in results:
    # Write each row, prediction is either 0 (no duplicate) or 1 (duplicate)
    writer.writerow([row['id1'], row['id2'], row['label']])

# CSV string to upload to Snowman
csvString = output.getvalue()
print(csvString)
```

With this code, we are able to convert the previously labeled data into the csv format
the API is able to understand - in this case, the [`pilot`](/basic_usage/experiments) format.

It remains now to upload the csv data.

## Upload results

As outlined above, this procedure consists of two steps.

First, create a new experiment. You will need the `datasetId` and `algorithmId` you want the experiment to be assigned to.  
```python
import requests

newExpPayload = {'datasetId': 5, 'algorithmId': 2, 'name':'myexample-run01','description':'automatic-upload'}
resultCreate = requests.post('http://localhost:8123/api/v1/experiments', json=newExpPayload)
print(resultCreate.text)
newExpId = resultCreate.text
```
This will return the new experiment's id which you will need in the next step.

Secondly, upload the data we already exported to csv:
```python
import requests

resultUpload = requests.put('http://localhost:8123/api/v1/experiments/' + newExpId + '/file?format=pilot', data=csvString, headers={'Content-Type': 'text/csv'})
print(resultUpload.status_code)
```
If this second request runs fine, the upload process is complete.

As you saw, it is quite is to upload a new experiment. You do not need any manual steps if
`datasetId` and `algorithmId` are already known and hard-coded :)
