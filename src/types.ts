export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviews: number;
  image: string;
  nextAvailable: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'in-person' | 'video';
  hospital: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  title: string;
  doctorName: string;
  hospital: string;
  type: 'prescription' | 'lab_result' | 'visit_note';
  status: 'available' | 'pending';
}

export type ViewState = 'dashboard' | 'appointments' | 'records' | 'telemedicine' | 'pharmacy';
