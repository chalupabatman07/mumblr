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
    const { email } = input;
    const user = await User.findOne(userId);
    if (!user) {
      throw new Exception(404, `User with id: ${userId} was not found`);
    }

    user.email = email ?? user.email;
    await user.save();
    return user;
  }
}

export const userService = new UserService();
