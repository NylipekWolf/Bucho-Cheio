export interface SettingsUserFilterRequest {
  page?: number;
  size?: number;
  userName?: string;
  fullName?: string;
  profileId?: number;
  activated?: boolean;
}
