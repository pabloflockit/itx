import { useState } from 'react';
import { Skill } from '../../Interfaces/Skill.interface';
import TitleApp from '../../shared/TitleApp';
import SkillModal from './components/SkillModal';
import { SkillTable } from './components/SkillTable';
import { SkillProvider } from './context/SkillContext';

export function Skills() {
  const [edit, SetEdit] = useState<boolean>(false);
  const [entity, SetEntity] = useState<Skill>();

  const editModal = (skill?: Skill) => {
    SetEdit(edit => !edit);
    SetEntity(skill);
  };

  return (
    <SkillProvider>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TitleApp>Habilidades</TitleApp>
        <SkillModal edit={edit} editModal={editModal} entity={entity} />
      </div>
      <SkillTable editModal={editModal} />
    </SkillProvider>
  );
}
