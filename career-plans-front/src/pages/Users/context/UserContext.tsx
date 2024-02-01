import { createContext, useEffect, useState } from 'react';
import {
  CreateUserDto,
  UpdateUserDto,
  User,
} from '../../../Interfaces/User.interface';
import {
  createUserService,
  deleteUserService,
  getAllUserService,
  updateUserService,
} from '../../../services/UserService';

interface UserContextProps {
  entities: User[];
  createUser: (data: CreateUserDto) => Promise<void>;
  updateUser: (id: string, data: UpdateUserDto) => Promise<void>;
  deleteUser: (data: User) => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({
  entities: [],
  createUser: async () => {},
  updateUser: async () => {},
  deleteUser: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export function UserProvider({ children }: Props) {
  const [entities, SetEntities] = useState<User[]>([]);

  const createUser = async (data: CreateUserDto): Promise<void> => {
    const res: User = await createUserService(data);
    SetEntities([...entities, res]);
  };

  const deleteUser = async (data: User): Promise<void> => {
    const res = await deleteUserService(data);
    if (res === 204) {
      SetEntities(entities.filter(entity => entity != data));
    }
  };

  const updateUser = async (id: string, data: UpdateUserDto): Promise<void> => {
    const res: User = await updateUserService(id, data);
    SetEntities(
      entities.map(entity =>
        entity._id == id ? { ...entity, ...res } : entity,
      ),
    );
  };

  useEffect(() => {
    getAllUserService().then(data => SetEntities(data));
  }, []);

  return (
    <UserContext.Provider
      value={{ entities, createUser, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
