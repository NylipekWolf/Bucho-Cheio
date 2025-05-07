import { ProfileResponse } from '../../../settings-profile/services/responses/profile-response.interface';

export interface SettingsUserResponse {
  id: number;
  userName: string;
  fullName: string;
  phone: string;
  activated: boolean;
  profiles: ProfileResponse[];
  profilesView?: string;
  email?: string;
}
