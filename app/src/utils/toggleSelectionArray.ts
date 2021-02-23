export const toggleSelectionArrayMultipleSelect = <T = string>(
  aSelectionArray: T[],
  toggledItem: T
): T[] =>
  aSelectionArray.includes(toggledItem)
    ? aSelectionArray.filter(
        (anArrayItem: T): boolean => anArrayItem !== toggledItem
      )
    : [...aSelectionArray, toggledItem];

export const toggleSelectionArraySingleSelect = <T = string>(
  aSelectionArray: T[],
  toggledItem: T
): T[] => (aSelectionArray.includes(toggledItem) ? [] : [toggledItem]);
