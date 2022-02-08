import * as jwt from 'jsonwebtoken';

import { User } from '../../schema';
import { Exception } from '../../utils';
import { AuthToken } from './auth.model';

class AuthenticationService {
  private generateJWT(user: any): any {
    const data = {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
    const signature = process.env.JWT_SECRET!;
    return jwt.sign({ data }, signature);
  }

  public async signUp(phoneNumber: string): Promise<AuthToken> {
    const existingUser = await User.findOne({
      where: {
        phoneNumber,
      },
    });
    if (existingUser) {
      throw new Exception(401, 'This phone number is already registered with an account!');
    }

    const user = new User();
    user.phoneNumber = phoneNumber;

    try {
      await user.save();
      return {
        token: this.generateJWT(user),
      };
    } catch (e) {
      console.log(e);
      throw new Exception(400, 'An error occured while create users account');
    }
  }

  public async login(phoneNumber: string): Promise<AuthToken> {
    const userRecord = await User.findOne({
      where: {
        phoneNumber,
      },
    });

    if (!userRecord) {
      throw new Exception(404, 'No account found with provided phone number');
    }

    return {
      token: this.generateJWT(userRecord),
    };
  }
}

export const authService: AuthenticationService = new AuthenticationService();
