import { CareerPlan } from '../Interfaces/CareerPlans.interface';
import { Skill } from '../Interfaces/Skill.interface';
import { User } from '../Interfaces/User.interface';
import { UserCareerPlanAutoComplete } from '../Interfaces/UserCareerPlans.interface';

export const URL_API_BASE = 'http://localhost:3000';

export const arrayIds = (skills?: Skill[]): string[] => {
  const res: string[] = [];
  if (skills) skills.forEach(skill => res.push(skill._id));
  return res;
};

export function arrayEquals<T>(a: T[], b: T[]): boolean {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

export const arrayUserNames = (
  entities?: User[],
): UserCareerPlanAutoComplete[] => {
  const res: UserCareerPlanAutoComplete[] = [];
  if (entities)
    entities.forEach(entity =>
      res.push({
        label: `${entity.lastName}, ${entity.firstName}`,
        id: entity._id,
      }),
    );
  return res;
};

export const arrayCareerNames = (
  entities?: CareerPlan[],
): UserCareerPlanAutoComplete[] => {
  const res: UserCareerPlanAutoComplete[] = [];
  if (entities)
    entities.forEach(entity =>
      res.push({ label: `${entity.name}`, id: entity._id }),
    );
  return res;
};
