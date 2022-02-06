import { Registration } from '../../schema';
import { Exception } from '../../utils';

class RegistrationService {
  public async getRegistrationById(registrationId: string): Promise<Registration> {
    const registration = await Registration.findOne(registrationId);
    if (!registration) {
      throw new Exception(404, `No registration info found for id: ${registrationId}`);
    }
    return registration;
  }
}

export const registrationService = new RegistrationService();
