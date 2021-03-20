export interface ExperimentCardProps {
  experimentName: string;
  algorithmName: string;
  description?: string;
  numberOfRecords?: number;
  deleteExperiment(): void;
  editExperiment(): void;
}
