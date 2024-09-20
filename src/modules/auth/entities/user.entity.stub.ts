import { User } from './user.entity';

export function stubUser(override: Partial<User> = {}): User {
  return {
    id: 1,
    email: 'test@mail.com',
    ingredients: [],
    hash: 'hashedPassword',
    createTimeStamp: new Date(),
    updateTimeStamp: new Date(),
    deleteTimeStamp: null,
    ...override,
  };
}
