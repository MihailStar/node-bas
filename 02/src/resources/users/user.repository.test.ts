import { v4 as uuid } from 'uuid';

import User, { UserOptions } from './user.model';
import UserRepository from './user.repository';

const testUserOptions: UserOptions = {
  name: 'test-name',
  login: 'test-login',
  password: 'test-password',
};

const newUserOptions: UserOptions = {
  name: 'new-name',
  login: 'new-login',
  password: 'new-password',
};

let testUser: User;

describe('userRepository', () => {
  test('create', async () => {
    testUser = await UserRepository.create(new User(testUserOptions));

    expect(testUser).toEqual({ ...testUserOptions, _id: testUser._id });
  });

  test('read after create', async () => {
    expect(await UserRepository.read(testUser._id)).toEqual({
      ...testUserOptions,
      _id: testUser._id,
    });

    expect(await UserRepository.read(uuid())).toEqual(null);
  });

  test('update', async () => {
    expect(await UserRepository.update(testUser._id, newUserOptions)).toEqual({
      ...newUserOptions,
      _id: testUser._id,
    });

    expect(await UserRepository.update(uuid(), newUserOptions)).toEqual(null);
  });

  test('read after update', async () => {
    expect(await UserRepository.read(testUser._id)).toEqual({
      ...newUserOptions,
      _id: testUser._id,
    });

    expect(await UserRepository.read(uuid())).toEqual(null);
  });

  test('remove', async () => {
    expect(await UserRepository.remove(testUser._id)).toEqual({
      ...newUserOptions,
      _id: testUser._id,
    });

    expect(await UserRepository.remove(uuid())).toEqual(null);
  });

  test('read after remove', async () => {
    expect(await UserRepository.read(testUser._id)).toEqual(null);

    expect(await UserRepository.read(uuid())).toEqual(null);
  });
});
