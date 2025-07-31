import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Textarea } from '../components/ui/textarea';
import { paperSetterData, testSubjects, campuses } from '../data/paperSetterData.js';
import { teachers } from '../data/timetableData.js';
import { useToast } from '../hooks/use-toast';
import { Plus, Search, Pencil, Trash2, Calendar, Clock, AlertTriangle } from 'lucide-react';

const PaperSetterManager = () => {
  const [assignments, setAssignments] = useState(paperSetterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCampus, setFilterCampus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    testId: '',
    date: '',
    campus: '',
    subject: '',
    teacherName: '',
    teacherEmail: '',
    contact: '',
    submissionStatus: 'pending',
    assignedDate: '',
    dueDate: '',
    notes: ''
  });

  const resetForm = () => {
    setFormData({
      testId: '',
      date: '',
      campus: '',
      subject: '',
      teacherName: '',
      teacherEmail: '',
      contact: '',
      submissionStatus: 'pending',
      assignedDate: '',
      dueDate: '',
      notes: ''
    });
    setEditingAssignment(null);
  };

  const handleAddAssignment = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditAssignment = (assignment) => {
    setFormData(assignment);
    setEditingAssignment(assignment);
    setIsDialogOpen(true);
  };

  const handleDeleteAssignment = (assignmentId) => {
    setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
    toast({
      title: "Assignment Deleted",
      description: "Paper setter assignment has been successfully deleted.",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAssignment) {
      // Update existing assignment
      setAssignments(assignments.map(assignment => 
        assignment.id === editingAssignment.id 
          ? { ...formData, id: editingAssignment.id }
          : assignment
      ));
      toast({
        title: "Assignment Updated",
        description: "Paper setter assignment has been successfully updated.",
      });
    } else {
      // Add new assignment
      const newAssignment = {
        ...formData,
        id: Date.now().toString()
      };
      setAssignments([...assignments, newAssignment]);
      toast({
        title: "Assignment Created",
        description: "New paper setter assignment has been successfully created.",
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleStatusChange = (assignmentId, newStatus) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, submissionStatus: newStatus }
        : assignment
    ));
    toast({
      title: "Status Updated",
      description: `Assignment status changed to ${newStatus}.`,
    });
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.testId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || assignment.submissionStatus === filterStatus;
    const matchesCampus = filterCampus === 'all' || assignment.campus === filterCampus;
    return matchesSearch && matchesStatus && matchesCampus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-success/10 text-success border-success/20">Submitted</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return <Calendar className="w-4 h-4 text-success" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Paper Setter Manager</h1>
          <p className="text-muted-foreground">
            Manage weekend test paper assignments and submissions
          </p>
        </div>
        <Button onClick={handleAddAssignment}>
          <Plus className="w-4 h-4 mr-2" />
          New Assignment
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCampus} onValueChange={setFilterCampus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campuses</SelectItem>
                {campuses.map(campus => (
                  <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Paper Setter Assignments ({filteredAssignments.length})</CardTitle>
          <CardDescription>
            Track and manage weekend test paper assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Campus</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.testId}</TableCell>
                  <TableCell>{assignment.date}</TableCell>
                  <TableCell>{assignment.subject}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{assignment.teacherName}</div>
                      <div className="text-xs text-muted-foreground">{assignment.contact}</div>
                    </div>
                  </TableCell>
                  <TableCell>{assignment.campus}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(assignment.submissionStatus)}
                      {getStatusBadge(assignment.submissionStatus)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Select
                        value={assignment.submissionStatus}
                        onValueChange={(value) => handleStatusChange(assignment.id, value)}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="submitted">Submitted</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditAssignment(assignment)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteAssignment(assignment.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Assignment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingAssignment ? 'Edit Assignment' : 'New Paper Setter Assignment'}
            </DialogTitle>
            <DialogDescription>
              {editingAssignment ? 'Update assignment details' : 'Create a new paper setter assignment'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="testId">Test ID</Label>
                <Input
                  id="testId"
                  value={formData.testId}
                  onChange={(e) => setFormData({...formData, testId: e.target.value})}
                  placeholder="WT001"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Test Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="campus">Campus</Label>
                <Select 
                  value={formData.campus} 
                  onValueChange={(value) => setFormData({...formData, campus: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select campus" />
                  </SelectTrigger>
                  <SelectContent>
                    {campuses.map(campus => (
                      <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select 
                  value={formData.subject} 
                  onValueChange={(value) => setFormData({...formData, subject: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {testSubjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teacherName">Teacher Name</Label>
                <Select 
                  value={formData.teacherName} 
                  onValueChange={(value) => setFormData({...formData, teacherName: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map(teacher => (
                      <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  placeholder="+91 9876543210"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacherEmail">Teacher Email</Label>
              <Input
                id="teacherEmail"
                type="email"
                value={formData.teacherEmail}
                onChange={(e) => setFormData({...formData, teacherEmail: e.target.value})}
                placeholder="teacher@srinstitutes.edu.in"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignedDate">Assigned Date</Label>
                <Input
                  id="assignedDate"
                  type="date"
                  value={formData.assignedDate}
                  onChange={(e) => setFormData({...formData, assignedDate: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="submissionStatus">Status</Label>
                <Select 
                  value={formData.submissionStatus} 
                  onValueChange={(value) => setFormData({...formData, submissionStatus: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Additional notes or comments..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingAssignment ? 'Update Assignment' : 'Create Assignment'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaperSetterManager;