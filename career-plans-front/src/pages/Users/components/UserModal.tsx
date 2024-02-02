import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { FormEvent, useEffect, useState } from "react";
import { CreateUserDto, UpdateUserDto, User } from "../../../Interfaces/User.interface";
import { Box, Button, Divider, Modal, TextField } from "@mui/material";
import TitleApp from '../../../shared/TitleApp';
import { useUser } from '../context/useUser';

interface Props {
  edit: boolean;
  entity?: User;
  editModal: () => void;
}

export default function BasicModal(props: Props) {
  const { edit, entity, editModal } = props;
  const { createUser, updateUser } = useUser();
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
    const { firstName, lastName, email } = Object.fromEntries(
      new FormData(event.target as HTMLFormElement),
    );
    if (edit && entity) {
      let entityUpdate: UpdateUserDto | undefined = undefined;

      if (entity.firstName !== firstName.toString()) {
        entityUpdate = { firstName: firstName.toString() };
      }
      if (entity.lastName !== lastName.toString()) {
        if (entityUpdate) entityUpdate.lastName = lastName.toString();
        else entityUpdate = { lastName: lastName.toString() };
      }
      if (entity.email !== email.toString()) {
        if (entityUpdate) entityUpdate.email = email.toString();
        else entityUpdate = { email: email.toString() };
      }

      if (entityUpdate) updateUser(entity._id, entityUpdate);

      editModal();
    } else {
      const data: CreateUserDto = {
        firstName: firstName.toString(),
        lastName: lastName.toString(),
        email: email.toString()
      };
      createUser(data);
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
              name='firstName'
              defaultValue={entity?.firstName}
            />
            <TextField
              id='outlined-basic'
              label='Apellido'
              variant='outlined'
              required
              name='lastName'
              defaultValue={entity?.lastName}
            />
            <TextField
              id='outlined-basic'
              label='Email'
              variant='outlined'
              required
              name='email'
              defaultValue={entity?.email}
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
