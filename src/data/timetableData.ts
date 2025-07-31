export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  periodNumber: number;
}

export interface TimetableEntry {
  id: string;
  classSection: string;
  day: string;
  timeSlot: TimeSlot;
  subject: string;
  teacher: string;
  topic?: string;
  room?: string;
}

export const timeSlots: TimeSlot[] = [
  { id: '1', startTime: '09:00', endTime: '09:50', periodNumber: 1 },
  { id: '2', startTime: '09:50', endTime: '10:40', periodNumber: 2 },
  { id: '3', startTime: '11:00', endTime: '11:50', periodNumber: 3 },
  { id: '4', startTime: '11:50', endTime: '12:40', periodNumber: 4 },
  { id: '5', startTime: '13:30', endTime: '14:20', periodNumber: 5 },
  { id: '6', startTime: '14:20', endTime: '15:10', periodNumber: 6 },
  { id: '7', startTime: '15:10', endTime: '16:00', periodNumber: 7 }
];

export const sampleTimetable: TimetableEntry[] = [
  {
    id: '1',
    classSection: 'CSE-1A',
    day: 'Monday',
    timeSlot: timeSlots[0],
    subject: 'Mathematics - I',
    teacher: 'Dr. Lakshmi Devi',
    topic: 'Differential Calculus',
    room: 'Room 101'
  },
  {
    id: '2',
    classSection: 'CSE-1A',
    day: 'Monday',
    timeSlot: timeSlots[1],
    subject: 'Physics - I',
    teacher: 'Prof. Suresh Reddy',
    topic: 'Mechanics',
    room: 'Room 102'
  },
  {
    id: '3',
    classSection: 'CSE-1A',
    day: 'Tuesday',
    timeSlot: timeSlots[0],
    subject: 'Chemistry - I',
    teacher: 'Prof. Manjunath',
    topic: 'Organic Chemistry',
    room: 'Lab 201'
  }
];

export const classSections = [
  'CSE-1A', 'CSE-1B', 'CSE-2A', 'CSE-2B',
  'ECE-1A', 'ECE-1B', 'ECE-2A', 'ECE-2B',
  'MECH-1A', 'MECH-1B', 'MECH-2A', 'MECH-2B',
  'CIVIL-1A', 'CIVIL-1B', 'CIVIL-2A', 'CIVIL-2B'
];

export const subjects = [
  'Mathematics - I', 'Mathematics - II',
  'Physics - I', 'Physics - II',
  'Chemistry - I', 'Chemistry - II',
  'Programming in C', 'Data Structures',
  'Computer Organization', 'Operating Systems',
  'Database Management Systems', 'Software Engineering'
];

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];