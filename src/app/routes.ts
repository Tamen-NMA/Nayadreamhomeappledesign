import { createBrowserRouter } from 'react-router';
import RootLayout from './layouts/RootLayout';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import ChoresListPage from './pages/ChoresListPage';
import ChoreDetailPage from './pages/ChoreDetailPage';
import MealsListPage from './pages/MealsListPage';
import MealDetailPage from './pages/MealDetailPage';
import DelegationPage from './pages/DelegationPage';
import MorePage from './pages/MorePage';
import ShoppingPage from './pages/ShoppingPage';
import HouseholdPage from './pages/HouseholdPage';
import BillingPage from './pages/BillingPage';
import SettingsPage from './pages/SettingsPage';
import SharedTasksPage from './pages/SharedTasksPage';
import MaintenancePage from './pages/MaintenancePage';
import NotFound from './pages/NotFound';

// Router configuration for Naya Dream Home app
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'chores', Component: ChoresListPage },
      { path: 'chores/:id', Component: ChoreDetailPage },
      { path: 'meals', Component: MealsListPage },
      { path: 'meals/:id', Component: MealDetailPage },
      { path: 'delegation', Component: DelegationPage },
      { path: 'more', Component: MorePage },
      { path: 'shopping', Component: ShoppingPage },
      { path: 'household', Component: HouseholdPage },
      { path: 'billing', Component: BillingPage },
      { path: 'settings', Component: SettingsPage },
    ],
  },
  {
    path: '/signin',
    Component: SignIn,
  },
  {
    path: '/maintenance',
    Component: MaintenancePage,
  },
  {
    path: '/my-tasks/:token',
    Component: SharedTasksPage,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);