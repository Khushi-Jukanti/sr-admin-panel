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
  DialogFooter
} from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { 
  periods, 
  days, 
  classes, 
  subjects, 
  teachers, 
  rooms, 
  sampleTimetable 
} from '../data/timetableData.js';
import { useToast } from '../hooks/use-toast';
import { Plus, Edit, Calendar } from 'lucide-react';

const TimetableEditor = () => {
  const [selectedClass, setSelectedClass] = useState('I Year CSE A');
  const [timetable, setTimetable] = useState(sampleTimetable);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const { toast } = useToast();

  const [slotData, setSlotData] = useState({
    subject: '',
    teacher: '',
    room: ''
  });

  const resetSlotData = () => {
    setSlotData({
      subject: '',
      teacher: '',
      room: ''
    });
    setEditingSlot(null);
  };

  const handleEditSlot = (day, period) => {
    const currentSlot = timetable[selectedClass]?.[day]?.[period];
    if (currentSlot) {
      setSlotData(currentSlot);
    } else {
      resetSlotData();
    }
    setEditingSlot({ day, period });
    setIsDialogOpen(true);
  };

  const handleSaveSlot = () => {
    if (!editingSlot) return;

    const { day, period } = editingSlot;
    
    // Initialize timetable structure if it doesn't exist
    if (!timetable[selectedClass]) {
      timetable[selectedClass] = {};
    }
    if (!timetable[selectedClass][day]) {
      timetable[selectedClass][day] = {};
    }

    // Update the timetable
    const updatedTimetable = {
      ...timetable,
      [selectedClass]: {
        ...timetable[selectedClass],
        [day]: {
          ...timetable[selectedClass][day],
          [period]: slotData.subject ? slotData : undefined
        }
      }
    };

    setTimetable(updatedTimetable);
    
    // Save to localStorage
    localStorage.setItem('timetableData', JSON.stringify(updatedTimetable));
    
    toast({
      title: "Timetable Updated",
      description: `${day} ${period} has been updated successfully.`,
    });

    setIsDialogOpen(false);
    resetSlotData();
  };

  const handleDeleteSlot = () => {
    if (!editingSlot) return;

    const { day, period } = editingSlot;
    
    const updatedTimetable = {
      ...timetable,
      [selectedClass]: {
        ...timetable[selectedClass],
        [day]: {
          ...timetable[selectedClass][day],
          [period]: undefined
        }
      }
    };

    setTimetable(updatedTimetable);
    localStorage.setItem('timetableData', JSON.stringify(updatedTimetable));
    
    toast({
      title: "Slot Cleared",
      description: `${day} ${period} has been cleared.`,
    });

    setIsDialogOpen(false);
    resetSlotData();
  };

  const getSlotData = (day, period) => {
    return timetable[selectedClass]?.[day]?.[period];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Timetable Editor</h1>
          <p className="text-muted-foreground">
            Create and manage class timetables
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map(className => (
                <SelectItem key={className} value={className}>
                  {className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Timetable Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Timetable for {selectedClass}</CardTitle>
          <CardDescription>
            Click on any time slot to add or edit class details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Period</TableHead>
                  {days.map(day => (
                    <TableHead key={day} className="text-center min-w-40">
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {periods.map(period => (
                  <TableRow key={period}>
                    <TableCell className="font-medium bg-muted/50">
                      {period}
                    </TableCell>
                    {days.map(day => {
                      const slotData = getSlotData(day, period);
                      return (
                        <TableCell 
                          key={`${day}-${period}`}
                          className="p-2 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleEditSlot(day, period)}
                        >
                          {slotData ? (
                            <div className="space-y-1 text-xs">
                              <div className="font-medium text-primary">
                                {slotData.subject}
                              </div>
                              <div className="text-muted-foreground">
                                {slotData.teacher}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {slotData.room}
                              </Badge>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-16 text-muted-foreground">
                              <Plus className="w-4 h-4" />
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

      {/* Edit Slot Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Time Slot
            </DialogTitle>
            <DialogDescription>
              {editingSlot && `${editingSlot.day} - ${editingSlot.period}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select 
                value={slotData.subject} 
                onValueChange={(value) => setSlotData({...slotData, subject: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No Subject</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Select 
                value={slotData.teacher} 
                onValueChange={(value) => setSlotData({...slotData, teacher: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No Teacher</SelectItem>
                  {teachers.map(teacher => (
                    <SelectItem key={teacher} value={teacher}>
                      {teacher}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">Room</Label>
              <Select 
                value={slotData.room} 
                onValueChange={(value) => setSlotData({...slotData, room: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No Room</SelectItem>
                  {rooms.map(room => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDeleteSlot}
            >
              Clear Slot
            </Button>
            <Button type="button" onClick={handleSaveSlot}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimetableEditor;