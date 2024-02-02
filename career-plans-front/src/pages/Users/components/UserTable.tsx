import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { User } from '../../../Interfaces/User.interface';
import { StyledTableCell, StyledTableRow } from '../../../shared/StyledTable';
import { useUser } from '../context/useUser';

interface Props {
  editModal: (entity: User) => void;
}

export function UserTable(props: Props) {
  const { editModal } = props;
  const { entities, deleteUser } = useUser();

  const handleDelete = (entity: User) => {
    deleteUser(entity);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Apellido</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell sx={{ width: '90px' }}>Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entities.map(entity => (
            <StyledTableRow key={entity._id}>
              <StyledTableCell component='th'>
                {entity.firstName}
              </StyledTableCell>
              <StyledTableCell>{entity.lastName}</StyledTableCell>
              <StyledTableCell>{entity.email}</StyledTableCell>
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
