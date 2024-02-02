import { CareerPlan, CreateCareerPlanDto, UpdateCareerPlanDto } from "../Interfaces/CareerPlans.interface";
import { URL_API_BASE } from "../helpers/helpers";

const URL_API = `${URL_API_BASE}/careerplans`;

const options = <T,>(method: string, data?: T) => {
  return {
    method,
    body: JSON.stringify(data) || null,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
};

export const getAllCareerPlanService = async (): Promise<CareerPlan[]> => {
  const res = await fetch(`${URL_API}`, options('GET'));
    return await res.json();
};

export const getByIdCareerPlanService = async (id: string): Promise<CareerPlan> => {
  const res = await fetch(`${URL_API}/${id}`, options('GET'))
  return await res.json()
}

export const createCareerPlanService = async (data: CreateCareerPlanDto): Promise<CareerPlan> => {
  const res = await fetch(`${URL_API}`, options('POST', data));
    return await res.json();
};

export const updateCareerPlanService = async (id: string, data: UpdateCareerPlanDto): Promise<CareerPlan> => {
  const res = await fetch(`${URL_API}/${id}`, options('PUT', data));
    return await res.json();
};

export const deleteCareerPlanService = async (data: CareerPlan): Promise<number> => {
    const res = await fetch(`${URL_API}/${data._id}`, options('DELETE'));
    return res.status;
}