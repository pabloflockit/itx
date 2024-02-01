import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  Modal,
  TextField,
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import {
  CareerPlan,
  CreateCareerPlanDto,
  UpdateCareerPlanDto,
} from '../../../Interfaces/CareerPlans.interface';
import { Skill } from '../../../Interfaces/Skill.interface';
import { arrayEquals, arrayIds } from '../../../helpers/helpers';
import { getAllSkillService } from '../../../services/SkillService';
import TitleApp from '../../../shared/TitleApp';
import { useCareerPlan } from '../context/useCareerPlans';

interface Props {
  edit: boolean;
  entity?: CareerPlan;
  editModal: () => void;
}

export default function BasicModal(props: Props) {
  const { edit, entity, editModal } = props;
  const { createCareerPlan, updateCareerPlan } = useCareerPlan();
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsAdds, setSkillsAdds] = useState(entity?.skills ?? []);

  useEffect(() => {
    getAllSkillService().then(res => setSkills(res));
  }, []);

  useEffect(() => {
    setOpen(edit);
    setSkillsAdds(entity?.skills ?? []);
  }, [edit, entity?.skills]);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: Skill[],
  ): void => {
    setSkillsAdds([...newValue]);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    if (edit) editModal();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const { name, description } = Object.fromEntries(
      new FormData(event.target as HTMLFormElement),
    );

    if (edit && entity) {
      let entityUpdate: UpdateCareerPlanDto | undefined = undefined;

      if (entity.name !== name.toString()) {
        entityUpdate = { name: name.toString() };
      }
      
      if (entity.description !== description.toString()) {
        if (entityUpdate) entityUpdate.description = description.toString();
        else entityUpdate = { description: description.toString() };
      }

      if (!arrayEquals(entity?.skills || [], skillsAdds)) {
        if (entityUpdate) entityUpdate.skills = arrayIds(skillsAdds);
        else entityUpdate = { skills: arrayIds(skillsAdds) };
      } 
      
      if (entityUpdate) updateCareerPlan(entity._id, entityUpdate);

      editModal();
    } else {
      const data: CreateCareerPlanDto = {
        name: name.toString(),
        description: description.toString(),
        skills: arrayIds(skillsAdds),
      };
      createCareerPlan(data);
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
          <TitleApp>{`${
            edit ? 'Editar' : 'Agregar'
          } Plan de Carrera`}</TitleApp>
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
            <Autocomplete
              multiple
              value={skillsAdds}
              onChange={handleChange}
              options={skills}
              getOptionLabel={option => option.name}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip label={option.name} {...getTagProps({ index })} />
                ))
              }
              renderInput={params => (
                <TextField
                  {...params}
                  label='Lista de Habilidades'
                  placeholder=''
                />
              )}
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
