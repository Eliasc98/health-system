import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { DoctorsView } from './components/DoctorsView';
import { RecordsView } from './components/RecordsView';
import { TelemedicineView } from './components/TelemedicineView';
import { ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'appointments':
        return <DoctorsView />;
      case 'records':
        return <RecordsView />;
      case 'telemedicine':
        return <TelemedicineView onEndCall={() => setCurrentView('dashboard')} />;
      case 'pharmacy':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">💊</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Pharmacy Integration Coming Soon</h2>
            <p className="text-slate-500 max-w-md">
              Order prescriptions directly from your doctor's visit and have them delivered to your door.
            </p>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8">
        {renderView()}
      </main>
    </div>
  );
}

