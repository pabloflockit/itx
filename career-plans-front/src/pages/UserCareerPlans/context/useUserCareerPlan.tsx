import { useContext } from 'react';
import { UserCareerPlanContext } from './UserCareerPlanContext';

export function useUserCareerPlan() {
  const context = useContext(UserCareerPlanContext);

  if (!context)
    throw new Error('useCareerPlan debe estar dentro de un CareerPlanProvider');

  return context;
}
