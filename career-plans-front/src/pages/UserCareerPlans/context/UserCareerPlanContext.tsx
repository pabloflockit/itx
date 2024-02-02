import { createContext, useEffect, useState } from "react";
import {  CreateUserCareerPlanDto, UserCareerPlan } from "../../../Interfaces/UserCareerPlans.interface";
import { createUserCareerPlanService, deleteUserCareerPlanService, getAllUserCareerPlanService } from "../../../services/UserCareerPlanService";
import { getByIdCareerPlanService } from "../../../services/CareerPlanService";
import { createUserSkillService } from "../../../services/UserSkillService";

interface UserCareerPlanContextProps {
  entities: UserCareerPlan[];
  createUserCareerPlan: (userId: string, careerPlanId: string) => Promise<void>;
  deleteUserCareerPlan: (data: UserCareerPlan) => Promise<void>;
}

export const UserCareerPlanContext = createContext<UserCareerPlanContextProps>({
  entities: [],
  createUserCareerPlan: async () => {},
  deleteUserCareerPlan: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export function UserCareerPlanProvider({ children }: Props) {
  const [entities, SetCareerPlans] = useState<UserCareerPlan[]>([]);

  const createUserCareerPlan = async (userId: string, careerPlanId: string): Promise<void> => {
    const { skills } = await getByIdCareerPlanService(careerPlanId);

    const userSkills: string[] = [];

    if(skills){
      for (const skill of skills) {
        const res = await createUserSkillService({skill: skill._id, status:0});
        userSkills.push(res._id)
      }
    }

    const data: CreateUserCareerPlanDto = {
      user: userId,
      careerPlan: careerPlanId,
      userSkills: userSkills
    }
    const res: UserCareerPlan = await createUserCareerPlanService(data);
    SetCareerPlans([...entities, res]);
  };

  const deleteUserCareerPlan = async (data: UserCareerPlan): Promise<void> => {
    const res = await deleteUserCareerPlanService(data);
    if(res === 204){
      SetCareerPlans(entities.filter(entity => entity != data));
    }
  };

  useEffect(() => {
    getAllUserCareerPlanService().then(data => SetCareerPlans(data));
  }, []);

  return (
    <UserCareerPlanContext.Provider
      value={{ entities, createUserCareerPlan, deleteUserCareerPlan }}
    >
      {children}
    </UserCareerPlanContext.Provider>
  );
}
