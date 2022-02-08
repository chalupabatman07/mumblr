import { UpdateUserInput, User } from '../../schema';
import { Exception } from '../../utils';

class UserService {
  public async getUserById(userId: string): Promise<User> {
    const user = await User.findOne(userId);
    if (!user) {
      throw new Exception(404, `User with id: ${userId} was not found`);
    }
    return user;
  }

  public async updateUserById(userId: string, input: UpdateUserInput): Promise<User> {
    const { email, name, birthday, gender, sexualOrientation, showPreference, school } = input;
    const user = await User.findOne(userId);
    if (!user) {
      throw new Exception(404, `User with id: ${userId} was not found`);
    }

    user.email = email ?? user.email;
    user.name = name ?? user.name;
    user.birthday = birthday ?? user.birthday;
    user.gender = gender ?? user.gender;
    user.sexualOrientation = sexualOrientation ?? user.sexualOrientation;
    user.showPreference = showPreference ?? user.showPreference;
    user.school = school ?? user.school;

    await user.save();
    return user;
  }
}

export const userService = new UserService();
