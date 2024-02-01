import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { CareerPlan } from '../../../Interfaces/CareerPlans.interface';
import { Skill } from '../../../Interfaces/Skill.interface';
import { getAllSkillService } from '../../../services/SkillService';

interface Props {
  entity: CareerPlan | undefined;
}

export default function CareerPlanSkill({ entity }: Props) {
  const legacy: Skill[] = entity?.skills ?? [];
  const [value, setValue] = useState([...legacy]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    getAllSkillService().then(res => setSkills(res));
  }, []);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: Skill[],
  ): void => {
    setValue([...newValue]);
  };

  return (
    <Autocomplete
      multiple
      value={value}
      onChange={handleChange}
      options={skills}
      getOptionLabel={option => option.name}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option.name} {...getTagProps({ index })} />
        ))
      }
      renderInput={params => (
        <TextField {...params} label='Lista de Habilidades' placeholder='' />
      )}
    />
  );
}
