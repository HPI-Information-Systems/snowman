export const convertFilesListToFilesArray = (
  aFilesList: FileList | null
): File[] => {
  const files: File[] = [];
  if (aFilesList !== null) {
    for (let i = 0; i < aFilesList.length; i++) {
      const file = aFilesList.item(i);
      if (file !== null) {
        files.push(file);
      }
    }
  }
  return files;
};
