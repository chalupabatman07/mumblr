import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

import { User } from '../../graphql';
import { Exception } from '../../utils';

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

  public async signUp(email: string, password: string, phoneNumber: string): Promise<any> {
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new Exception(401, 'This email is already registered with an account!');
    }

    const passwordHashed = await argon2.hash(password);
    const user = new User();
    user.email = email;
    user.password = passwordHashed;
    user.phoneNumber = phoneNumber;

    await user.save();
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token: this.generateJWT(user),
    };
  }

  public async login(email: string, password: string): Promise<any> {
    const userRecord = await User.findOne({
      where: {
        email,
      },
    });
    if (!userRecord) {
      throw new Exception(404, 'No account found with provided email');
    }

    const correctPassword = await argon2.verify(userRecord.password, password);
    if (!correctPassword) {
      throw new Exception(401, 'Incorrect password');
    }

    return {
      user: {
        id: userRecord.id,
        email: userRecord.email,
      },
      token: this.generateJWT(userRecord),
    };
  }

  public async changePassword(email: string, currentPassword: string, password: string): Promise<any> {
    const userRecord = await User.findOne({
      where: {
        email,
      },
    });
    if (!userRecord) {
      throw new Exception(404, 'No account found with provided email');
    }

    const correctPassword = await argon2.verify(userRecord.password, password);
    if (!correctPassword) {
      throw new Exception(401, 'Current passsword does not match');
    }

    const passwordHashed = await argon2.hash(password);
    userRecord.password = passwordHashed;

    try {
      userRecord.save();
      return {
        user: {
          id: userRecord.id,
          email: userRecord.email,
        },
        token: this.generateJWT(userRecord),
      };
    } catch (e) {
      throw new Exception(400, 'An error occured while updating the password');
    }
  }
}

export const authService: AuthenticationService = new AuthenticationService();
