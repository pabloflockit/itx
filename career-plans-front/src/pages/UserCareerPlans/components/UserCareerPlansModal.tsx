import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Divider, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Skill } from '../../../Interfaces/Skill.interface';
import TitleApp from '../../../shared/TitleApp';

interface Props {
  
}

export default function UserCareerPlansModal(props: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => setOpen(true);

  const handleClose = (): void => setOpen(false);

  const handleSubmit = () => {
    setOpen(false)
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
