import { CreateUserDto } from '../../users/dto/create-user.dto';

export const users = (): CreateUserDto[] => {
  const users: CreateUserDto[] = [
    {
      first_name: 'user1First',
      last_name: 'user1Last',
      email: 'user1First@example.com',
      password: 'Secret1234%',
    },
    {
      first_name: 'user2First',
      last_name: 'user2Last',
      email: 'user2First@example.com',
      password: 'Secret1234%',
    },
  ];
  return users;
};
