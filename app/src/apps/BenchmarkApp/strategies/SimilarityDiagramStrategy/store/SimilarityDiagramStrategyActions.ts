import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { SimilarityDiagramStrategyActionTypes } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/types/SimilarityDiagramStrategyActionTypes';
import { SimilarityDiagramStrategyModel } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/types/SimilarityDiagramStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { AllMetricsEnum } from 'types/AllMetricsEnum';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const updateConfig = (
  benchmarkConfig: BenchmarkAppModel
): easyPrimitiveActionReturn<SimilarityDiagramStrategyModel> =>
  easyPrimitiveAction<SimilarityDiagramStrategyModel>({
    type: SimilarityDiagramStrategyActionTypes.UPDATE_CONFIG,
    payload: benchmarkConfig,
  });

export const setCoordinates = (
  allCoordinates: DiagramCoordinates[][]
): easyPrimitiveActionReturn<SimilarityDiagramStrategyModel> =>
  easyPrimitiveAction<SimilarityDiagramStrategyModel>({
    type: SimilarityDiagramStrategyActionTypes.SET_COORDINATES,
    payload: allCoordinates,
  });

export const setYAxis = (
  aMetric: AllMetricsEnum
): easyPrimitiveActionReturn<SimilarityDiagramStrategyModel> =>
  easyPrimitiveAction<SimilarityDiagramStrategyModel>({
    type: SimilarityDiagramStrategyActionTypes.SET_Y_AXIS,
    payload: aMetric,
  });
