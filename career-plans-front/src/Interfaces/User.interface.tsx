export interface User {
  _id:       string;
  firstName: string;
  lastName:  string;
  email:     string;
  createdAt: Date;
  updatedAt: Date;
  __v:       number;
}

export type CreateUserDto = Omit<User,"_id" | "createdAt" | "updatedAt" | "__v">;

export type UpdateUserDto = Partial<CreateUserDto>;
