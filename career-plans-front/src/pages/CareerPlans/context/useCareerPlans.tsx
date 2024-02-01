import { useContext } from 'react';
import { CareerPlanContext } from './CareerPlanContext';

export function useCareerPlan() {
  const context = useContext(CareerPlanContext);

  if (!context)
    throw new Error('useCareerPlan debe estar dentro de un CareerPlanProvider');

  return context;
}
