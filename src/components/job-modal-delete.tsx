import type { ModalDeleteProps } from "../lib/utils";

const JobModalDelete = ({
  setDeleteConfirm,
  handleDeleteJob,
  deleteConfirm,
}: ModalDeleteProps) => {
  if (!deleteConfirm) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm'>
      <div className='bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200'>
        <h3 className='text-xl font-bold text-gray-900 mb-4'>
          🗑️ Confirm Delete
        </h3>
        <p className='text-gray-700 mb-6'>
          Are you sure you want to delete this job application?{" "}
          <span className='font-semibold'>This action cannot be undone.</span>
        </p>
        <div className='flex gap-3'>
          <button
            onClick={() => setDeleteConfirm(null)}
            className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg'
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteJob(deleteConfirm)}
            className='flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobModalDelete;
