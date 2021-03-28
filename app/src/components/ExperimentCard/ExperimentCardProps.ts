export interface ExperimentCardProps {
  experimentName: string;
  algorithmName: string;
  description?: string;
  numberOfRecords?: number;
  experimentId: number;
  timeToConfigure?: number;
  deleteExperiment(): void;
  editExperiment(): void;
}
