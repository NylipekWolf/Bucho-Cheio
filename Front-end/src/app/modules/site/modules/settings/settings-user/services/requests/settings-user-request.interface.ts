export interface SettingsUserRequest {
  id?: number;
  userName: string;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  profilesId: number[];
}
