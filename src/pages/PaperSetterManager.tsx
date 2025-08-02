import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2,
  Calendar,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { 
  paperSetterData, 
  PaperSetterAssignment, 
  testSubjects, 
  campuses 
} from '@/data/paperSetterData';
import { sampleUsers } from '@/data/sampleUsers';
import { useToast } from '@/hooks/use-toast';

const PaperSetterManager = () => {
  const [assignments, setAssignments] = useState<PaperSetterAssignment[]>(paperSetterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [campusFilter, setCampusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<PaperSetterAssignment | null>(null);
  const { toast } = useToast();

  const [newAssignment, setNewAssignment] = useState({
    testId: '',
    date: '',
    campus: '',
    subject: '',
    teacherName: '',
    teacherEmail: '',
    contact: '',
    submissionStatus: 'pending' as PaperSetterAssignment['submissionStatus'],
    assignedDate: '',
    dueDate: '',
    notes: ''
  });

  const teachers = sampleUsers.filter(user => user.role === 'teacher');

  // Filter assignments
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.testId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.submissionStatus === statusFilter;
    const matchesCampus = campusFilter === 'all' || assignment.campus === campusFilter;
    return matchesSearch && matchesStatus && matchesCampus;
  });

  const handleAddAssignment = () => {
    if (!newAssignment.testId || !newAssignment.date || !newAssignment.subject || !newAssignment.teacherName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const assignment: PaperSetterAssignment = {
      id: Date.now().toString(),
      ...newAssignment
    };

    setAssignments(prev => [...prev, assignment]);
    resetForm();
    setIsAddDialogOpen(false);

    toast({
      title: "Assignment Created",
      description: `Paper setter assignment for ${assignment.subject} has been created`,
    });
  };

  const handleEditAssignment = (assignment: PaperSetterAssignment) => {
    setEditingAssignment(assignment);
    setNewAssignment({
      testId: assignment.testId,
      date: assignment.date,
      campus: assignment.campus,
      subject: assignment.subject,
      teacherName: assignment.teacherName,
      teacherEmail: assignment.teacherEmail,
      contact: assignment.contact,
      submissionStatus: assignment.submissionStatus,
      assignedDate: assignment.assignedDate,
      dueDate: assignment.dueDate,
      notes: assignment.notes || ''
    });
  };

  const handleUpdateAssignment = () => {
    if (!editingAssignment) return;

    setAssignments(prev => prev.map(assignment => 
      assignment.id === editingAssignment.id 
        ? { ...assignment, ...newAssignment }
        : assignment
    ));

    setEditingAssignment(null);
    resetForm();

    toast({
      title: "Assignment Updated",
      description: "Paper setter assignment has been updated successfully",
    });
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
    toast({
      title: "Assignment Deleted",
      description: "Paper setter assignment has been removed",
    });
  };

  const handleStatusChange = (assignmentId: string, newStatus: PaperSetterAssignment['submissionStatus']) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, submissionStatus: newStatus }
        : assignment
    ));

    toast({
      title: "Status Updated",
      description: `Assignment status changed to ${newStatus}`,
    });
  };

  const resetForm = () => {
    setNewAssignment({
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
  };

  const getStatusIcon = (status: PaperSetterAssignment['submissionStatus']) => {
    switch (status) {
      case 'submitted': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: PaperSetterAssignment['submissionStatus']) => {
    switch (status) {
      case 'submitted': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'overdue': return 'bg-destructive/10 text-destructive border-destructive/20';
    }
  };

  const AssignmentForm = () => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="testId" className="text-right">Test ID *</Label>
        <Input
          id="testId"
          value={newAssignment.testId}
          onChange={(e) => setNewAssignment(prev => ({ ...prev, testId: e.target.value }))}
          className="col-span-3"
          placeholder="e.g., WT001"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">Test Date *</Label>
        <Input
          id="date"
          type="date"
          value={newAssignment.date}
          onChange={(e) => setNewAssignment(prev => ({ ...prev, date: e.target.value }))}
          className="col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="campus" className="text-right">Campus *</Label>
        <Select value={newAssignment.campus} onValueChange={(value) => setNewAssignment(prev => ({ ...prev, campus: value }))}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select campus" />
          </SelectTrigger>
          <SelectContent>
            {campuses.map(campus => (
              <SelectItem key={campus} value={campus}>{campus}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="subject" className="text-right">Subject *</Label>
        <Select value={newAssignment.subject} onValueChange={(value) => setNewAssignment(prev => ({ ...prev, subject: value }))}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {testSubjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="teacher" className="text-right">Teacher *</Label>
        <Select 
          value={newAssignment.teacherName} 
          onValueChange={(value) => {
            const selectedTeacher = teachers.find(t => t.name === value);
            setNewAssignment(prev => ({ 
              ...prev, 
              teacherName: value,
              teacherEmail: selectedTeacher?.email || '',
              contact: selectedTeacher?.contact || ''
            }));
          }}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select teacher" />
          </SelectTrigger>
          <SelectContent>
            {teachers.map(teacher => (
              <SelectItem key={teacher.id} value={teacher.name}>{teacher.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="assignedDate" className="text-right">Assigned Date</Label>
        <Input
          id="assignedDate"
          type="date"
          value={newAssignment.assignedDate}
          onChange={(e) => setNewAssignment(prev => ({ ...prev, assignedDate: e.target.value }))}
          className="col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="dueDate" className="text-right">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={newAssignment.dueDate}
          onChange={(e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
          className="col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">Status</Label>
        <Select value={newAssignment.submissionStatus} onValueChange={(value) => setNewAssignment(prev => ({ ...prev, submissionStatus: value as PaperSetterAssignment['submissionStatus'] }))}>
          <SelectTrigger className="col-span-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="notes" className="text-right">Notes</Label>
        <Textarea
          id="notes"
          value={newAssignment.notes}
          onChange={(e) => setNewAssignment(prev => ({ ...prev, notes: e.target.value }))}
          className="col-span-3"
          placeholder="Additional notes..."
          rows={3}
        />
      </div>
    </div>
  );

  // Statistics
  const stats = {
    total: assignments.length,
    submitted: assignments.filter(a => a.submissionStatus === 'submitted').length,
    pending: assignments.filter(a => a.submissionStatus === 'pending').length,
    overdue: assignments.filter(a => a.submissionStatus === 'overdue').length
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Paper Setter Manager</h1>
          <p className="text-muted-foreground text-sm md:text-base">Manage weekend test paper assignments</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Paper Setter Assignment</DialogTitle>
              <DialogDescription>
                Assign a teacher to create a test paper
              </DialogDescription>
            </DialogHeader>
            <AssignmentForm />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm(); }}>
                Cancel
              </Button>
              <Button onClick={handleAddAssignment}>Create Assignment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.submitted}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pending}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.overdue}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paper Setter Assignments</CardTitle>
          <CardDescription>
            {filteredAssignments.length} of {assignments.length} assignments displayed
          </CardDescription>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by test ID, subject, or teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={campusFilter} onValueChange={setCampusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
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
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Info</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{assignment.testId}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(assignment.date).toLocaleDateString()}
                      </div>
                      <p className="text-xs text-muted-foreground">{assignment.campus}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{assignment.subject}</p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{assignment.teacherName}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Mail className="w-3 h-3 mr-1" />
                        {assignment.teacherEmail}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Phone className="w-3 h-3 mr-1" />
                        {assignment.contact}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>Assigned: {new Date(assignment.assignedDate).toLocaleDateString()}</p>
                      <p>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={assignment.submissionStatus} 
                      onValueChange={(value) => handleStatusChange(assignment.id, value as PaperSetterAssignment['submissionStatus'])}
                    >
                      <SelectTrigger className={`w-32 border ${getStatusColor(assignment.submissionStatus)}`}>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(assignment.submissionStatus)}
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={editingAssignment?.id === assignment.id} onOpenChange={(open) => !open && setEditingAssignment(null)}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditAssignment(assignment)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Assignment</DialogTitle>
                            <DialogDescription>
                              Update paper setter assignment
                            </DialogDescription>
                          </DialogHeader>
                          <AssignmentForm />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => { setEditingAssignment(null); resetForm(); }}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateAssignment}>Update Assignment</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteAssignment(assignment.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaperSetterManager;