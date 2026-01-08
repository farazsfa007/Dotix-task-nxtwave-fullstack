import { useState } from 'react';

function CreateJobForm({ onJobCreated }) {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [payload, setPayload] = useState('{"email": "user@example.com"}');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedPayload = JSON.parse(payload);
      
      await fetch('https://dotix-task-nxtwave-backend.onrender.com/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskName, priority, payload: parsedPayload }),
      });

      setTaskName('');
      onJobCreated();
    } catch (err) {
      alert('Invalid JSON in payload or Server Error',err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Task Name</label>
          <input 
            type="text" 
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={taskName} 
            onChange={(e) => setTaskName(e.target.value)} 
            placeholder="e.g., Send Report" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Payload (JSON)</label>
          <textarea 
            rows="3"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md font-mono text-sm"
            value={payload} 
            onChange={(e) => setPayload(e.target.value)}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}

export default CreateJobForm