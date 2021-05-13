export const SilverStandardId = -1;
export const GoldStandardId = -2;

// !ALL COLUMNS EXPLICITLY STATED IN WRAPPER/API/DATABASE/SCHEMAS/EXPERIMENT -> EXPERIMENT
export const NonSimilarityThresholdColumns = new Set<string>([
  'id1',
  'id2',
  'isDuplicate',
  'isDuplicateAndLinksUnlinkedNodes',
]);
