import { apiClient } from "./apiClient";
import type { ReservationDto } from "../types/ReservationDto";

export const createReservation = async (
    userId: number,
    deskId: number,
    startDate: string,
    endDate: string  
): Promise<ReservationDto[]> => {
  const response = await apiClient.post<ReservationDto[]>("/reservations", {
    params: {userId, deskId, startDate, endDate},
  });

  return response.data;
};
