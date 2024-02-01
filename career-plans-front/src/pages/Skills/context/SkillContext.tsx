import { createContext, useEffect, useState } from 'react';
import {
  CreateSkillDto,
  Skill,
  UpdateSkillDto,
} from '../../../Interfaces/Skill.interface';
import {
  createSkillService,
  deleteSkillService,
  getAllSkillService,
  updateSkillService,
} from '../../../services/SkillService';

interface SkillContextProps {
  entities: Skill[];
  createSkill: (data: CreateSkillDto) => Promise<void>;
  updateSkill: (id: string, data: UpdateSkillDto) => Promise<void>;
  deleteSkill: (data: Skill) => Promise<void>;
}

export const SkillContext = createContext<SkillContextProps>({
  entities: [],
  createSkill: async () => {},
  updateSkill: async () => {},
  deleteSkill: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export function SkillProvider({ children }: Props) {
  const [entities, SetEntities] = useState<Skill[]>([]);

  const createSkill = async (data: CreateSkillDto): Promise<void> => {
    const res: Skill = await createSkillService(data);
    SetEntities([...entities, res]);
  };

  const deleteSkill = async (data: Skill): Promise<void> => {
    const res = await deleteSkillService(data);
    if (res === 204) {
      SetEntities(entities.filter(entity => entity != data));
    }
  };

  const updateSkill = async (
    id: string,
    data: UpdateSkillDto,
  ): Promise<void> => {
    const res: Skill = await updateSkillService(id, data);
    SetEntities(
      entities.map(entity =>
        entity._id == id ? { ...entity, ...res } : entity,
      ),
    );
  };

  useEffect(() => {
    getAllSkillService().then(data => SetEntities(data));
  }, []);

  return (
    <SkillContext.Provider
      value={{ entities, createSkill, updateSkill, deleteSkill }}
    >
      {children}
    </SkillContext.Provider>
  );
}
