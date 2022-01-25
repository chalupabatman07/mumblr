import { Discovery, UpdateDiscoveryInput } from '../../graphql';
import { Exception } from '../../utils';

class DiscoveryService {
  public async getAll(): Promise<Discovery[]> {
    return await Discovery.find();
  }

  public async getByDiscoveryId(discoveryId: string): Promise<Discovery> {
    const discovery = await Discovery.findOne(discoveryId);
    if (!discovery) {
      throw new Exception(404, `Discovery preference not found for discoveryId: ${discoveryId}`);
    }
    return discovery;
  }

  public async updateDiscovery(input: UpdateDiscoveryInput): Promise<Discovery> {
    const {
      discoveryId,
      location,
      distance,
      showPreference,
      agePreferenceStart,
      agePreferenceEnd,
      showOnlyInAgeRange,
      showGlobal,
      showMe,
    } = input;
    const discovery = await this.getByDiscoveryId(discoveryId);

    discovery.location = location ?? discovery.location;
    discovery.distance = distance ?? discovery.distance;
    discovery.showPreference = showPreference ?? discovery.showPreference;
    discovery.agePreferenceStart = agePreferenceStart ?? discovery.agePreferenceStart;
    discovery.agePreferenceEnd = agePreferenceEnd ?? discovery.agePreferenceEnd;
    discovery.showOnlyInAgeRange = showOnlyInAgeRange ?? discovery.showOnlyInAgeRange;
    discovery.showGlobal = showGlobal ?? discovery.showGlobal;
    discovery.showMe = showMe ?? discovery.showMe;

    try {
      await discovery.save();
    } catch (e) {
      throw new Exception(400, `An error occured while trying to update discovery with id: ${discoveryId}`);
    }

    return discovery;
  }
}

export const discoveryService = new DiscoveryService();
