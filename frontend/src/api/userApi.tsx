import { apiClient } from "./apiClient";
import type { UserProfileDto } from "../types/UserProfileDto";

export const fetchUserProfile = async (userId: number): Promise<UserProfileDto> => {
  const response = await apiClient.get<UserProfileDto>(`/users/${userId}/profile`);
  return response.data;
};