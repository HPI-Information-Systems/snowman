import { JSONFileResponse } from '../../../../server/types';
import { compareArrays } from '../../../../tools/comparators';

/**
 * Sorts file responses which
 * !have exactly one column called "id"
 */
export function sortTestFileResponse(file: JSONFileResponse): JSONFileResponse {
  const groups: number[][] = [];
  let nextGroup: number[] = [];
  for (const row of file.data) {
    if (row.length === 0) {
      groups.push(nextGroup.sort());
      nextGroup = [];
    } else {
      nextGroup.push(parseInt(row[0]));
    }
  }
  return {
    header: file.header,
    data: groups
      .sort(compareArrays)
      .map((group) => group.map((id) => id.toString())),
  };
}
