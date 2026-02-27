import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Sparkles, Trash2, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../utils/api';
import { supabase } from '../utils/supabase';
import type { ChoreSchedule, ChoreTask, HouseholdMember } from '../types';
import { DAYS_SHORT, PRIORITY_COLORS, STATUS_COLORS } from '../types';
import { toast } from 'sonner';
import AddTaskModal from '../components/AddTaskModal';
import { MOCK_CHORE_SCHEDULE, MOCK_MEMBERS } from '../data/mock-kenya';

export default function ChoreDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ChoreSchedule | null>(null);
  const [members, setMembers] = useState<HouseholdMember[]>([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      // Check for mock data first
      if (id === MOCK_CHORE_SCHEDULE.id) {
        setSchedule(MOCK_CHORE_SCHEDULE);
        setMembers(MOCK_MEMBERS);
        setLoading(false);
        return;
      }

      const [scheduleData, membersData] = await Promise.all([
        api.getChoreSchedule(id!),
        api.getMembers().catch(() => []),
      ]);

      setSchedule(scheduleData);
      setMembers(membersData && membersData.length > 0 ? membersData : MOCK_MEMBERS);
    } catch (error) {
      console.error('Failed to load schedule, trying mock data:', error);
      if (id === MOCK_CHORE_SCHEDULE.id) {
        setSchedule(MOCK_CHORE_SCHEDULE);
        setMembers(MOCK_MEMBERS);
      } else {
        toast.error('Failed to load schedule');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleTask(taskId: string) {
    if (!schedule) return;

    const updatedTasks = schedule.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    try {
      const updated = await api.updateChoreSchedule(schedule.id, {
        tasks: updatedTasks,
      });
      setSchedule(updated);
    } catch (error) {
      console.error('Failed to toggle task:', error);
      toast.error('Failed to update task');
    }
  }

  async function handleDeleteTask(taskId: string) {
    if (!schedule) return;

    const updatedTasks = schedule.tasks.filter(task => task.id !== taskId);

    try {
      const updated = await api.updateChoreSchedule(schedule.id, {
        tasks: updatedTasks,
      });
      setSchedule(updated);
      toast.success('Task deleted');
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    }
  }

  async function handleAddTask(task: Omit<ChoreTask, 'id'>) {
    if (!schedule) return;

    const newTask = {
      ...task,
      id: `task_${Date.now()}`,
    };

    try {
      const updated = await api.updateChoreSchedule(schedule.id, {
        tasks: [...schedule.tasks, newTask],
      });
      setSchedule(updated);
      setShowAddTask(false);
      toast.success('Task added');
    } catch (error) {
      console.error('Failed to add task:', error);
      toast.error('Failed to add task');
    }
  }

  async function handleGenerateAI() {
    if (!schedule) return;

    setGeneratingAI(true);
    try {
      const updated = await api.generateChores(schedule.id);
      setSchedule(updated);
      toast.success('AI tasks generated!');
    } catch (error) {
      console.error('Failed to generate tasks:', error);
      toast.error('Failed to generate tasks');
    } finally {
      setGeneratingAI(false);
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

  if (!schedule) {
    return (
      <div className="p-6 text-center">
        <p className="text-[#6F6F6F]">Schedule not found</p>
        <Button onClick={() => navigate('/chores')} className="mt-4">
          Back to Chores
        </Button>
      </div>
    );
  }

  const dayTasks = schedule.tasks.filter(t => t.day === selectedDay);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/chores')}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
        >
          <ArrowLeft className="w-5 h-5 text-[#2F2F2F]" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#2F2F2F]">{schedule.title}</h1>
          <p className="text-sm text-[#6F6F6F]">{schedule.weekStart} - {schedule.weekEnd}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[schedule.status]}`}>
          {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleGenerateAI}
          disabled={generatingAI}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Sparkles className={`w-5 h-5 mr-2 ${generatingAI ? 'animate-spin' : ''}`} />
          {generatingAI ? 'Generating...' : 'AI Generate'}
        </Button>
        <Button
          onClick={() => setShowAddTask(true)}
          className="bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Day Chips */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2 pt-2">
            {DAYS_SHORT.map((day, index) => {
              const tasksForDay = schedule.tasks.filter(t => t.day === index);
              const completedForDay = tasksForDay.filter(t => t.completed).length;
              const isSelected = selectedDay === index;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(index)}
                  className={`flex-shrink-0 px-6 py-3 rounded-full font-semibold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-white text-[#6F6F6F] border-2 border-gray-200 hover:border-[#F26B5E]'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-base">{day}</div>
                    <div className="text-xs mt-1 opacity-80">
                      {completedForDay}/{tasksForDay.length}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        {/* Gradient fade indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F9F3F1] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F9F3F1] to-transparent pointer-events-none" />
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {dayTasks.length > 0 ? (
          dayTasks.map((task) => {
            const assignee = members.find(m => m.id === task.assigneeId);

            return (
              <div
                key={task.id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    task.completed ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    {task.completed ? (
                      <div className="w-6 h-6 bg-[#5FB3A6] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <span className="text-2xl">{task.emoji || '📋'}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className={`font-semibold text-[#2F2F2F] mb-1 ${
                      task.completed ? 'line-through opacity-50' : ''
                    }`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-[#6F6F6F] mb-2">{task.description}</p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      {task.priority !== 'medium' && (
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${PRIORITY_COLORS[task.priority]}`}>
                          {task.priority.toUpperCase()}
                        </span>
                      )}
                      {assignee && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {assignee.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? 'bg-[#5FB3A6] border-[#5FB3A6]'
                          : 'border-gray-300 hover:border-[#5FB3A6]'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center">
            <p className="text-[#6F6F6F] mb-4">No tasks for {DAYS_SHORT[selectedDay]}</p>
            <Button
              onClick={() => setShowAddTask(true)}
              className="bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl"
            >
              Add Task
            </Button>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <AddTaskModal
          members={members}
          defaultDay={selectedDay}
          onClose={() => setShowAddTask(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
}