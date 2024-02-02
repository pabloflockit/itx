import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Divider } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { SyntheticEvent, useEffect, useState } from 'react';
import { UserCareerPlanAutoComplete } from '../../../Interfaces/UserCareerPlans.interface';
import { arrayCareerNames, arrayUserNames } from '../../../helpers/helpers';
import { getAllCareerPlanService } from '../../../services/CareerPlanService';
import { getAllUserService } from '../../../services/UserService';
import TitleApp from '../../../shared/TitleApp';
import { useUserCareerPlan } from '../context/useUserCareerPlan';

export default function UserCareerPlansModal() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<UserCareerPlanAutoComplete[] | null>();
  const [user, setUser] = useState<UserCareerPlanAutoComplete | null>();
  const [careers, setCareers] = useState<UserCareerPlanAutoComplete[] | null>();
  const [career, setCareer] = useState<UserCareerPlanAutoComplete | null>();

  const { createUserCareerPlan } = useUserCareerPlan();

  useEffect(() => {
    getAllUserService().then(data => {
      setUsers(arrayUserNames(data));
    });

    getAllCareerPlanService().then(data => {
      setCareers(arrayCareerNames(data));
    });
  }, []);

  const handleOpen = (): void => setOpen(true);

  const handleClose = (): void => setOpen(false);

  const handleSubmit = () => {
    if (user && career) createUserCareerPlan(user.id, career.id);
    setOpen(false);
  };

  const handleOnChangeUser = (
    event: SyntheticEvent<Element, Event>,
    newValue: UserCareerPlanAutoComplete | null,
  ) => {
    setUser(newValue);
  };
  const handleOnChangeCareer = (
    event: SyntheticEvent<Element, Event>,
    newValue: UserCareerPlanAutoComplete | null,
  ) => {
    setCareer(newValue);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>
        <AddCircleOutlinedIcon className='rounded' />
      </Button>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 1000,
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TitleApp>Crear Plan de Usuario</TitleApp>
          <Divider style={{ marginBottom: '20px' }} />
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            onSubmit={handleSubmit}
          >
            <Autocomplete
              disablePortal
              id='usuarios-select'
              value={user || null}
              options={users || []}
              renderInput={params => <TextField {...params} label='Usuario' />}
              onChange={handleOnChangeUser}
            />
            <Autocomplete
              disablePortal
              id='careers-select'
              value={career || null}
              options={careers || []}
              renderInput={params => (
                <TextField {...params} label='Plan de Carrera' />
              )}
              onChange={handleOnChangeCareer}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '20px',
              }}
            >
              <Button type='submit' variant='contained'>
                Crear
              </Button>
              <Button onClick={handleClose} variant='contained'>
                Cancelar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
