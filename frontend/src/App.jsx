import { useState, useEffect } from 'react';
import CreateJobForm from './components/CreateJobForm';
import JobTable from './components/JobTable';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '' });

  const fetchJobs = async () => {
    const params = new URLSearchParams(filters);
    // Remove empty filters
    if (!filters.status) params.delete('status');
    if (!filters.priority) params.delete('priority');

    try {
      const res = await fetch(`https://dotix-task-nxtwave-backend.onrender.com/jobs?${params}`);
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  // Re-fetch when filters change
  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Job Scheduler & Automation</h1>
        </header>

        {/* Top Section: Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
             <CreateJobForm onJobCreated={fetchJobs} />
          </div>

          <div className="lg:col-span-2">
            <JobTable 
              jobs={jobs} 
              onRefresh={fetchJobs} 
              filters={filters} 
              setFilters={setFilters} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;