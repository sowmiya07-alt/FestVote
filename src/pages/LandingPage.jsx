import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Star, Users, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { mockCategories } from '../data/categories';

const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-900 to-slate-900 -z-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium">
                <Star className="w-4 h-4" />
                Cultural Fest 2026 Awards
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
                Your Vote. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
                  Their Moment.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
                Celebrate talent, support your favorites, and make your voice count in the most awaited college event of the year.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/login" className="px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white rounded-full font-semibold text-lg transition-all shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 group">
                  Start Voting
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/awards" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Explore Awards
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              {/* Abstract decorative hero visual */}
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-full animate-pulse-slow"></div>
                <div className="absolute inset-4 bg-slate-900 rounded-full border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl">
                   <Award className="w-32 h-32 text-brand-400" />
                </div>
                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 glass-panel p-4 rounded-2xl flex items-center gap-3 animate-float">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Live Voting</p>
                    <p className="text-xs text-slate-400">Now open</p>
                  </div>
                </div>
                <div className="absolute bottom-10 -right-10 glass-panel p-4 rounded-2xl flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">1000+ Voters</p>
                    <p className="text-xs text-slate-400">Joined so far</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Award Categories', value: '10+', icon: Award },
              { label: 'Nominees', value: '50+', icon: Star },
              { label: 'Student Voters', value: '1000+', icon: Users },
              { label: 'Vote Per Category', value: '1', icon: CheckCircle2 },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 glass-card rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">A simple, transparent, and secure way to support your favorite talents.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Login', desc: 'Use your Student ID to access the voting portal.' },
              { step: '2', title: 'Explore', desc: 'Browse through all the award categories.' },
              { step: '3', title: 'Choose', desc: 'View nominee profiles and select your favorite.' },
              { step: '4', title: 'Vote', desc: 'Cast your vote and wait for the results!' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="glass-panel p-8 rounded-2xl relative z-10 h-full">
                  <div className="w-10 h-10 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center mb-6 text-xl shadow-lg shadow-brand-500/30">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
                {i !== 3 && <div className="hidden md:block absolute top-12 left-1/2 w-full h-[2px] bg-gradient-to-r from-brand-500/50 to-transparent -z-10"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Awards</h2>
              <p className="text-slate-400">Discover some of our most anticipated categories.</p>
            </div>
            <Link to="/awards" className="hidden sm:flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {mockCategories.slice(0, 3).map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="glass-card p-6 rounded-2xl group cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-brand-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{cat.description}</p>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xs font-medium text-slate-500 bg-slate-800 px-3 py-1 rounded-full">{cat.nomineeCount} Nominees</span>
                    <Link to="/awards" className="text-sm font-medium text-brand-400 group-hover:text-brand-300">Explore &rarr;</Link>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-8 text-center sm:hidden">
             <Link to="/awards" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors">
              View All Categories <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-600"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to make your choice?</h2>
          <p className="text-brand-100 text-lg mb-10 max-w-2xl mx-auto">Join hundreds of other students who have already cast their votes. Support your peers and make Fest 2026 memorable.</p>
          <Link to="/login" className="inline-block px-10 py-4 bg-white text-brand-700 hover:bg-slate-100 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            Vote Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
