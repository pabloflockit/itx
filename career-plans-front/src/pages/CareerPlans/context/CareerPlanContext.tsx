import { createContext, useEffect, useState } from 'react';
import { CareerPlan, CreateCareerPlanDto, UpdateCareerPlanDto } from '../../../Interfaces/CareerPlans.interface';
import { createCareerPlanService, deleteCareerPlanService, getAllCareerPlanService, updateCareerPlanService } from '../../../services/CareerPlanService';


interface CareerPlanContextProps {
  entities: CareerPlan[];
  createCareerPlan: (data: CreateCareerPlanDto) => Promise<void>;
  updateCareerPlan: (id: string , data: UpdateCareerPlanDto) => Promise<void>;
  deleteCareerPlan: (data: CareerPlan) => Promise<void>;
}

export const CareerPlanContext = createContext<CareerPlanContextProps>({
  entities: [],
  createCareerPlan: async () => {},
  updateCareerPlan: async () => {},
  deleteCareerPlan: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export function CareerPlanProvider({ children }: Props) {
  const [entities, SetCareerPlans] = useState<CareerPlan[]>([]);

  const createCareerPlan = async (data: CreateCareerPlanDto): Promise<void> => {
    const res: CareerPlan = await createCareerPlanService(data);
    SetCareerPlans([...entities, res]);
  };

  const deleteCareerPlan = async (data: CareerPlan): Promise<void> => {
    const res = await deleteCareerPlanService(data);
    if(res === 204){
      SetCareerPlans(entities.filter(entity => entity != data));
    }
  };

  const updateCareerPlan = async (id: string, data: UpdateCareerPlanDto): Promise<void> => {
    console.log({data})
    const res: CareerPlan = await updateCareerPlanService(id, data);
    console.log({res})
    SetCareerPlans(entities.map(entity => entity._id == id ? {...entity, ...res} : entity));
  }

  useEffect(() => {
    getAllCareerPlanService().then(data => SetCareerPlans(data));
  }, []);

  return (
    <CareerPlanContext.Provider
      value={{ entities, createCareerPlan, updateCareerPlan, deleteCareerPlan }}
    >
      {children}
    </CareerPlanContext.Provider>
  );
}
