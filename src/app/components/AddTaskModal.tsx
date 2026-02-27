import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X } from 'lucide-react';
import type { ChoreTask, HouseholdMember, Priority } from '../types';
import { DAYS } from '../types';

interface AddTaskModalProps {
  members: HouseholdMember[];
  defaultDay: number;
  onClose: () => void;
  onAdd: (task: Omit<ChoreTask, 'id'>) => void;
}

const EMOJI_OPTIONS = ['📋', '🧹', '🧺', '🍳', '🚿', '🛏️', '🗑️', '🌱', '🚗', '🐕', '📚', '💊'];

export default function AddTaskModal({ members, defaultDay, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [day, setDay] = useState(defaultDay);
  const [priority, setPriority] = useState<Priority>('medium');
  const [assigneeId, setAssigneeId] = useState<string>('');
  const [emoji, setEmoji] = useState('📋');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title,
      description: description || undefined,
      day,
      priority,
      completed: false,
      assigneeId: assigneeId || undefined,
      emoji,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-t-[28px] md:rounded-[28px] w-full max-w-md p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2F2F2F]">Add Task</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., Clean kitchen"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 rounded-xl"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Optional details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 rounded-xl"
              rows={3}
            />
          </div>

          <div>
            <Label>Emoji</Label>
            <div className="grid grid-cols-6 gap-2 mt-1">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`w-12 h-12 text-2xl rounded-xl flex items-center justify-center transition-all ${
                    emoji === e
                      ? 'bg-[#F26B5E] scale-110 shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="day">Day of Week</Label>
            <Select value={day.toString()} onValueChange={(v) => setDay(parseInt(v))}>
              <SelectTrigger className="mt-1 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((dayName, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {dayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Priority</Label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 px-4 rounded-xl font-semibold transition-all ${
                    priority === p
                      ? 'bg-[#F26B5E] text-white scale-105'
                      : 'bg-gray-100 text-[#6F6F6F] hover:bg-gray-200'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="assignee">Assign To</Label>
            <Select value={assigneeId} onValueChange={setAssigneeId}>
              <SelectTrigger className="mt-1 rounded-xl">
                <SelectValue placeholder="Unassigned" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Unassigned</SelectItem>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.emojiAvatar} {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
