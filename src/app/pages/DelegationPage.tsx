import type { HouseholdMember, ChoreSchedule, ChoreTask } from '../types';
import { useState, useEffect } from 'react';
import { Users, Plus, ExternalLink, Copy, Check, ChevronDown, ChevronUp, Share2, AlertCircle, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase';
import { api } from '../utils/api';
import { useNavigate } from 'react-router';

export default function DelegationPage() {
  const [members, setMembers] = useState<HouseholdMember[]>([]);
  const [schedules, setSchedules] = useState<ChoreSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingLinks, setGeneratingLinks] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [membersData, schedulesData] = await Promise.all([
        api.getMembers(),
        api.getChoreSchedules(),
      ]);

      setMembers(membersData);
      setSchedules(schedulesData);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateShareLink(memberId: string) {
    setGeneratingLinks(prev => new Set(prev).add(memberId));
    try {
      const data = await api.getShareLink(memberId);
      
      // Copy to clipboard
      await navigator.clipboard.writeText(data.shareLink);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to generate share link:', error);
      toast.error('Failed to generate share link');
    } finally {
      setGeneratingLinks(prev => {
        const newSet = new Set(prev);
        newSet.delete(memberId);
        return newSet;
      });
    }
  }

  function handleShareWhatsApp(memberId: string) {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const message = `Hi ${member.name}! Here are your tasks for this week: ${window.location.origin}/shared-tasks/${memberId}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  function handleShareSMS(memberId: string) {
    const member = members.find(m => m.id === memberId);
    if (!member || !member.phone) return;

    const message = `Hi ${member.name}! Here are your tasks: ${window.location.origin}/shared-tasks/${memberId}`;
    const smsUrl = `sms:${member.phone}?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  }

  const getMemberTasks = (memberId: string): ChoreTask[] => {
    const tasks: ChoreTask[] = [];
    schedules.forEach(schedule => {
      schedule.tasks.forEach(task => {
        if (task.assigneeId === memberId) {
          tasks.push(task);
        }
      });
    });
    return tasks;
  };

  const getUnassignedTasks = (): ChoreTask[] => {
    const tasks: ChoreTask[] = [];
    schedules.forEach(schedule => {
      schedule.tasks.forEach(task => {
        if (!task.assigneeId) {
          tasks.push(task);
        }
      });
    });
    return tasks;
  };

  const unassignedTasks = getUnassignedTasks();

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#2F2F2F]">Delegation</h1>
        <div className="bg-white rounded-[20px] p-12 text-center">
          <p className="text-[#6F6F6F]">Loading...</p>
        </div>
      </div>
    );
  }

  // Empty state - no schedules
  if (schedules.length === 0) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#2F2F2F]">Delegation</h1>
        <div className="bg-white rounded-[20px] p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-amber-100 rounded-3xl mx-auto mb-4 flex items-center justify-center">
            <Share2 className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold text-[#2F2F2F] mb-2">
            No chore schedules yet
          </h2>
          <p className="text-[#6F6F6F] mb-6">
            Create a chore schedule first to start delegating tasks to household members
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl pb-24">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#2F2F2F]">Delegation</h1>

      {/* Unassigned Tasks Warning */}
      {unassignedTasks.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-[20px] p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-amber-900 mb-1">
              {unassignedTasks.length} Unassigned Task{unassignedTasks.length !== 1 ? 's' : ''}
            </h3>
            <p className="text-sm text-amber-700">
              Some tasks haven't been assigned to anyone yet. Visit your chore schedules to assign them.
            </p>
          </div>
        </div>
      )}

      {/* Member Task Cards */}
      <div className="space-y-4">
        {members.map((member) => {
          const tasks = getMemberTasks(member.id);
          const completedTasks = tasks.filter(t => t.completed).length;
          const progressPercent = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

          return (
            <div
              key={member.id}
              className="bg-white rounded-[20px] p-6 shadow-sm"
            >
              {/* Member Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F26B5E] to-[#5FB3A6] flex items-center justify-center text-3xl shadow-md">
                  {member.emojiAvatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-[#2F2F2F]">
                      {member.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      member.isStaff
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {member.role.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-[#6F6F6F]">
                    {tasks.length} task{tasks.length !== 1 ? 's' : ''} assigned
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              {tasks.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#6F6F6F]">
                      Progress
                    </span>
                    <span className="text-sm font-bold text-[#2F2F2F]">
                      {completedTasks} / {tasks.length} done
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#5FB3A6] to-[#4fa396] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Task List Preview */}
              {tasks.length > 0 && (
                <div className="space-y-2 mb-4">
                  {tasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        task.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className={`text-[#2F2F2F] ${
                        task.completed ? 'line-through opacity-50' : ''
                      }`}>
                        {task.emoji} {task.title}
                      </span>
                    </div>
                  ))}
                  {tasks.length > 3 && (
                    <p className="text-xs text-[#6F6F6F] pl-4">
                      +{tasks.length - 3} more task{tasks.length - 3 !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              )}

              {/* Share Actions */}
              {member.isStaff && (
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <p className="text-sm font-semibold text-[#2F2F2F] mb-3">
                    Share tasks with {member.name}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleGenerateShareLink(member.id)}
                      disabled={generatingLinks.has(member.id)}
                      className="flex-1 h-11 bg-[#5FB3A6] hover:bg-[#4fa396] text-white rounded-2xl font-semibold"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {generatingLinks.has(member.id) ? 'Generating...' : 'Copy Link'}
                    </Button>
                    <Button
                      onClick={() => handleShareWhatsApp(member.id)}
                      className="flex-1 h-11 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                  {member.phone && (
                    <Button
                      onClick={() => handleShareSMS(member.id)}
                      className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send SMS
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {members.length === 0 && (
        <div className="bg-white rounded-[20px] p-12 text-center shadow-sm">
          <p className="text-[#6F6F6F]">
            No household members yet. Add members to start delegating tasks.
          </p>
        </div>
      )}
    </div>
  );
}