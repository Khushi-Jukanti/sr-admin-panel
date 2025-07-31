export interface User {
  id: string;
  name: string;
  role: 'superadmin' | 'principal' | 'teacher' | 'student';
  email: string;
  school: string;
  campus: string;
  contact?: string;
  status: 'active' | 'inactive';
}

export const sampleUsers: User[] = [
  // Super Admin
  {
    id: '1',
    name: 'Admin User',
    role: 'superadmin',
    email: 'admin@srinstitutes.edu.in',
    school: 'SR Engineering College',
    campus: 'Main Campus',
    contact: '+91 9876543210',
    status: 'active'
  },
  
  // Principals
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    role: 'principal',
    email: 'principal@srinstitutes.edu.in',
    school: 'SR Engineering College',
    campus: 'Main Campus',
    contact: '+91 9876543211',
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Priya Sharma',
    role: 'principal',
    email: 'priya.sharma@srinstitutes.edu.in',
    school: 'SR Pharmacy College',
    campus: 'Anantapur',
    contact: '+91 9876543212',
    status: 'active'
  },
  
  // Teachers
  {
    id: '4',
    name: 'Prof. Suresh Reddy',
    role: 'teacher',
    email: 'suresh.reddy@srinstitutes.edu.in',
    school: 'SR Engineering College',
    campus: 'Main Campus',
    contact: '+91 9876543213',
    status: 'active'
  },
  {
    id: '5',
    name: 'Dr. Lakshmi Devi',
    role: 'teacher',
    email: 'lakshmi.devi@srinstitutes.edu.in',
    school: 'SR Engineering College',
    campus: 'Main Campus',
    contact: '+91 9876543214',
    status: 'active'
  },
  {
    id: '6',
    name: 'Prof. Manjunath',
    role: 'teacher',
    email: 'manjunath@srinstitutes.edu.in',
    school: 'SR Pharmacy College',
    campus: 'Anantapur',
    contact: '+91 9876543215',
    status: 'active'
  },
  
  // Students
  {
    id: '7',
    name: 'Arjun Patel',
    role: 'student',
    email: 'arjun.patel@student.srinstitutes.edu.in',
    school: 'SR Engineering College',
    campus: 'Main Campus',
    status: 'active'
  },
  {
    id: '8',
    name: 'Sneha Gupta',
    role: 'student',
    email: 'sneha.gupta@student.srinstitutes.edu.in',
    school: 'SR Engineering College',
    campus: 'Main Campus',
    status: 'active'
  },
  {
    id: '9',
    name: 'Rahul Singh',
    role: 'student',
    email: 'rahul.singh@student.srinstitutes.edu.in',
    school: 'SR Pharmacy College',
    campus: 'Anantapur',
    status: 'active'
  }
];

export const defaultCredentials = {
  superadmin: { username: 'admin', password: 'admin123' },
  principal: { username: 'principal', password: 'principal123' },
  teacher: { username: 'teacher', password: 'teacher123' },
  student: { username: 'student', password: 'student123' }
};