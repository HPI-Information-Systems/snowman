export interface ExperimentCardProps {
  experimentName: string;
  algorithmName: string;
  description?: string;
  numberOfRecords?: number;
  timeToConfigure?: number;
  deleteExperiment(): void;
  editExperiment(): void;
  previewExperiment(): void;
}
