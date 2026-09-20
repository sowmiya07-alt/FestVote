import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Mail, MessageCircle, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-brand-500" />
              <span className="text-xl font-bold text-white">FestVote</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Celebrate talent, support your favorites, and make your voice count in the Cultural Fest Awards.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-brand-400 transition-colors"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 hover:text-brand-400 transition-colors"><Mail className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 hover:text-brand-400 transition-colors"><Phone className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/awards" className="text-slate-400 hover:text-white transition-colors text-sm">Explore Awards</Link></li>
              <li><Link to="/results" className="text-slate-400 hover:text-white transition-colors text-sm">Live Results</Link></li>
              <li><Link to="/login" className="text-slate-400 hover:text-white transition-colors text-sm">Student Login</Link></li>
              <li><Link to="/admin" className="text-slate-400 hover:text-white transition-colors text-sm">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Voting Guidelines</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-slate-400 text-sm">support@festvote.edu</li>
              <li className="text-slate-400 text-sm">+1 (555) 123-4567</li>
              <li className="text-slate-400 text-sm mt-4">
                Student Activities Center<br />
                University Campus
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} FestVote. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Cultural Fest 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
