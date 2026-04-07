import React from 'react';
import { Calendar, Clock, Video, MapPin, Activity, Heart, Droplets } from 'lucide-react';
import { mockAppointments } from '../mockData';

export function DashboardView() {
  const nextAppointment = mockAppointments[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Good morning, Alex</h1>
        <p className="text-slate-500 mt-1">Here is your health overview for today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Appointment Card */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Next Appointment</h2>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
              Upcoming
            </span>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden shrink-0">
              <img src="https://picsum.photos/seed/dr2/200/200" alt="Doctor" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900">{nextAppointment.doctorName}</h3>
              <p className="text-slate-500">{nextAppointment.specialty}</p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar size={18} className="text-blue-600" />
                  <span>{nextAppointment.date}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock size={18} className="text-blue-600" />
                  <span>{nextAppointment.time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 col-span-2">
                  {nextAppointment.type === 'video' ? (
                    <Video size={18} className="text-blue-600" />
                  ) : (
                    <MapPin size={18} className="text-blue-600" />
                  )}
                  <span>{nextAppointment.hospital} • {nextAppointment.type === 'video' ? 'Video Consult' : 'In-person'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition-colors">
              Reschedule
            </button>
            <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-medium transition-colors">
              Cancel
            </button>
          </div>
        </div>

        {/* Vitals Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <Heart size={24} className="text-red-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Heart Rate</p>
              <p className="text-2xl font-bold text-slate-900">72 <span className="text-sm font-normal text-slate-500">bpm</span></p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Activity size={24} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Blood Pressure</p>
              <p className="text-2xl font-bold text-slate-900">120/80 <span className="text-sm font-normal text-slate-500">mmHg</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
              <Droplets size={24} className="text-teal-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Blood Sugar</p>
              <p className="text-2xl font-bold text-slate-900">95 <span className="text-sm font-normal text-slate-500">mg/dL</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
