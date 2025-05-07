import { createReducer, on } from '@ngrx/store';
import {
  AppModel,
  ProfileModel,
  UserInfoModel,
  StoreModel,
} from './app.models';
import {
  loginDsi,
  loginDsiError,
  loginDsiSuccess,
  logoutDefaultSignIn,
  logoutDefaultSignInSuccess,
  profileSelected,
} from './app.actions';

export const initialStateUserInfoModel: UserInfoModel = {
  fullname: 'Loading...',
  profiles: [],
};

export const initialStateStoreModel: StoreModel = {
  id: -1,
  name: 'Loading...',
  activated: false,
};

export const initialStateProfile: ProfileModel = {
  id: -1,
  name: 'Loading...',
  store: initialStateStoreModel,
  menu: [],
  authorizedButtons: [],
  authorizedUrls: [],
};

export const initialState: AppModel = {
  loading: false,
  userLogged: false,
  profileSelected: initialStateProfile,
  error: false,
  userInfo: initialStateUserInfoModel,
};

export const appReducer = createReducer(
  initialState,

  on(loginDsi, (state) => {
    return {
      ...state,
      loading: true,
      userLogged: false,
      error: false,
      userInfo: initialStateUserInfoModel,
    };
  }),

  on(loginDsiSuccess, (state, { userInfo }) => {
    return {
      ...state,
      loading: false,
      userLogged: true,
      error: false,
      userInfo,
    };
  }),

  on(loginDsiError, (state) => {
    return {
      ...state,
      loading: false,
      userLogged: false,
      error: true,
      userInfo: initialStateUserInfoModel,
    };
  }),

  on(logoutDefaultSignIn, (state) => {
    return {
      ...state,
      loading: false,
      userLogged: false,
      error: false,
      userInfo: initialStateUserInfoModel,
      profileSelected: initialStateProfile,
    };
  }),

  on(logoutDefaultSignInSuccess, (state) => {
    return {
      ...state,
      loading: false,
      userLogged: false,
      error: false,
      userInfo: initialStateUserInfoModel,
      profileSelected: initialStateProfile,
    };
  }),

  on(profileSelected, (state, { profileSelected }) => {
    return {
      ...state,
      profileSelected: profileSelected,
    };
  })
);
