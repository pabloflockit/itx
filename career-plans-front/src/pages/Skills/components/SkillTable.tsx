import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Skill } from '../../../Interfaces/Skill.interface';
import { StyledTableCell, StyledTableRow } from '../../../shared/StyledTable';
import { useSkill } from '../context/useSkills';

interface Props {
  editModal: (entity: Skill) => void;
}

export function SkillTable(props: Props) {
  const { editModal } = props;
  const { entities, deleteSkill } = useSkill();

  const handleDelete = (entity: Skill) => {
    deleteSkill(entity);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: '300px' }}>Nombre</StyledTableCell>
            <StyledTableCell>Descripción</StyledTableCell>
            <StyledTableCell sx={{ width: '90px' }}>Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entities.map(entity => (
            <StyledTableRow key={entity._id}>
              <StyledTableCell component='th' scope='skill'>
                {' '}
                {entity.name}{' '}
              </StyledTableCell>
              <StyledTableCell>{entity.description}</StyledTableCell>
              <StyledTableCell>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <IconButton onClick={() => editModal(entity)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(entity)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
