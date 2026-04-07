import React from 'react';
import { FileText, Download, FlaskConical, Stethoscope } from 'lucide-react';
import { mockRecords } from '../mockData';

export function RecordsView() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'lab_result': return <FlaskConical size={20} className="text-purple-500" />;
      case 'prescription': return <FileText size={20} className="text-blue-500" />;
      case 'visit_note': return <Stethoscope size={20} className="text-teal-500" />;
      default: return <FileText size={20} className="text-slate-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'lab_result': return 'bg-purple-50';
      case 'prescription': return 'bg-blue-50';
      case 'visit_note': return 'bg-teal-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Digital Health Records</h1>
        <p className="text-slate-500 mt-1">Access your medical history across all Unified Health network hospitals.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Document</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Provider</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Facility</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getBgColor(record.type)}`}>
                        {getIcon(record.type)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{record.title}</p>
                        <p className="text-xs text-slate-500 capitalize">{record.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">{record.doctorName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.hospital}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Download size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
