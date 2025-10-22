import type { JobFilterProps } from "../lib/utils";

const JobFilter = ({ jobs }: JobFilterProps) => {
  return (
    <div className='text-center py-16 px-6'>
      <p className='text-gray-500 text-lg font-medium'>📭 No jobs found</p>
      <p className='text-gray-400 mt-1'>
        {jobs.length === 0
          ? "Add your first job application to get started!"
          : "Try a different search term"}
      </p>
    </div>
  );
};

export default JobFilter;
