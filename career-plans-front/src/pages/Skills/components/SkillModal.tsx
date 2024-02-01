import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Divider, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormEvent, useEffect, useState } from 'react';
import {
  CreateSkillDto,
  Skill,
  UpdateSkillDto,
} from '../../../Interfaces/Skill.interface';
import TitleApp from '../../../shared/TitleApp';
import { useSkill } from '../context/useSkills';

interface Props {
  edit: boolean;
  entity?: Skill;
  editModal: () => void;
}

export default function BasicModal(props: Props) {
  const { edit, entity, editModal } = props;
  const { createSkill, updateSkill } = useSkill();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(edit);
  }, [edit]);

  const handleOpen = (): void => setOpen(true);

  const handleClose = (): void => {
    setOpen(false);
    if (edit) editModal();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const { name, description } = Object.fromEntries(
      new FormData(event.target as HTMLFormElement),
    );
    if (edit && entity) {
      let entityUpdate: UpdateSkillDto | undefined = undefined;

      if (entity.name !== name.toString()) {
        entityUpdate = { name: name.toString() };
      }
      if (entity.description !== description.toString()) {
        if (entityUpdate) entityUpdate.description = description.toString();
        else entityUpdate = { description: description.toString() };
      }

      if (entityUpdate) updateSkill(entity._id, entityUpdate);

      editModal();
    } else {
      const data: CreateSkillDto = {
        name: name.toString(),
        description: description.toString(),
      };
      createSkill(data);
    }
    setOpen(false);
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
          <TitleApp>{edit ? 'Editar Habilidad' : 'Agregar Habilidad'}</TitleApp>
          <Divider style={{ marginBottom: '20px' }} />
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            onSubmit={handleSubmit}
          >
            <TextField
              id='outlined-basic'
              label='Nombre'
              variant='outlined'
              required
              name='name'
              defaultValue={entity?.name}
            />
            <TextField
              id='outlined-basic'
              label='Descripción'
              variant='outlined'
              required
              name='description'
              defaultValue={entity?.description}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '20px',
              }}
            >
              <Button type='submit' variant='contained'>
                {edit ? 'Guardar' : 'Agregar'}
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
