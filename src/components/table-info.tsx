import { Edit2, Trash2 } from "lucide-react";
import type { Job, TableInfoProps } from "../lib/utils";

const TableInfo = ({
  filteredJobs,
  handleEditJob,
  setDeleteConfirm,
  getScheduleColor,
  getStatusColor,
}: TableInfoProps) => {
  return (
    <table className='w-full'>
      <thead>
        <tr className='bg-gray-50 border-b-2 border-gray-200'>
          {[
            "Company",
            "Position",
            "Source",
            "Salary",
            "Location",
            "Schedule",
            "Status",
            "Actions",
          ].map((header) => (
            <th
              key={header}
              className='text-left py-4 px-6 font-semibold text-gray-700'
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredJobs.map((job: Job) => (
          <tr key={job.id} className='border-b hover:bg-blue-50 transition'>
            <td className='py-4 px-6 font-semibold text-gray-900'>
              {job.company}
            </td>
            <td className='py-4 px-6 text-gray-800'>{job.position}</td>
            <td className='py-4 px-6 text-gray-800'>{job.source}</td>
            <td className='py-4 px-6 text-green-600 font-semibold'>
              {job.salary}
            </td>
            <td className='py-4 px-6 text-gray-800'>{job.location}</td>
            <td className='py-4 px-6'>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getScheduleColor(
                  job.schedule,
                )}`}
              >
                {job.schedule}
              </span>
            </td>
            <td className='py-4 px-6'>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  job.status,
                )}`}
              >
                {job.status}
              </span>
            </td>
            <td className='py-4 px-6 text-center'>
              <div className='flex justify-center gap-3'>
                <button
                  onClick={() => handleEditJob(job)}
                  className='p-2 text-blue-600 hover:bg-blue-100 rounded-lg'
                  title='Edit'
                >
                  <Edit2 className='w-4 h-4' />
                </button>
                <button
                  onClick={() => setDeleteConfirm(job.id)}
                  className='p-2 text-red-600 hover:bg-red-100 rounded-lg'
                  title='Delete'
                >
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableInfo;
