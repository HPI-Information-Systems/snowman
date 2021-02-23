# Datasets

Each workflow occurs upon a single dataset. As a first step, you'll have to specify a dataset.

![Screenshot1](../assets/datasets-overview.png "Dataset selector")

## Add a dataset

1. Open page "Datasets" from the sidebar on the left.
   
2. Add a new dataset with the "+" button in the lower left corner of the screen.
   
3. Specify a short identifying name and a comprehensive description.
   
4. If you do not want to upload the complete dataset, select "Skeleton only" as contents and specify the total amount of tuples by
hand. This is important to be able to still calculate metrics.

5. If you want to upload the dataset, select "Full upload" as contents, specify the csv parameters and select a file to upload.

6. Click on "Add dataset" - this process may take several minutes to complete as indexes have to be created!

### Upload failed

Since creating the dataset and uploading its contents are two separate steps, you may receive an error message stating
that the file upload failed. In this case, the dataset itself was created (most likely) empty with no records.
In this case, simply delete the dataset and start over again.

Future versions will allow you to further differentiate and change the records later on.