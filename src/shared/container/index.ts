import { container } from 'tsyringe';
import { ICustomersRepository } from '@/modules/customers/domain/repositories/ICustomersRepositories';
import customersRepository from '@/modules/customers/infra/database/repositories/CustomersRepositories';

import { IUsersRepository } from '@/modules/users/domain/repositories/IUserRepositories';
import UsersRepository from '@/modules/users/infra/database/repositories/UsersRepository';
import { IUserTokensRepository } from '@/modules/users/domain/repositories/IUserTokensRepository';
import UserTokensRepository from '@/modules/users/infra/database/repositories/UserTokensRepository';


container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  customersRepository,
);


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
