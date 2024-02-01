import TitleApp from '../../shared/TitleApp';
import { UserCareerPlansCard } from './components/UserCareerPlansCard';
import UserCareerPlansModal from './components/UserCareerPlansModal';

export function UserCareerPlans() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TitleApp>Planes de Carrera de Usuarios</TitleApp>
        <UserCareerPlansModal />
      </div>
      <UserCareerPlansCard />
    </>
  );
}
