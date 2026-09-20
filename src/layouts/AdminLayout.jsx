import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Award, Users, FileBarChart, Settings, LogOut, PieChart } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Categories', icon: Award, path: '/admin/categories' },
    { name: 'Nominees', icon: Users, path: '/admin/nominees' },
    { name: 'Votes', icon: FileBarChart, path: '/admin/votes' },
    { name: 'Results', icon: PieChart, path: '/admin/results' },
    { name: 'Students', icon: Users, path: '/admin/students' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-white/5 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="bg-brand-500 p-2 rounded-lg">
             <Award className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">FestVote <span className="text-brand-400 text-sm">Admin</span></span>
        </div>
        
        <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="p-4 border-t border-white/5">
           <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Exit Admin</span>
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
