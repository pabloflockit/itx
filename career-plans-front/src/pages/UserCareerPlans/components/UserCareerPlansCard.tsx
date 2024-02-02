import {
  Button,
  Card,
  CardContent,
  Chip,
  Icon,
  Typography,
} from '@mui/material';
import { useUserCareerPlan } from '../context/useUserCareerPlan';
import { UserCareerPlan } from '../../../Interfaces/UserCareerPlans.interface';

export function UserCareerPlansCard() {
  //const [usersPlans, setUsersPlans] = useState<UserCareerPlan[]>();
  const { entities, deleteUserCareerPlan } =
    useUserCareerPlan();

  const handleDelete = (entity: UserCareerPlan) => {
    deleteUserCareerPlan(entity);
  };

  return (
    <div
      style={{
        display: 'flex',
        msFlexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        gap: '30px',
        flexDirection: 'row',
      }}
    >
      {entities &&
        entities.map(userPlan => {
          return (
            <Card
              key={userPlan._id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: 300,
                minHeight: 250,
              }}
            >
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {userPlan.user.firstName} {userPlan.user.lastName}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  component='div'
                >
                  <div>
                    <strong>Email: </strong>
                    {userPlan.user.email}
                  </div>
                  <div>
                    <strong>Ultima Actialización: </strong>
                    {new Date(userPlan.user.updatedAt).toLocaleString()}
                  </div>
                  <div>
                    <strong>Plan de Carrera: </strong>
                    {userPlan.careerPlan.name}
                  </div>
                  <div>
                    <strong>Skills: </strong>
                    <br />
                    <div
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}
                    >
                      {userPlan.userSkills &&
                        userPlan.userSkills.map(skill => {
                          return (
                            <Chip 
                              key={skill._id}
                              label={`${skill.skill.name}: ${
                                skill.status || 0
                              }%`}
                              color={skill.status == 100 ? 'success' :'info'}
                            />
                          );
                        })}
                    </div>
                  </div>
                </Typography>
              </CardContent>
              <Button onClick={() => handleDelete(userPlan)}>
                <Icon color={'error'}>{'delete'}</Icon>
              </Button>
            </Card>
          );
        })}
    </div>
  );
}
