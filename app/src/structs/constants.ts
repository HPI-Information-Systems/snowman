import { GoldStandardId, SilverStandardId } from 'snowman-library';
import { ViewIDs } from 'types/ViewIDs';

export const MagicNotPossibleId = Number.MIN_SAFE_INTEGER;

export const HiddenMatchingSolutions = new Set([
  GoldStandardId,
  SilverStandardId,
]);

export const NoTabBarViewIDs = new Set([ViewIDs.DataViewerApp]);
