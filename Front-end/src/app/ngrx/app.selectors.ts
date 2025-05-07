import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppModel } from './app.models';

export const projectModelState = createFeatureSelector<AppModel>('appModel');

export const selectLoading = createSelector(
  projectModelState,
  (state: AppModel) => state.loading
);

export const selectUserInfo = createSelector(
  projectModelState,
  (state: AppModel) => state.userInfo
);

export const selectUserLogged = createSelector(
  projectModelState,
  (state: AppModel) => state.userLogged
);

export const selectError = createSelector(
  projectModelState,
  (state: AppModel) => state.error
);

export const selectProfile = createSelector(
  projectModelState,
  (state: AppModel) => state.profileSelected
);
