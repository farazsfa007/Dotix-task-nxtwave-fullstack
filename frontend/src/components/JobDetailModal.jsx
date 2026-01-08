import React from 'react';
import { X, Calendar, Database, Activity, Tag } from 'lucide-react';

function JobDetailModal({ isOpen, onClose, job }) {
  if (!isOpen || !job) return null;

  const getFormattedPayload = (payloadStr) => {
    try {

      if (typeof payloadStr === 'object') {
        return JSON.stringify(payloadStr, null, 2);
      }

      const parsed = JSON.parse(payloadStr);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      return payloadStr || "No payload data",e;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Activity size={18} className="text-blue-600" />
            Job Details <span className="text-sm font-normal text-gray-500">#{job.id}</span>
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
              <span className="text-xs text-gray-500 uppercase font-semibold">Status</span>
              <p className={`font-medium capitalize ${
                job.status === 'completed' ? 'text-green-600' : 
                job.status === 'running' ? 'text-blue-600' : 'text-yellow-600'
              }`}>
                {job.status}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
              <span className="text-xs text-gray-500 uppercase font-semibold">Priority</span>
              <p className="font-medium text-gray-800 flex items-center gap-1">
                <Tag size={14} /> {job.priority}
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase font-semibold">Task Name</label>
            <p className="text-gray-800 font-medium border-b pb-1">{job.taskName}</p>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase font-semibold flex items-center gap-1 mb-1">
                <Database size={14} /> Payload Data
            </label>
            <div className="bg-slate-800 rounded-md p-3 overflow-auto max-h-48 border border-slate-700">
              <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                {getFormattedPayload(job.payload)}
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 pt-2 border-t">
            <div className="flex flex-col">
              <span className="text-xs font-semibold">Created At</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {formatDate(job.createdAt)}
              </span>
            </div>
            {job.updatedAt && (
              <div className="flex flex-col">
                <span className="text-xs font-semibold">Last Updated</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {formatDate(job.updatedAt)}
                </span>
              </div>
            )}
          </div>

        </div>

        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetailModal;