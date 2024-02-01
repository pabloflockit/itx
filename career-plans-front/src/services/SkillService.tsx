import { CreateSkillDto, Skill, UpdateSkillDto } from '../Interfaces/Skill.interface';
import { URL_API_BASE } from '../helpers/helpers';

const URL_API = `${URL_API_BASE}/skills`;

const options = <T,>(method: string, data?: T) => {
  return {
    method,
    body: JSON.stringify(data) || null,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
};

export const getAllSkillService = async (): Promise<Skill[]> => {
  const res = await fetch(`${URL_API}`, options('GET'));
    return await res.json();
};

export const createSkillService = async (data: CreateSkillDto): Promise<Skill> => {
  const res = await fetch(`${URL_API}`, options('POST', data));
    return await res.json();
};

export const updateSkillService = async (id: string, data: UpdateSkillDto): Promise<Skill> => {
  const res = await fetch(`${URL_API}/${id}`, options('PUT', data));
    return await res.json();
};

export const deleteSkillService = async (data: Skill): Promise<number> => {
    const res = await fetch(`${URL_API}/${data._id}`, options('DELETE'));
    return res.status;
}