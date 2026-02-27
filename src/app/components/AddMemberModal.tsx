import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { X } from 'lucide-react';
import type { HouseholdMember, Role } from '../types';
import { EMOJI_AVATARS } from '../types';

interface AddMemberModalProps {
  onClose: () => void;
  onAdd: (member: Omit<HouseholdMember, 'id'>) => void;
}

export default function AddMemberModal({ onClose, onAdd }: AddMemberModalProps) {
  const [name, setName] = useState('');
  const [emojiAvatar, setEmojiAvatar] = useState('👤');
  const [age, setAge] = useState('');
  const [role, setRole] = useState<Role>('adult');
  const [isStaff, setIsStaff] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !age) return;

    onAdd({
      name,
      emojiAvatar,
      age: parseInt(age),
      role,
      isStaff,
      phone: phone || undefined,
      email: email || undefined,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-t-[28px] md:rounded-[28px] w-full max-w-md p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2F2F2F]">Add Household Member</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Member name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 rounded-xl"
              required
            />
          </div>

          <div>
            <Label>Avatar</Label>
            <div className="grid grid-cols-7 gap-2 mt-1">
              {EMOJI_AVATARS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setEmojiAvatar(emoji)}
                  className={`w-12 h-12 text-2xl rounded-xl flex items-center justify-center transition-all ${
                    emojiAvatar === emoji
                      ? 'bg-[#F26B5E] scale-110 shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 rounded-xl"
                required
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="mt-1 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult">Adult</SelectItem>
                  <SelectItem value="teen">Teen</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="house_help">House Help</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <Label htmlFor="isStaff" className="cursor-pointer">Is Staff Member?</Label>
            <Switch
              id="isStaff"
              checked={isStaff}
              onCheckedChange={setIsStaff}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 234 567 8900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 rounded-xl"
            />
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
              Add Member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
