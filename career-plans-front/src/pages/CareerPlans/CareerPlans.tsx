import { useState } from 'react';
import { CareerPlan } from '../../Interfaces/CareerPlans.interface';
import TitleApp from '../../shared/TitleApp';
import CareerPlanModal from './components/CareerPlanModal';
import { CareerPlanTable } from './components/CareerPlanTable';
import { CareerPlanProvider } from './context/CareerPlanContext';

export function CareerPlans() {
  const [edit, SetEdit] = useState<boolean>(false);
  const [careerPlan, SetCareerPlans] = useState<CareerPlan>();

  const editModal = (careerPlan?: CareerPlan) => {
    SetEdit(edit => !edit);
    SetCareerPlans(careerPlan);
  };

  return (
    <CareerPlanProvider>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TitleApp>Planes de Carrera</TitleApp>
        <CareerPlanModal
          edit={edit}
          editModal={editModal}
          entity={careerPlan}
        />
      </div>
      <CareerPlanTable editModal={editModal} />
    </CareerPlanProvider>
  );
}
