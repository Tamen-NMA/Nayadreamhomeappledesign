import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Sparkles, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { api } from '../utils/api';
import { supabase } from '../utils/supabase';
import type { ChoreSchedule } from '../types';
import { STATUS_COLORS } from '../types';
import { toast } from 'sonner';
import CreateScheduleModal from '../components/CreateScheduleModal';

export default function ChoresListPage() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<ChoreSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    loadSchedules();
  }, []);

  async function loadSchedules() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;
      
      setAccessToken(session.access_token);
      const data = await api.getChoreSchedules(session.access_token);
      setSchedules(data);
    } catch (error) {
      console.error('Failed to load chore schedules:', error);
      toast.error('Failed to load chore schedules');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateSchedule(title: string, weekStart: string, weekEnd: string) {
    if (!accessToken) return;

    try {
      const newSchedule = await api.createChoreSchedule(accessToken, {
        title,
        weekStart,
        weekEnd,
        status: 'draft',
        isAIGenerated: false,
        tasks: [],
      });

      setSchedules([...schedules, newSchedule]);
      setShowCreateModal(false);
      toast.success('Schedule created!');
      navigate(`/chores/${newSchedule.id}`);
    } catch (error) {
      console.error('Failed to create schedule:', error);
      toast.error('Failed to create schedule');
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#2F2F2F]">Chores</h1>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Schedule
        </Button>
      </div>

      {/* Schedule Cards */}
      {schedules.length > 0 ? (
        <div className="space-y-4">
          {schedules.map((schedule) => {
            const totalTasks = schedule.tasks.length;
            const completedTasks = schedule.tasks.filter(t => t.completed).length;
            const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

            return (
              <div
                key={schedule.id}
                onClick={() => navigate(`/chores/${schedule.id}`)}
                className="bg-white rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-[#2F2F2F]">{schedule.title}</h3>
                      {schedule.isAIGenerated && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-full">
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          <span className="text-xs font-semibold text-purple-600">AI</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6F6F6F]">
                      <Calendar className="w-4 h-4" />
                      <span>{schedule.weekStart} - {schedule.weekEnd}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[schedule.status]}`}>
                    {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6F6F6F]">Progress</span>
                    <span className="font-semibold text-[#2F2F2F]">
                      {completedTasks}/{totalTasks} tasks
                    </span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-[20px] p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-[#2F2F2F] mb-2">No chore schedules yet</h3>
          <p className="text-[#6F6F6F] mb-6">
            Create your first schedule to organize household tasks
          </p>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl"
          >
            Create Schedule
          </Button>
        </div>
      )}

      {/* Create Schedule Modal */}
      {showCreateModal && (
        <CreateScheduleModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateSchedule}
        />
      )}
    </div>
  );
}