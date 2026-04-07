import { Doctor, Appointment, MedicalRecord } from './types';

export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist',
    hospital: 'Central City Hospital',
    rating: 4.9,
    reviews: 128,
    image: 'https://picsum.photos/seed/dr1/200/200',
    nextAvailable: 'Today, 2:00 PM'
  },
  {
    id: 'd2',
    name: 'Dr. Michael Chen',
    specialty: 'General Practitioner',
    hospital: 'Westside Clinic',
    rating: 4.7,
    reviews: 342,
    image: 'https://picsum.photos/seed/dr2/200/200',
    nextAvailable: 'Tomorrow, 9:30 AM'
  },
  {
    id: 'd3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    hospital: "Children's Medical Center",
    rating: 4.8,
    reviews: 89,
    image: 'https://picsum.photos/seed/dr3/200/200',
    nextAvailable: 'Wed, 11:00 AM'
  },
  {
    id: 'd4',
    name: 'Dr. James Wilson',
    specialty: 'Neurologist',
    hospital: 'National Brain Institute',
    rating: 4.9,
    reviews: 215,
    image: 'https://picsum.photos/seed/dr4/200/200',
    nextAvailable: 'Thu, 1:15 PM'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    doctorId: 'd2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'General Practitioner',
    date: '2026-04-08',
    time: '09:30 AM',
    status: 'upcoming',
    type: 'in-person',
    hospital: 'Westside Clinic'
  },
  {
    id: 'a2',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist',
    date: '2026-04-15',
    time: '02:00 PM',
    status: 'upcoming',
    type: 'video',
    hospital: 'Central City Hospital'
  }
];

export const mockRecords: MedicalRecord[] = [
  {
    id: 'r1',
    date: '2026-03-10',
    title: 'Annual Blood Work',
    doctorName: 'Dr. Michael Chen',
    hospital: 'Westside Clinic',
    type: 'lab_result',
    status: 'available'
  },
  {
    id: 'r2',
    date: '2026-02-15',
    title: 'Amoxicillin 500mg',
    doctorName: 'Dr. Emily Rodriguez',
    hospital: "Children's Medical Center",
    type: 'prescription',
    status: 'available'
  },
  {
    id: 'r3',
    date: '2026-01-20',
    title: 'General Checkup Notes',
    doctorName: 'Dr. Michael Chen',
    hospital: 'Westside Clinic',
    type: 'visit_note',
    status: 'available'
  }
];
