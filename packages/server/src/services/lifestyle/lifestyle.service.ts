import { Lifestyle, UpdateLifestyleInput } from '../../graphql';
import { Exception } from '../../utils';

class LifestyleService {
  public async getAll(): Promise<Lifestyle[]> {
    return await Lifestyle.find();
  }

  public async getByLifestyleId(lifestyleId: string): Promise<Lifestyle> {
    const lifestyle = await Lifestyle.findOne(lifestyleId);
    if (!lifestyle) {
      throw new Exception(404, `Lifestyle not found for lifestyleId: ${lifestyleId}`);
    }
    return lifestyle;
  }

  public async updateLifestyle(input: UpdateLifestyleInput): Promise<Lifestyle> {
    const { lifestyleId, drinking, smoking, marijuana, zodiac, pets } = input;
    const lifestyle = await lifestyleService.getByLifestyleId(lifestyleId);

    lifestyle.drinking = drinking ?? lifestyle.drinking;
    lifestyle.smoking = smoking ?? lifestyle.smoking;
    lifestyle.marijuana = marijuana ?? lifestyle.marijuana;
    lifestyle.zodiac = zodiac ?? lifestyle.zodiac;
    lifestyle.pets = pets ?? lifestyle.pets;

    try {
      await lifestyle.save();
    } catch (e) {
      throw new Exception(400, `An error occured while trying to update lifestyle with id: ${lifestyleId}`);
    }

    return lifestyle;
  }
}

export const lifestyleService = new LifestyleService();
