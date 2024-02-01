import { Skill } from '../Interfaces/Skill.interface';

export const arrayIds = (skills?: Skill[]): string[] => {
  const res: string[] = [];
  if (skills) skills.forEach(skill => res.push(skill._id));
  return res;
};


export function arrayEquals<T>(a: T[], b: T[]): boolean {
  return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

export const URL_API_BASE = "http://localhost:3000";