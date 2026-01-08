import { useState } from 'react';
import { Play, CheckCircle, Clock, Loader2, Eye, Tag } from 'lucide-react';
import JobDetailModal from './JobDetailModal';

function JobTable({ jobs, onRefresh, filters, setFilters }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRun = async (id) => {
    try {
      // 1. Triggering run API
      await fetch(`https://dotix-task-nxtwave-backend.onrender.com/${id}`, { method: 'POST' });
      
      onRefresh(); 
      
      setTimeout(() => {
        onRefresh();
      }, 3500);
      
    } catch (error) {
      console.error("Error running job:", error);
      alert("Failed to start job");
    }
  };

  const handleView = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': 
        return (
          <span className="flex items-center w-fit text-green-700 bg-green-100 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200">
            <CheckCircle size={14} className="mr-1.5" /> Completed
          </span>
        );
      case 'running': 
        return (
          <span className="flex items-center w-fit text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full text-xs font-bold border border-blue-200">
            <Loader2 size={14} className="mr-1.5 animate-spin" /> Running
          </span>
        );
      default: 
        return (
          <span className="flex items-center w-fit text-yellow-700 bg-yellow-100 px-2.5 py-1 rounded-full text-xs font-bold border border-yellow-200">
            <Clock size={14} className="mr-1.5" /> Pending
          </span>
        );
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600';
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800">Job Dashboard</h2>
          
          <div className="flex space-x-3 w-full sm:w-auto">
            
            <select 
              className="border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
            </select>

            <select 
              className="border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto"
              value={filters.priority}
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* --- Table Section --- */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Task Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400 italic">
                      No jobs found. Create one to get started.
                    </td>
                  </tr>
              ) : jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    #{job.id}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                    {job.taskName}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
                      <Tag size={12} className="mr-1" /> {job.priority}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(job.status)}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      
                      <button 
                        onClick={() => handleView(job)}
                        className="text-gray-500 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 p-2 rounded-md transition-all"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>

                      {job.status === 'pending' ? (
                        <button 
                          onClick={() => handleRun(job.id)}
                          className="text-white bg-indigo-600 hover:bg-indigo-700 p-2 rounded-md shadow-sm transition-all flex items-center gap-1"
                          title="Run Job"
                        >
                          <Play size={16} /> <span className="text-xs font-bold hidden sm:inline">Run</span>
                        </button>
                      ) : (
                        <div className="w-15"></div> 
                      )}
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Modal --- */}
      <JobDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        job={selectedJob} 
      />
    </>
  );
}

export default JobTable;