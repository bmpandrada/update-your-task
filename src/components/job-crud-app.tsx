"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import type { Job } from "../lib/utils";
import TableInfo from "./table-info";
import JobFilter from "./job-filter";
import ModalDeleteProps from "./job-modal-delete";

const SCHEDULE_OPTIONS = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
];
const STATUS_OPTIONS = [
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
  "Accepted",
];

export default function JobCrudApp() {
  const [jobs, setJobs] = useState<Job[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("jobs");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to load jobs:", err);
      return [];
    }
  });

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    source: "",
    salary: "",
    location: "",
    schedule: "Full-time",
    status: "Applied",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("jobs", JSON.stringify(jobs));
      console.log("💾 Saved jobs:", jobs);
    } catch (err) {
      console.error("Error saving jobs:", err);
    }
  }, [jobs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Saving jobs:", jobs);
      localStorage.setItem("jobs", JSON.stringify(jobs));
    }
  }, [jobs]);

  const handleAddJob = () => {
    const { company, position, source, salary, location } = formData;
    if (!company || !position || !source || !salary || !location) return;

    if (editingId) {
      // UPDATE
      setJobs((prev) =>
        prev.map((job) =>
          job.id === editingId ? { ...job, ...formData } : job,
        ),
      );
      setEditingId(null);
    } else {
      // CREATE
      const newJob: Job = { id: Date.now(), ...formData };
      setJobs((prev) => [...prev, newJob]);
    }

    // Reset form
    setFormData({
      company: "",
      position: "",
      source: "",
      salary: "",
      location: "",
      schedule: "Full-time",
      status: "Applied",
    });
    setShowForm(false);
  };

  const handleEditJob = (job: Job) => {
    setFormData({
      company: job.company,
      position: job.position,
      source: job.source,
      salary: job.salary,
      location: job.location,
      schedule: job.schedule,
      status: job.status,
    });
    setEditingId(job.id);
    setShowForm(true);
  };

  const handleDeleteJob = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
    setDeleteConfirm(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      company: "",
      position: "",
      source: "",
      salary: "",
      location: "",
      schedule: "Full-time",
      status: "Applied",
    });
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800";
      case "Interviewing":
        return "bg-purple-100 text-purple-800";
      case "Offer":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Accepted":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getScheduleColor = (schedule: string) => {
    switch (schedule) {
      case "Full-time":
        return "bg-indigo-100 text-indigo-800";
      case "Part-time":
        return "bg-orange-100 text-orange-800";
      case "Contract":
        return "bg-cyan-100 text-cyan-800";
      case "Freelance":
        return "bg-pink-100 text-pink-800";
      case "Internship":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-8'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            💼 Job Applications
          </h1>
          <p className='text-gray-600'>
            Track and manage your job applications
          </p>
        </div>

        {/* Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {showForm && (
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-xl font-bold text-gray-900'>
                    {editingId ? "✏️ Edit Job" : "➕ Add Job"}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className='text-gray-500 hover:text-gray-700 transition'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>

                <form
                  className='space-y-4'
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddJob();
                  }}
                >
                  {[
                    {
                      label: "Company *",
                      key: "company",
                      placeholder: "e.g., Google",
                    },
                    {
                      label: "Position *",
                      key: "position",
                      placeholder: "e.g., Frontend Developer",
                    },
                    {
                      label: "Source *",
                      key: "source",
                      placeholder: "e.g., LinkedIn",
                    },
                    {
                      label: "Salary *",
                      key: "salary",
                      placeholder: "e.g., $50k - $80k",
                    },
                    {
                      label: "Location *",
                      key: "location",
                      placeholder: "e.g., San Francisco, CA",
                    },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        {label}
                      </label>
                      <input
                        type='text'
                        placeholder={placeholder}
                        value={formData[key as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    </div>
                  ))}

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Schedule
                    </label>
                    <select
                      value={formData.schedule}
                      onChange={(e) =>
                        setFormData({ ...formData, schedule: e.target.value })
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
                    >
                      {SCHEDULE_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* ✅ fixed submit button */}
                  <div className='flex gap-2 pt-4'>
                    <button
                      type='submit'
                      className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200'
                    >
                      {editingId ? "Update Job" : "Add Job"}
                    </button>
                    <button
                      type='button'
                      onClick={handleCancel}
                      className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200'
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Jobs List Section */}
          <div className={`${showForm ? "lg:col-span-3" : "lg:col-span-4"}`}>
            <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
              <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center'>
                <div>
                  <h2 className='text-2xl font-bold'>📋 Jobs List</h2>
                  <p className='text-blue-100 mt-1'>
                    {filteredJobs.length} jobs
                  </p>
                </div>
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className='flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition duration-200'
                  >
                    <Plus className='w-5 h-5' />
                    Add Job
                  </button>
                )}
              </div>

              <div className='p-6 border-b border-gray-200'>
                <input
                  type='text'
                  placeholder='Search by company, position, or location...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div className='overflow-x-auto'>
                {filteredJobs.length === 0 ? (
                  <JobFilter jobs={jobs} />
                ) : (
                  <TableInfo
                    filteredJobs={filteredJobs}
                    handleEditJob={handleEditJob}
                    setDeleteConfirm={setDeleteConfirm}
                    getScheduleColor={getScheduleColor}
                    getStatusColor={getStatusColor}
                  />
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm !== null && (
        <ModalDeleteProps
          setDeleteConfirm={setDeleteConfirm}
          handleDeleteJob={handleDeleteJob}
          deleteConfirm={deleteConfirm}
        />
      )}
    </div>
  );
}
