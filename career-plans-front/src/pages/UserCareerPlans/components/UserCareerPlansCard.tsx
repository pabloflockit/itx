import { Card, CardContent, Chip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserCareerPlan } from '../../../Interfaces/UserCareerPlans.interface';
import { getAllUserCareerPlanService } from '../../../services/UserCareerPlanService';

export function UserCareerPlansCard() {
  const [usersPlans, setUsersPlans] = useState<UserCareerPlan[]>();

  useEffect(() => {
    getAllUserCareerPlanService().then(data => setUsersPlans(data));
  }, []);

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
      {usersPlans &&
        usersPlans.map(userPlan => {
          return (
            <Card
              key={userPlan._id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 350,
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
                    <div style={{display:'flex', flexWrap: 'wrap', gap: '5px'}}>
                      {userPlan.userSkills.map(skill => {
                        return (
                          <Chip
                            key={skill._id}
                            label={`${skill.skill.name}: ${skill.status || 0}%`}
                            color={skill.status == 100 ? 'success' : 'error' }
                          />
                        );
                      })}
                    </div>
                  </div>
                </Typography>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}
