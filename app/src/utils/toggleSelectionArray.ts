export const toggleSelectionArrayMultipleSelect = <T = string>(
  aSelectionArray: T[],
  toggledItem: T,
  forceState?: boolean
): T[] =>
  aSelectionArray.includes(toggledItem)
    ? forceState !== true
      ? aSelectionArray.filter(
          (anArrayItem: T): boolean => anArrayItem !== toggledItem
        )
      : aSelectionArray
    : forceState !== false
    ? [...aSelectionArray, toggledItem]
    : aSelectionArray;

export const toggleSelectionArraySingleSelect = <T = string>(
  aSelectionArray: T[],
  toggledItem: T
): T[] => (aSelectionArray.includes(toggledItem) ? [] : [toggledItem]);
