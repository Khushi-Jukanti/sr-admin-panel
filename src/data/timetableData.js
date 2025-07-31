export const periods = [
  '09:00-09:50',
  '10:00-10:50',
  '11:00-11:50',
  '12:00-12:50',
  '14:00-14:50',
  '15:00-15:50',
  '16:00-16:50'
];

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const classes = [
  'I Year CSE A',
  'I Year CSE B',
  'I Year ECE A',
  'I Year EEE A',
  'II Year CSE A',
  'II Year CSE B',
  'III Year CSE A',
  'IV Year CSE A'
];

export const subjects = [
  'Mathematics - I',
  'Physics - I',
  'Chemistry - I',
  'English - I',
  'Computer Programming',
  'Data Structures',
  'Database Management',
  'Operating Systems',
  'Computer Networks',
  'Software Engineering'
];

export const teachers = [
  'Dr. Lakshmi Devi',
  'Prof. Suresh Reddy',
  'Prof. Manjunath',
  'Dr. Priya Mehta',
  'Prof. Kiran Kumar',
  'Dr. Rajesh Kumar'
];

export const rooms = [
  'Room 101', 'Room 102', 'Room 103', 'Room 104', 'Room 105',
  'Lab 201', 'Lab 202', 'Lab 203',
  'Auditorium', 'Library'
];

export const sampleTimetable = {
  'I Year CSE A': {
    'Monday': {
      '09:00-09:50': { subject: 'Mathematics - I', teacher: 'Dr. Lakshmi Devi', room: 'Room 101' },
      '10:00-10:50': { subject: 'Physics - I', teacher: 'Prof. Suresh Reddy', room: 'Room 101' },
      '11:00-11:50': { subject: 'Chemistry - I', teacher: 'Prof. Manjunath', room: 'Room 101' },
      '12:00-12:50': { subject: 'English - I', teacher: 'Dr. Priya Mehta', room: 'Room 101' },
      '14:00-14:50': { subject: 'Computer Programming', teacher: 'Prof. Kiran Kumar', room: 'Lab 201' },
      '15:00-15:50': { subject: 'Computer Programming', teacher: 'Prof. Kiran Kumar', room: 'Lab 201' }
    },
    'Tuesday': {
      '09:00-09:50': { subject: 'Physics - I', teacher: 'Prof. Suresh Reddy', room: 'Room 101' },
      '10:00-10:50': { subject: 'Mathematics - I', teacher: 'Dr. Lakshmi Devi', room: 'Room 101' },
      '11:00-11:50': { subject: 'English - I', teacher: 'Dr. Priya Mehta', room: 'Room 101' },
      '12:00-12:50': { subject: 'Chemistry - I', teacher: 'Prof. Manjunath', room: 'Room 101' }
    }
  }
};