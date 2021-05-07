import { exists } from '../runtime';
/**
 *
 * @export
 * @interface DiagramCoordinates
 */
export interface DiagramCoordinates {
  /**
   *
   * @type {number}
   * @memberof DiagramCoordinate
   */
  x: number;
  /**
   *
   * @type {number}
   * @memberof DiagramCoordinate
   */
  y: number;
  /**
   *
   * @type {number}
   * @memberof DiagramCoordinate
   */
  experimentId?: number;
  /**
   *
   * @type {number}
   * @memberof DiagramCoordinate
   */
  threshold?: number;
}

export function DiagramCoordinatesFromJSON(json: any): DiagramCoordinates {
  return DiagramCoordinatesFromJSONTyped(json, false);
}

export function DiagramCoordinatesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): DiagramCoordinates {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    x: !exists(json, 'x') ? undefined : json['x'],
    y: !exists(json, 'y') ? undefined : json['y'],
    experimentId: !exists(json, 'experimentId')
      ? undefined
      : json['experimentId'],
    threshold: !exists(json, 'threshold') ? undefined : json['threshold'],
  };
}

export function DiagramCoordinatesToJSON(
  value?: DiagramCoordinates | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    x: value.x,
    y: value.y,
    threshold: value.threshold,
    experimentId: value.experimentId,
  };
}
