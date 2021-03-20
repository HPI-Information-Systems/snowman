export interface DatasetCardProps {
  datasetName: string;
  categories: string[];
  description?: string;
  totalCount?: number;
  uploadedCount?: number;
  isSelected?: boolean;
  selectDataset(): void;
  deleteDataset(): void;
  editDataset(): void;
}
