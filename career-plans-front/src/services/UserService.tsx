import { CreateUserDto, UpdateUserDto, User } from "../Interfaces/User.interface";

const URL_API = 'http://localhost:3000/users';

const options = <T,>(method: string, data?: T) => {
  return {
    method,
    body: JSON.stringify(data) || null,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
};

export const getAllUserService = async (): Promise<User[]> => {
  const res = await fetch(`${URL_API}`, options('GET'));
    return await res.json();
};

export const createUserService = async (data: CreateUserDto): Promise<User> => {
  const res = await fetch(`${URL_API}`, options('POST', data));
    return await res.json();
};

export const updateUserService = async (id: string, data: UpdateUserDto): Promise<User> => {
  const res = await fetch(`${URL_API}/${id}`, options('PUT', data));
    return await res.json();
};

export const deleteUserService = async (data: User): Promise<number> => {
    const res = await fetch(`${URL_API}/${data._id}`, options('DELETE'));
    return res.status;
}