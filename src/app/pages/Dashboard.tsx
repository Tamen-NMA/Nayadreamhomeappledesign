import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { api } from '../utils/api';
import { supabase } from '../utils/supabase';
import type { ChoreSchedule, MealPlan, HouseholdMember } from '../types';
import { MEAL_TYPE_GRADIENTS, MEAL_TYPE_LABELS } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [choreSchedules, setChoreSchedules] = useState<ChoreSchedule[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [members, setMembers] = useState<HouseholdMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;

      setUser(session.user);

      const [choresData, mealsData, membersData] = await Promise.all([
        api.getChoreSchedules(session.access_token).catch(() => []),
        api.getMealPlans(session.access_token).catch(() => []),
        api.getMembers(session.access_token).catch(() => []),
      ]);

      setChoreSchedules(choresData);
      setMealPlans(mealsData);
      setMembers(membersData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  const activeSchedule = choreSchedules.find(s => s.status === 'active');
  const activeMealPlan = mealPlans.find(p => p.status === 'active');
  
  // Today's tasks from active schedule
  const today = new Date().getDay();
  const todaysTasks = activeSchedule?.tasks.filter(t => t.day === today) || [];
  const completedTasks = todaysTasks.filter(t => t.completed).length;
  const progressPercent = todaysTasks.length > 0 ? (completedTasks / todaysTasks.length) * 100 : 0;

  // All tasks for the week
  const allWeekTasks = activeSchedule?.tasks || [];
  const completedWeekTasks = allWeekTasks.filter(t => t.completed).length;

  // Get week dates
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + (weekOffset * 7));
  const weekDates = getWeekDates(currentDate);

  // Today's meals
  const todaysMeals = activeMealPlan?.meals.filter(m => m.day === today) || [];

  const userName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'there';
  const greeting = getGreeting();

  if (loading) {
    return (
      <div className="p-6 space-y-6">
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
        <div>
          <h1 className="text-3xl font-bold text-[#2F2F2F]">
            {greeting}, {userName}!
          </h1>
          <p className="text-[#6F6F6F] mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {user?.user_metadata?.avatar_url && (
          <img
            src={user.user_metadata.avatar_url}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-[#F26B5E]"
          />
        )}
      </div>

      {/* Week Calendar */}
      <div className="bg-white rounded-[20px] p-3 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4 gap-0.5 sm:gap-1">
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#6F6F6F]" />
          </button>
          <div className="flex items-center gap-0.5 sm:gap-1 flex-1 justify-center">
            {weekDates.map((date, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const dayName = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];
              
              return (
                <button
                  key={index}
                  className={`flex flex-col items-center justify-center w-9 sm:w-12 h-12 sm:h-16 rounded-xl sm:rounded-2xl transition-all ${
                    isToday
                      ? 'bg-[#F26B5E] text-white shadow-md'
                      : 'hover:bg-gray-100 text-[#2F2F2F]'
                  }`}
                >
                  <span className={`text-[10px] sm:text-xs font-medium mb-0.5 ${isToday ? 'text-white/80' : 'text-[#6F6F6F]'}`}>
                    {dayName}
                  </span>
                  <span className={`text-sm sm:text-lg font-bold ${isToday ? 'text-white' : 'text-[#2F2F2F]'}`}>
                    {date.getDate()}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#6F6F6F]" />
          </button>
        </div>

        {/* Weekly Chores Progress */}
        {activeSchedule && (
          <div className="bg-gray-50 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5FB3A6] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#2F2F2F]">CHORES</h3>
              </div>
              <span className="text-xs sm:text-sm text-[#6F6F6F] font-medium whitespace-nowrap">
                {completedWeekTasks}/{allWeekTasks.length}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-[#6F6F6F] mb-2">
              <span>{completedWeekTasks} done</span>
              <span>{allWeekTasks.length} total</span>
            </div>

            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
              <div
                className="absolute top-0 left-0 h-full bg-[#5FB3A6] rounded-full transition-all duration-500"
                style={{ width: `${allWeekTasks.length > 0 ? (completedWeekTasks / allWeekTasks.length) * 100 : 0}%` }}
              />
            </div>

            <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#5FB3A6] flex-shrink-0" />
                <span className="text-[#6F6F6F]">Done ({completedWeekTasks})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200 flex-shrink-0" />
                <span className="text-[#6F6F6F]">Remaining ({allWeekTasks.length - completedWeekTasks})</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Today's Chores Card */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#2F2F2F]">Today's Chores</h2>
          <button
            onClick={() => activeSchedule ? navigate(`/chores/${activeSchedule.id}`) : navigate('/chores')}
            className="text-[#F26B5E] text-sm font-semibold hover:underline"
          >
            View All
          </button>
        </div>

        {todaysTasks.length > 0 ? (
          <>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#5FB3A6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progressPercent / 100)}`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-[#2F2F2F]">
                    {completedTasks}/{todaysTasks.length}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-[#6F6F6F]">Tasks Completed</p>
                <p className="text-2xl font-bold text-[#5FB3A6]">{Math.round(progressPercent)}%</p>
              </div>
            </div>

            <div className="space-y-2">
              {todaysTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    task.completed
                      ? 'bg-[#5FB3A6] border-[#5FB3A6]'
                      : 'border-gray-300'
                  }`}>
                    {task.completed && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed ? 'line-through text-[#9C9C9C]' : 'text-[#2F2F2F]'}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-sm text-[#6F6F6F]">{task.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#6F6F6F] mb-4">No tasks scheduled for today</p>
            <Button
              onClick={() => navigate('/chores')}
              className="bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl"
            >
              Create Chore Schedule
            </Button>
          </div>
        )}
      </div>

      {/* Today's Meals Card */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#2F2F2F]">Today's Meals</h2>
          <button
            onClick={() => activeMealPlan ? navigate(`/meals/${activeMealPlan.id}`) : navigate('/meals')}
            className="text-[#F26B5E] text-sm font-semibold hover:underline"
          >
            View All
          </button>
        </div>

        {todaysMeals.length > 0 ? (
          <div className="space-y-3">
            {todaysMeals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-[#F26B5E] transition-all cursor-pointer"
                onClick={() => navigate(`/meals/${activeMealPlan!.id}`)}
              >
                <div className={`w-1 h-16 rounded-full bg-gradient-to-b ${MEAL_TYPE_GRADIENTS[meal.type]}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#6F6F6F] uppercase">
                      {MEAL_TYPE_LABELS[meal.type]}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#2F2F2F] mb-1">{meal.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-[#6F6F6F]">
                    {meal.calories && <span>{meal.calories} cal</span>}
                    {meal.prepTime && <span>{meal.prepTime} min</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#6F6F6F] mb-4">No meals planned for today</p>
            <Button
              onClick={() => navigate('/meals')}
              className="bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl"
            >
              Create Meal Plan
            </Button>
          </div>
        )}
      </div>

      {/* Household Members */}
      <div className="grid grid-cols-2 gap-4">
        {/* Household Header Widget */}
        <button
          onClick={() => navigate('/household')}
          className="bg-gradient-to-br from-[#F26B5E] to-[#e05a4e] rounded-[20px] aspect-square p-6 text-left shadow-lg hover:shadow-xl transition-shadow group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="text-5xl">
              🏠
            </div>
            <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Household</h3>
            <p className="text-white/80 text-xs">Manage members</p>
          </div>
        </button>

        {members.map((member) => (
          <button
            key={member.id}
            onClick={() => navigate('/household')}
            className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-[20px] aspect-square p-6 text-left shadow-lg hover:shadow-xl transition-shadow group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="text-5xl">
                {member.emojiAvatar}
              </div>
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
              <p className="text-white/80 text-xs capitalize">{member.role}</p>
            </div>
          </button>
        ))}
        <button
          onClick={() => navigate('/household')}
          className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-[20px] aspect-square p-6 text-left shadow-lg hover:shadow-xl transition-shadow group flex flex-col justify-center items-center"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#F26B5E] mb-3">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#2F2F2F]">Add Member</h3>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/chores')}
          className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-[20px] aspect-square p-6 text-left shadow-lg hover:shadow-xl transition-shadow group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">New Chore</h3>
            <p className="text-white/80 text-xs">Organize tasks</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/meals')}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[20px] aspect-square p-6 text-left shadow-lg hover:shadow-xl transition-shadow group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">New Meal</h3>
            <p className="text-white/80 text-xs">Plan meals</p>
          </div>
        </button>
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function getWeekDates(date: Date): Date[] {
  const weekDates: Date[] = [];
  const currentDay = date.getDay();
  const diff = date.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust when day is Sunday
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(date);
    newDate.setDate(diff + i);
    weekDates.push(newDate);
  }
  return weekDates;
}