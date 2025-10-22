export interface Job {
  id: number;
  company: string;
  position: string;
  source: string;
  salary: string;
  location: string;
  schedule: string;
  status: string;
}

export interface TableInfoProps {
  filteredJobs: Job[];
  handleEditJob: (job: Job) => void;
  setDeleteConfirm: (id: number | null) => void;
  getScheduleColor: (Job: string) => void;
  getStatusColor: (Job: string) => void;
}

export interface JobFilterProps {
  jobs: Job[];
}

export interface ModalDeleteProps {
  setDeleteConfirm: (jobId: number | null) => void;
  handleDeleteJob: (id: number) => void;
  deleteConfirm: number | null;
}
