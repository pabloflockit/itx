import {
  CreateUserSkillDto,
  UpdateUserSkillDto,
  UserSkill,
} from '../Interfaces/UserSkill.interface';
import { URL_API_BASE } from '../helpers/helpers';

const URL_API = `${URL_API_BASE}/userskills`;

const options = <T,>(method: string, data?: T) => {
  return {
    method,
    body: JSON.stringify(data) || null,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
};

export const getAllUserSkillService = async (): Promise<UserSkill[]> => {
  const res = await fetch(`${URL_API}`, options('GET'));
  return await res.json();
};

export const createUserSkillService = async (
  data: CreateUserSkillDto,
): Promise<UserSkill> => {
  const res = await fetch(`${URL_API}`, options('POST', data));
  return await res.json();
};

export const updateUserSkillService = async (
  id: string,
  data: UpdateUserSkillDto,
): Promise<UserSkill> => {
  const res = await fetch(`${URL_API}/${id}`, options('PUT', data));
  return await res.json();
};

export const deleteUserSkillService = async (data: UserSkill): Promise<number> => {
  const res = await fetch(`${URL_API}/${data._id}`, options('DELETE'));
  return res.status;
};
