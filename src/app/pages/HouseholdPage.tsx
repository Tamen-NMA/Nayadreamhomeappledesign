import { useState, useEffect } from 'react';
import { Users, Plus, UserCircle, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { supabase } from '../utils/supabase';
import type { HouseholdMember } from '../types';
import { api } from '../utils/api';
import { toast } from 'sonner';
import AddMemberModal from '../components/AddMemberModal';
import { useNavigate } from 'react-router';
import { MOCK_MEMBERS } from '../data/mock-kenya';

export default function HouseholdPage() {
  const [members, setMembers] = useState<HouseholdMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      const data = await api.getMembers();
      setMembers(data && data.length > 0 ? data : MOCK_MEMBERS);
    } catch (error) {
      console.error('Failed to load members, using mock data:', error);
      setMembers(MOCK_MEMBERS);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddMember(member: Omit<HouseholdMember, 'id'>) {
    try {
      const newMember = await api.createMember(member);
      setMembers([...members, newMember]);
      setShowAddModal(false);
      toast.success('Member added!');
    } catch (error) {
      console.error('Failed to add member:', error);
      toast.error('Failed to add member');
    }
  }

  async function handleDeleteMember(id: string) {
    try {
      await api.deleteMember(id);
      setMembers(members.filter(m => m.id !== id));
      toast.success('Member removed');
    } catch (error) {
      console.error('Failed to delete member:', error);
      toast.error('Failed to delete member');
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#2F2F2F]">Household</h1>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Member
        </Button>
      </div>

      {members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-[20px] p-6 shadow-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F26B5E] to-[#5FB3A6] flex items-center justify-center text-3xl shadow-md">
                  {member.emojiAvatar}
                </div>
                <div className="text-center flex-1 w-full">
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex-1 text-center">
                      <h3 className="font-bold text-[#2F2F2F]">{member.name}</h3>
                      <p className="text-sm text-[#6F6F6F]">{member.age} years old</p>
                    </div>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {member.role.replace('_', ' ')}
                    </span>
                    {member.isStaff && (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                        Staff
                      </span>
                    )}
                  </div>
                  {(member.phone || member.email) && (
                    <div className="mt-3 text-sm text-[#6F6F6F] space-y-1">
                      {member.phone && <p>📞 {member.phone}</p>}
                      {member.email && <p>✉️ {member.email}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[20px] p-12 text-center">
          <p className="text-[#6F6F6F] mb-4">No household members yet</p>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl"
          >
            Add Member
          </Button>
        </div>
      )}

      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMember}
        />
      )}
    </div>
  );
}