import React, { useState } from 'react';
import { Search, Star, MapPin, Video, Calendar as CalendarIcon } from 'lucide-react';
import { mockDoctors } from '../mockData';

export function DoctorsView() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Find a Doctor</h1>
          <p className="text-slate-500 mt-1">Book an in-person or telemedicine appointment.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search doctors, specialties, hospitals..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-20 h-20 rounded-full object-cover border border-slate-100"
              />
              <div>
                <h3 className="font-bold text-lg text-slate-900">{doctor.name}</h3>
                <p className="text-blue-600 font-medium text-sm">{doctor.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="text-amber-400 fill-amber-400" size={14} />
                  <span className="text-sm font-medium text-slate-700">{doctor.rating}</span>
                  <span className="text-sm text-slate-400">({doctor.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin size={16} className="text-slate-400" />
                <span>{doctor.hospital}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CalendarIcon size={16} className="text-slate-400" />
                <span>Next available: <span className="font-medium text-slate-900">{doctor.nextAvailable}</span></span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-xl font-medium transition-colors text-sm">
                <Video size={16} />
                Video Consult
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition-colors text-sm">
                Book Visit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
