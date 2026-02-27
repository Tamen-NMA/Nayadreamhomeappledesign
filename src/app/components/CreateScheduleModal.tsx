import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X } from 'lucide-react';

interface CreateScheduleModalProps {
  onClose: () => void;
  onCreate: (title: string, weekStart: string, weekEnd: string) => void;
}

export default function CreateScheduleModal({ onClose, onCreate }: CreateScheduleModalProps) {
  const [title, setTitle] = useState('');
  const [weekStart, setWeekStart] = useState(getDefaultWeekStart());
  const [weekEnd, setWeekEnd] = useState(getDefaultWeekEnd());

  function getDefaultWeekStart() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day; // Get Sunday
    const sunday = new Date(today.setDate(diff));
    return sunday.toISOString().split('T')[0];
  }

  function getDefaultWeekEnd() {
    const start = new Date(getDefaultWeekStart());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return end.toISOString().split('T')[0];
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title, weekStart, weekEnd);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-t-[28px] md:rounded-[28px] w-full max-w-md p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2F2F2F]">New Chore Schedule</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Schedule Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., Week of Feb 27"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weekStart">Week Start</Label>
              <Input
                id="weekStart"
                type="date"
                value={weekStart}
                onChange={(e) => setWeekStart(e.target.value)}
                className="mt-1 rounded-xl"
                required
              />
            </div>
            <div>
              <Label htmlFor="weekEnd">Week End</Label>
              <Input
                id="weekEnd"
                type="date"
                value={weekEnd}
                onChange={(e) => setWeekEnd(e.target.value)}
                className="mt-1 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-xl"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
