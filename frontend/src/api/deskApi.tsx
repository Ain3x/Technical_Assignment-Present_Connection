import { apiClient } from "./apiClient";
import type { DeskDto } from "../types/DeskDto";

export const fetchDesks = async (
  startDate?: string,
  endDate?: string,
  currentUserId?: number
): Promise<DeskDto[]> => {
  const response = await apiClient.get<DeskDto[]>("/desks", {
    params: { startDate, endDate,currentUserId },
  });

  return response.data;
};
