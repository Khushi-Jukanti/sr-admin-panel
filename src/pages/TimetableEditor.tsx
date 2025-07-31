import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2,
  Calendar,
  Clock,
  User,
  BookOpen
} from 'lucide-react';
import { 
  sampleTimetable, 
  TimetableEntry, 
  timeSlots, 
  classSections, 
  subjects, 
  days 
} from '@/data/timetableData';
import { sampleUsers } from '@/data/sampleUsers';
import { useToast } from '@/hooks/use-toast';

const TimetableEditor = () => {
  const [timetable, setTimetable] = useState<TimetableEntry[]>(sampleTimetable);
  const [selectedClass, setSelectedClass] = useState('CSE-1A');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
  const { toast } = useToast();

  const [newEntry, setNewEntry] = useState({
    classSection: '',
    day: '',
    timeSlotId: '',
    subject: '',
    teacher: '',
    topic: '',
    room: ''
  });

  const teachers = sampleUsers.filter(user => user.role === 'teacher');

  // Filter timetable by selected class
  const classTimetable = timetable.filter(entry => entry.classSection === selectedClass);

  // Create a grid structure for the timetable
  const timetableGrid = days.map(day => ({
    day,
    slots: timeSlots.map(slot => {
      const entry = classTimetable.find(e => e.day === day && e.timeSlot.id === slot.id);
      return { slot, entry };
    })
  }));

  const handleAddEntry = () => {
    if (!newEntry.classSection || !newEntry.day || !newEntry.timeSlotId || !newEntry.subject || !newEntry.teacher) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const timeSlot = timeSlots.find(slot => slot.id === newEntry.timeSlotId);
    if (!timeSlot) return;

    const entry: TimetableEntry = {
      id: Date.now().toString(),
      classSection: newEntry.classSection,
      day: newEntry.day,
      timeSlot,
      subject: newEntry.subject,
      teacher: newEntry.teacher,
      topic: newEntry.topic,
      room: newEntry.room
    };

    setTimetable(prev => [...prev, entry]);
    resetForm();
    setIsAddDialogOpen(false);

    toast({
      title: "Class Added",
      description: `${entry.subject} has been scheduled successfully`,
    });
  };

  const handleEditEntry = (entry: TimetableEntry) => {
    setEditingEntry(entry);
    setNewEntry({
      classSection: entry.classSection,
      day: entry.day,
      timeSlotId: entry.timeSlot.id,
      subject: entry.subject,
      teacher: entry.teacher,
      topic: entry.topic || '',
      room: entry.room || ''
    });
  };

  const handleUpdateEntry = () => {
    if (!editingEntry) return;

    const timeSlot = timeSlots.find(slot => slot.id === newEntry.timeSlotId);
    if (!timeSlot) return;

    setTimetable(prev => prev.map(entry => 
      entry.id === editingEntry.id 
        ? { 
            ...entry, 
            classSection: newEntry.classSection,
            day: newEntry.day,
            timeSlot,
            subject: newEntry.subject,
            teacher: newEntry.teacher,
            topic: newEntry.topic,
            room: newEntry.room
          }
        : entry
    ));

    setEditingEntry(null);
    resetForm();

    toast({
      title: "Class Updated",
      description: "Timetable entry has been updated successfully",
    });
  };

  const handleDeleteEntry = (entryId: string) => {
    setTimetable(prev => prev.filter(entry => entry.id !== entryId));
    toast({
      title: "Class Deleted",
      description: "Timetable entry has been removed",
    });
  };

  const resetForm = () => {
    setNewEntry({
      classSection: '',
      day: '',
      timeSlotId: '',
      subject: '',
      teacher: '',
      topic: '',
      room: ''
    });
  };

  const EntryForm = () => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="class" className="text-right">Class *</Label>
        <Select value={newEntry.classSection} onValueChange={(value) => setNewEntry(prev => ({ ...prev, classSection: value }))}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            {classSections.map(cls => (
              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="day" className="text-right">Day *</Label>
        <Select value={newEntry.day} onValueChange={(value) => setNewEntry(prev => ({ ...prev, day: value }))}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
            {days.map(day => (
              <SelectItem key={day} value={day}>{day}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="timeSlot" className="text-right">Time Slot *</Label>
        <Select value={newEntry.timeSlotId} onValueChange={(value) => setNewEntry(prev => ({ ...prev, timeSlotId: value }))}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select time slot" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map(slot => (
              <SelectItem key={slot.id} value={slot.id}>
                Period {slot.periodNumber} ({slot.startTime} - {slot.endTime})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="subject" className="text-right">Subject *</Label>
        <Select value={newEntry.subject} onValueChange={(value) => setNewEntry(prev => ({ ...prev, subject: value }))}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="teacher" className="text-right">Teacher *</Label>
        <Select value={newEntry.teacher} onValueChange={(value) => setNewEntry(prev => ({ ...prev, teacher: value }))}>
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
        <Label htmlFor="topic" className="text-right">Topic</Label>
        <Input
          id="topic"
          value={newEntry.topic}
          onChange={(e) => setNewEntry(prev => ({ ...prev, topic: e.target.value }))}
          className="col-span-3"
          placeholder="Enter topic (optional)"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="room" className="text-right">Room</Label>
        <Input
          id="room"
          value={newEntry.room}
          onChange={(e) => setNewEntry(prev => ({ ...prev, room: e.target.value }))}
          className="col-span-3"
          placeholder="Enter room number (optional)"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Timetable Manager</h1>
          <p className="text-muted-foreground">Create and manage class schedules</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>
                Schedule a new class in the timetable
              </DialogDescription>
            </DialogHeader>
            <EntryForm />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm(); }}>
                Cancel
              </Button>
              <Button onClick={handleAddEntry}>Add Class</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={selectedClass} onValueChange={setSelectedClass}>
        <div className="flex justify-between items-center">
          <TabsList className="grid w-fit grid-cols-4 gap-1">
            {classSections.slice(0, 4).map(cls => (
              <TabsTrigger key={cls} value={cls}>{cls}</TabsTrigger>
            ))}
          </TabsList>
          
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {classSections.map(cls => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {classSections.map(cls => (
          <TabsContent key={cls} value={cls}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Timetable for {cls}
                </CardTitle>
                <CardDescription>
                  {classTimetable.length} classes scheduled for this section
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-24">Time</TableHead>
                        {days.map(day => (
                          <TableHead key={day} className="min-w-32 text-center">{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.map(slot => (
                        <TableRow key={slot.id}>
                          <TableCell className="font-medium">
                            <div className="text-sm">
                              <div>Period {slot.periodNumber}</div>
                              <div className="text-xs text-muted-foreground">
                                {slot.startTime} - {slot.endTime}
                              </div>
                            </div>
                          </TableCell>
                          {days.map(day => {
                            const entry = classTimetable.find(e => e.day === day && e.timeSlot.id === slot.id);
                            return (
                              <TableCell key={`${day}-${slot.id}`} className="p-2">
                                {entry ? (
                                  <div className="bg-primary/10 border border-primary/20 rounded p-2 text-xs">
                                    <div className="font-medium text-primary">{entry.subject}</div>
                                    <div className="flex items-center text-muted-foreground mt-1">
                                      <User className="w-3 h-3 mr-1" />
                                      {entry.teacher}
                                    </div>
                                    {entry.topic && (
                                      <div className="flex items-center text-muted-foreground">
                                        <BookOpen className="w-3 h-3 mr-1" />
                                        {entry.topic}
                                      </div>
                                    )}
                                    {entry.room && (
                                      <div className="text-muted-foreground">
                                        📍 {entry.room}
                                      </div>
                                    )}
                                    <div className="flex gap-1 mt-2">
                                      <Dialog open={editingEntry?.id === entry.id} onOpenChange={(open) => !open && setEditingEntry(null)}>
                                        <DialogTrigger asChild>
                                          <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="h-6 px-2"
                                            onClick={() => handleEditEntry(entry)}
                                          >
                                            <Edit className="w-3 h-3" />
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Edit Class</DialogTitle>
                                            <DialogDescription>
                                              Update class information
                                            </DialogDescription>
                                          </DialogHeader>
                                          <EntryForm />
                                          <div className="flex justify-end gap-2">
                                            <Button variant="outline" onClick={() => { setEditingEntry(null); resetForm(); }}>
                                              Cancel
                                            </Button>
                                            <Button onClick={handleUpdateEntry}>Update Class</Button>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                      
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="h-6 px-2 text-destructive hover:text-destructive"
                                        onClick={() => handleDeleteEntry(entry.id)}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-20 border-2 border-dashed border-muted rounded flex items-center justify-center text-muted-foreground text-xs">
                                    Free Period
                                  </div>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TimetableEditor;