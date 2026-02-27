import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useParams } from 'react-router';
import { CheckCircle2, Circle } from 'lucide-react';
import { toast } from 'sonner';
import { DAYS_SHORT } from '../types';

interface SharedTask {
  id: string;
  title: string;
  description?: string;
  day: number;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  emoji?: string;
  scheduleName: string;
}

interface Member {
  name: string;
  emojiAvatar: string;
}

const PRIORITY_CONFIG = {
  high: { color: '#F26B5E', label: 'HIGH', bg: 'bg-[#F26B5E]/10', text: 'text-[#F26B5E]' },
  medium: { color: '#F59E0B', label: 'MEDIUM', bg: 'bg-amber-100', text: 'text-amber-700' },
  low: { color: '#3A86FF', label: 'LOW', bg: 'bg-blue-100', text: 'text-blue-700' },
};

export default function SharedTasksPage() {
  const { token } = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [tasks, setTasks] = useState<SharedTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSharedTasks();
  }, [token]);

  async function loadSharedTasks() {
    try {
      if (!token) return;

      const data = await api.getSharedTasks(token);
      setMember(data.member);
      setTasks(data.tasks);
    } catch (error) {
      console.error('Failed to load shared tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleTask(taskId: string) {
    if (!token) return;

    try {
      await api.toggleSharedTask(token, taskId);
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
      toast.success('Task updated');
    } catch (error) {
      console.error('Failed to toggle task:', error);
      toast.error('Failed to update task');
    }
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const groupTasksByDay = () => {
    const grouped: Record<number, SharedTask[]> = {};
    tasks.forEach(task => {
      if (!grouped[task.day]) grouped[task.day] = [];
      grouped[task.day].push(task);
    });
    return grouped;
  };

  const tasksByDay = groupTasksByDay();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] p-4 flex items-center justify-center">
        <p className="text-[#6F6F6F]">Loading tasks...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] p-4 flex items-center justify-center">
        <div className="bg-white rounded-[20px] p-8 text-center shadow-sm">
          <p className="text-[#6F6F6F]">Invalid or expired link</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-4 pb-12">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#F26B5E] to-[#5FB3A6] rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-4xl">{member.emojiAvatar}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#2F2F2F] mb-1">
            Naya Dream Home
          </h1>
          <p className="text-sm text-[#6F6F6F]">
            Tasks for {member.name}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[#2F2F2F]">Your Progress</h2>
            <span className="text-sm font-medium text-[#6F6F6F]">
              {completedCount} / {tasks.length} tasks
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#5FB3A6] to-[#4fa396] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {progressPercent === 100 && (
            <p className="text-sm text-[#5FB3A6] font-medium mt-2 text-center">
              🎉 All tasks completed!
            </p>
          )}
        </div>

        {/* Tasks by Day */}
        {Object.entries(tasksByDay)
          .sort(([dayA], [dayB]) => Number(dayA) - Number(dayB))
          .map(([day, dayTasks]) => (
            <div key={day} className="space-y-3">
              {/* Day Header */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200"></div>
                <h3 className="text-sm font-bold text-[#6F6F6F] uppercase">
                  {DAYS_SHORT[Number(day)]}
                </h3>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              {/* Task Cards */}
              {dayTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className="bg-white rounded-[20px] p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.completed
                          ? 'bg-[#5FB3A6] border-[#5FB3A6]'
                          : 'border-gray-300 hover:border-[#5FB3A6]'
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-white" fill="currentColor" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                    </button>

                    {/* Task Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-2">
                        {task.emoji && (
                          <span className="text-2xl">{task.emoji}</span>
                        )}
                        <h4 className={`font-bold text-[#2F2F2F] flex-1 ${
                          task.completed ? 'line-through opacity-50' : ''
                        }`}>
                          {task.title}
                        </h4>
                      </div>

                      {task.description && (
                        <p className={`text-sm text-[#6F6F6F] mb-2 ${
                          task.completed ? 'opacity-50' : ''
                        }`}>
                          {task.description}
                        </p>
                      )}

                      {/* Priority Badge */}
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          PRIORITY_CONFIG[task.priority].bg
                        } ${PRIORITY_CONFIG[task.priority].text}`}>
                          {PRIORITY_CONFIG[task.priority].label}
                        </span>
                        <span className="text-xs text-[#6F6F6F]">
                          {task.scheduleName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {tasks.length === 0 && (
          <div className="bg-white rounded-[20px] p-12 text-center shadow-sm">
            <p className="text-[#6F6F6F]">No tasks assigned yet</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-[#6F6F6F] pt-4">
          <p>Assigned by your household</p>
        </div>
      </div>
    </div>
  );
}