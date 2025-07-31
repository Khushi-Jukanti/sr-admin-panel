export const defaultCredentials = {
  superadmin: { username: 'admin', password: 'admin123' },
  principal: { username: 'principal', password: 'principal123' },
  teacher: { username: 'teacher', password: 'teacher123' },
  student: { username: 'student', password: 'student123' }
};

export const sampleUsers = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    role: 'principal',
    email: 'rajesh.kumar@srinstitutes.edu.in',
    school: 'SR Engineering College',
    campus: 'Main Campus',
    status: 'active'
  },
  {
    id: '2',
    name: 'Prof. Lakshmi Devi',
    role: 'teacher',
    email: 'lakshmi.devi@srinstitutes.edu.in',
    school: 'SR Engineering College',
    campus: 'Main Campus',
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Suresh Reddy',
    role: 'teacher',
    email: 'suresh.reddy@srinstitutes.edu.in',
    school: 'SR Engineering College',
    campus: 'Anantapur',
    status: 'active'
  },
  {
    id: '4',
    name: 'Arjun Sharma',
    role: 'student',
    email: 'arjun.sharma@srinstitutes.edu.in',
    school: 'SR Engineering College',
    campus: 'Main Campus',
    status: 'active'
  },
  {
    id: '5',
    name: 'Priya Mehta',
    role: 'student',
    email: 'priya.mehta@srinstitutes.edu.in',
    school: 'SR Engineering College',
    campus: 'Main Campus',
    status: 'active'
  },
  {
    id: '6',
    name: 'Prof. Manjunath',
    role: 'teacher',
    email: 'manjunath@srinstitutes.edu.in',
    school: 'SR Pharmacy College',
    campus: 'Anantapur',
    status: 'active'
  },
  {
    id: '7',
    name: 'Sneha Patel',
    role: 'student',
    email: 'sneha.patel@srinstitutes.edu.in',
    school: 'SR Pharmacy College',
    campus: 'Anantapur',
    status: 'inactive'
  },
  {
    id: '8',
    name: 'Dr. Kiran Kumar',
    role: 'principal',
    email: 'kiran.kumar@srinstitutes.edu.in',
    school: 'SR Pharmacy College',
    campus: 'Warangal',
    status: 'active'
  }
];

export const schools = [
  'SR Engineering College',
  'SR Pharmacy College',
  'SR MBA College',
  'SR Arts & Science College'
];

export const campuses = [
  'Main Campus',
  'Anantapur',
  'Warangal',
  'Hyderabad'
];