import { useState } from "react";
import { UserProvider } from "./context/UserContext";
import { User } from "../../Interfaces/User.interface";
import TitleApp from "../../shared/TitleApp";
import UserModal from "./components/UserModal";
import { UserTable } from "./components/UserTable";

export function Users() {
  const [edit, SetEdit] = useState<boolean>(false);
  const [entity, SetEntity] = useState<User>();

  const editModal = (user?: User) => {
    SetEdit(edit => !edit);
    SetEntity(user);
  };

  return (
    <UserProvider>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TitleApp>Usuarios</TitleApp>
        <UserModal edit={edit} editModal={editModal} entity={entity} />
      </div>
      <UserTable editModal={editModal} />
    </UserProvider>
  );
}
