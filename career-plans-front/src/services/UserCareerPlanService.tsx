import {
  CreateUserCareerPlanDto,
  UpdateUserCareerPlanDto,
  UserCareerPlan,
} from '../Interfaces/UserCareerPlans.interface';
import { URL_API_BASE } from '../helpers/helpers';

const URL_API = `${URL_API_BASE}/usercareerplans`;

const options = <T,>(method: string, data?: T) => {
  return {
    method,
    body: JSON.stringify(data) || null,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
};

export const getAllUserCareerPlanService = async (): Promise<UserCareerPlan[]> => {
  const res = await fetch(`${URL_API}`, options('GET'));
  return await res.json();
};

export const createUserCareerPlanService = async (
  data: CreateUserCareerPlanDto,
): Promise<UserCareerPlan> => {
  const res = await fetch(`${URL_API}`, options('POST', data));
  return await res.json();
};

export const updateUserCareerPlanService = async (
  id: string,
  data: UpdateUserCareerPlanDto,
): Promise<UserCareerPlan> => {
  const res = await fetch(`${URL_API}/${id}`, options('PUT', data));
  return await res.json();
};

export const deleteUserCareerPlanService = async (
  data: UserCareerPlan,
): Promise<number> => {
  const res = await fetch(`${URL_API}/${data._id}`, options('DELETE'));
  return res.status;
};
