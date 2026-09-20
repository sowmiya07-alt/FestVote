import React from 'react';
import { Settings } from 'lucide-react';

const AdminPlaceholder = ({ title, description }) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
        <p className="text-slate-400">{description}</p>
      </div>

      <div className="glass-panel p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mb-6">
           <Settings className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Management UI</h2>
        <p className="text-slate-400 max-w-md">
          This is a placeholder for the {title} management interface. In a full implementation, you would see a data table here to add, edit, and delete records.
        </p>
      </div>
    </div>
  );
};

export default AdminPlaceholder;
