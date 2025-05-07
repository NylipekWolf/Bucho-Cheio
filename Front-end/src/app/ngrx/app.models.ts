export interface AppModel {
  loading: boolean;
  userLogged: boolean;
  profileSelected: ProfileModel;
  error: boolean;
  userInfo: UserInfoModel;
}

export interface UserInfoModel {
  fullname: string;
  profiles: ProfileModel[];
}
export interface ProfileModel {
  id: number;
  name: string;
  store: StoreModel;
  menu: MenuModel[];
  authorizedUrls: string[];
  authorizedButtons: number[];
}

export interface StoreModel {
  id: number;
  name: string;
  activated: boolean;
}

export interface MenuModel {
  name: string;
  url: string;
  show: boolean;
  assortment: number;
  children: MenuModel[];
}
