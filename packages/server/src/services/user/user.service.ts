import { User } from '../../graphql';
import { Exception } from '../../utils';

class UserService {
  public async getUserById(userId: string): Promise<User> {
    const user = await User.findOne(userId);
    if (!user) {
      throw new Exception(404, `User with id: ${userId} was not found`);
    }
    return user;
  }
}

export const userService = new UserService();
