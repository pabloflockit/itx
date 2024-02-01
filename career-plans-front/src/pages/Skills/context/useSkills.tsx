import { useContext } from 'react';
import { SkillContext } from './SkillContext';

export function useSkill() {
  const context = useContext(SkillContext);
  if (!context)
    throw new Error('useSkill debe estar dentro de un SkillProvider');
  return context;
}
