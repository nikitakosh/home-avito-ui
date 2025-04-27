import api from './api';
import { UpdateProfileInfoDto, UserInfoDto } from '../types';

const PROFILE_ENDPOINTS = {
  GET_INFO: '/api/v1/profile/info',
  UPDATE: (id: number) => `/api/v1/profile/${id}`,
  ADD_FRIEND: (friendId: number) => `/api/v1/profile/add-friend/${friendId}`,
};

export const getProfileInfo = async (): Promise<UserInfoDto> => {
  const response = await api.get<UserInfoDto>(PROFILE_ENDPOINTS.GET_INFO);
  return response.data;
};

export const updateProfile = async (id: number, data: UpdateProfileInfoDto): Promise<void> => {
  await api.put(PROFILE_ENDPOINTS.UPDATE(id), data);
};

export const addFriend = async (friendId: number): Promise<void> => {
  await api.post(PROFILE_ENDPOINTS.ADD_FRIEND(friendId));
};

export default {
  getProfileInfo,
  updateProfile,
  addFriend,
};